from django.http import JsonResponse, HttpResponseBadRequest, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.db.models import F
import json
from pathlib import Path
import pandas as pd

from .models import Supplier, Part, Forecast, Consumption
from .models import BudgetLine, Alert

# ---------------------------------------------------------------------------
# Data loading for ML results (predictions, n_ac)
# ---------------------------------------------------------------------------
_CACHE = {}


def _project_root() -> Path:
    # api.py -> portal -> backend -> project root (contains data/)
    p = Path(__file__).resolve()
    for parent in p.parents:
        if (parent / "data").exists():
            return parent
    return Path(__file__).resolve().parents[3]


def _load_predictions():
    if "predictions" in _CACHE:
        return _CACHE["predictions"]
    root = _project_root()
    preds_path = root / "data" / "results" / "predictions_2025_with_nac.xlsx"
    df = pd.read_excel(preds_path)
    _CACHE["predictions"] = df
    return df


def _load_part2():
    if "part2" in _CACHE:
        return _CACHE["part2"]
    root = _project_root()
    p2_path = root / "data" / "processed" / "part2_clean_step2.parquet"
    df = pd.read_parquet(p2_path)
    _CACHE["part2"] = df
    return df


def _merge_preds_with_part2():
    if "merged" in _CACHE:
        return _CACHE["merged"]
    preds = _load_predictions()
    p2 = _load_part2()
    merged = preds.merge(
        p2[["code_piece", "classif", "prix_uni_final"]],
        on="code_piece",
        how="left",
    )
    _CACHE["merged"] = merged
    return merged


def _get_role(request) -> str | None:
    """Return role from cookie or header. Demo-friendly."""
    role = request.COOKIES.get("role")
    if not role:
        role = request.headers.get("X-Role")
    return role


def role_required(allowed: set[str]):
    def decorator(view_func):
        def _wrapped(request, *args, **kwargs):
            role = _get_role(request)
            if role not in allowed:
                return JsonResponse({"success": False, "error": "forbidden", "allowed": list(allowed)}, status=403)
            return view_func(request, *args, **kwargs)
        return _wrapped
    return decorator


@require_http_methods(["GET"])
def health(request):
    return JsonResponse({"status": "ok"})


@csrf_exempt
@require_http_methods(["POST"])
def login(request):
    try:
        data = json.loads(request.body or b"{}")
    except json.JSONDecodeError:
        return HttpResponseBadRequest("invalid-json")
    username = (data.get("usernameOrEmail") or "").strip()
    password = (data.get("password") or "").strip()

    demo = {
        "manager": {"id": "1", "nom": "Fatima Ziani", "email": "fatima.ziani@ocp.ma", "role": "manager"},
        "appro": {"id": "2", "nom": "Ahmed El Amrani", "email": "ahmed.amrani@ocp.ma", "role": "approvisionnement"},
        "logistique": {"id": "3", "nom": "Sarah Benali", "email": "sarah.benali@ocp.ma", "role": "logistique"},
    }
    mapping = {"manager": "manager", "appro": "appro", "logistique": "logistique"}
    key = mapping.get(username) or next((k for k, v in demo.items() if v["email"] == username), None)
    if key and password == "demo":
        data = {"success": True, "user": demo[key], "token": None}
        resp = JsonResponse(data)
        # Set minimal cookies for role-based checks (same-origin)
        resp.set_cookie("role", demo[key]["role"], samesite="Lax")
        resp.set_cookie("user_name", demo[key]["nom"], samesite="Lax")
        return resp
    return JsonResponse({"success": False}, status=401)


@require_http_methods(["GET"])
def previsions(request):
    df = _merge_preds_with_part2()
    # Compute moyenne 3 dernières années (2018-2020 vs 2022-2024 selon dispo)
    years = ["cons_2022", "cons_2023", "cons_2024"]
    for y in years:
        if y not in df.columns:
            df[y] = 0.0
    df["moyenneM3"] = df[years].mean(axis=1)
    # Prévision M+1 = conso mensuelle 2025 (n_pm_2025)
    df["previsionM1"] = df["n_pm_2025"]
    df["ecartPourcent"] = 0
    items = []
    for _, r in df.iterrows():
        items.append({
            "code": r["code_piece"],
            "designation": r.get("D\u00e9signation langue", ""),
            "type": "Accouplement",
            "criticite": r.get("classif", "normal"),
            "stockActuel": float(r.get("stock_actuel", 0)),
            "moyenneM3": float(r.get("moyenneM3", 0)),
            "previsionM1": float(r.get("previsionM1", 0)),
            "ecartPourcent": float(r.get("ecartPourcent", 0)),
            "prixUnitaire": float(r.get("prix_uni_final", 0) or 0),
            "fournisseur": "N/A",
            "delai": float(r.get("dl_mois", 0)) * 30,  # approx jours
            "historique": [],
        })
    return JsonResponse({"items": items})


@require_http_methods(["GET"])
def consommations_get(request):
    df = _merge_preds_with_part2()
    items = []
    for _, r in df.iterrows():
        items.append({
            "code": r["code_piece"],
            "prevision": float(r.get("pred_2025_histgradboost", 0)),
            "consommationReelle": None,
        })
    return JsonResponse({"items": items})


@csrf_exempt
@require_http_methods(["POST"])
@role_required({"logistique", "manager"})
def consommations_save(request):
    try:
        data = json.loads(request.body or b"{}")
    except json.JSONDecodeError:
        return HttpResponseBadRequest("invalid-json")
    updates = data.get("updates") or []
    month = data.get("month") or "2025-10"
    for u in updates:
        code = u.get("code")
        qte = u.get("consommationReelle")
        if code is None:
            continue
        try:
            part = Part.objects.get(code=code)
            obj, _ = Consumption.objects.get_or_create(part=part, month=month)
            obj.quantity = int(qte or 0)
            obj.status = "valide" if obj.quantity is not None else "en_attente"
            obj.save()
        except Part.DoesNotExist:
            continue
    return JsonResponse({"success": True})


# Budget endpoints
@require_http_methods(["GET"])
@role_required({"manager"})
def budget_lines(request):
    df = _merge_preds_with_part2()
    items = []
    for idx, r in df.iterrows():
        qty = float(r.get("n_ac_2025", 0))
        pu = float(r.get("prix_uni_final", 0) or 0)
        items.append({
            "id": idx + 1,
            "code": r["code_piece"],
            "designation": r.get("D\u00e9signation langue", ""),
            "quantity": qty,
            "unit_price": pu,
            "selected": False,
            "total": qty * pu,
        })
    return JsonResponse({"items": items})


@csrf_exempt
@require_http_methods(["POST"])
@role_required({"manager"})
def budget_toggle(request):
    # Demo: respond success without persisting
    return JsonResponse({"success": True})


@csrf_exempt
@require_http_methods(["POST"])
@role_required({"manager"})
def budget_toggle_all(request):
    return JsonResponse({"success": True})


@csrf_exempt
@require_http_methods(["POST"])
@role_required({"manager"})
def budget_approve(request):
    return JsonResponse({"success": True})


# Alerts endpoints
@require_http_methods(["GET"])
@role_required({"manager"})
def alerts_list(request):
    alerts = Alert.objects.order_by('-date')
    items = [{
        "id": a.id,
        "type": a.type,
        "severity": a.severity,
        "message": a.message,
        "details": a.details,
        "date": a.date.isoformat(),
        "processed": a.processed,
    } for a in alerts]
    return JsonResponse({"items": items})


@csrf_exempt
@require_http_methods(["POST"])
@role_required({"manager"})
def alerts_process(request):
    try:
        data = json.loads(request.body or b"{}")
    except json.JSONDecodeError:
        return HttpResponseBadRequest("invalid-json")
    alert_id = data.get("alert_id")
    try:
        a = Alert.objects.get(id=alert_id)
        a.processed = True
        a.save()
        return JsonResponse({"success": True})
    except Alert.DoesNotExist:
        return JsonResponse({"success": False}, status=404)
