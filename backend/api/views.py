import json
from datetime import datetime, date as dt_date
from pathlib import Path

from django.db import IntegrityError
from django.db.models import Q
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_http_methods

from .export import export_budget_csv, export_consumptions_csv, export_previsions_csv
from .models import ActivityLog, BudgetConfig, Consumption, Part, Selection
from .utils import check_api_auth, ensure_parts_loaded, load_json, log_activity, requester_identity

BASE_DIR = Path(__file__).resolve().parent.parent


def error_response(message: str, status: int = 400, code: str | None = None, details: str | None = None):
    """Helper to return a consistent JSON error payload."""
    payload = {"error": message}
    if code is not None:
        payload["code"] = code
    if details is not None:
        payload["details"] = details
    return JsonResponse(payload, status=status)


# ---------------------------------------------------------------------------
# Prévisions & achats
# ---------------------------------------------------------------------------


@require_GET
def previsions(request):
    """
    Liste des pièces avec leurs prévisions.

    Filtres simples côté serveur pour rester cohérent avec l'UI :
    - search : recherche sur code / désignation / fournisseur
    - criticite : urgent / moyen / normal
    - limit / offset : pagination simple
    """
    ensure_parts_loaded()
    qs = Part.objects.all().order_by("code")

    search = request.GET.get("search")
    criticite = request.GET.get("criticite")

    if search:
        s = search.strip()
        if s:
            qs = qs.filter(
                Q(code__icontains=s)
                | Q(designation__icontains=s)
                | Q(fournisseur__icontains=s)
            )

    if criticite:
        qs = qs.filter(criticite__iexact=criticite.strip())

    limit = request.GET.get("limit")
    offset = request.GET.get("offset")

    try:
        if offset is not None:
            qs = qs[int(offset) :]
        if limit is not None:
            qs = qs[: int(limit)]
    except (TypeError, ValueError):
        # En cas de mauvais paramètres, on retourne simplement la liste filtrée
        pass

    data = [p.to_dict() for p in qs]
    return JsonResponse(data, safe=False)


@require_GET
def purchases(request):
    """
    Besoins d'achat dérivés de n_ac_2025.

    Filtres :
    - search : code / désignation / fournisseur
    - criticite : urgent / moyen / normal
    - limit / offset : pagination
    """
    ensure_parts_loaded()
    qs = Part.objects.all().order_by("code")

    search = request.GET.get("search")
    criticite = request.GET.get("criticite")

    if search:
        s = search.strip()
        if s:
            qs = qs.filter(
                Q(code__icontains=s)
                | Q(designation__icontains=s)
                | Q(fournisseur__icontains=s)
            )

    if criticite:
        qs = qs.filter(criticite__iexact=criticite.strip())

    limit = request.GET.get("limit")
    offset = request.GET.get("offset")

    try:
        if offset is not None:
            qs = qs[int(offset) :]
        if limit is not None:
            qs = qs[: int(limit)]
    except (TypeError, ValueError):
        pass

    data = []
    for idx, p in enumerate(qs):
        qty = max(0, p.n_ac_2025)
        data.append(
            {
                "id": idx + 1,
                "code": p.code,
                "designation": p.designation,
                "criticite": p.criticite,
                "quantite": qty,
                "prixUnitaire": p.prix_unitaire,
                "total": qty * p.prix_unitaire,
                "delai": p.delai,
            }
        )

    return JsonResponse(data, safe=False)


@require_GET
def metrics(request):
    """Renvoie les métriques du modèle ML à partir du JSON exporté."""
    metrics_path = (
        BASE_DIR.parent
        / "webapp"
        / "UI for forecasting2"
        / "src"
        / "assets"
        / "model_metrics.json"
    )
    data = load_json(metrics_path) or {}
    return JsonResponse(data, safe=False)


@require_GET
def export_previsions_csv_view(request):
    ensure_parts_loaded()
    return export_previsions_csv()


@require_GET
def export_budget_csv_view(request):
    ensure_parts_loaded()
    return export_budget_csv()


@require_GET
def export_consommations_csv_view(request):
    ensure_parts_loaded()
    return export_consumptions_csv()


# ---------------------------------------------------------------------------
# Saisie des consommations
# ---------------------------------------------------------------------------


@csrf_exempt
@require_http_methods(["GET", "POST"])
def consumptions(request):
    if request.method == "GET":
        date_str = request.GET.get("date")
        qs = Consumption.objects.all()
        if date_str:
            qs = qs.filter(date=date_str)
        data = [
            {
                "code": c.part.code,
                "date": c.date.isoformat(),
                "valeur": c.valeur,
            }
            for c in qs
        ]
        return JsonResponse(data, safe=False)

    # POST
    if not check_api_auth(request):
        return error_response("Unauthorized", status=403, code="unauthorized")

    user, role = requester_identity(request)
    try:
        payload = json.loads(request.body.decode("utf-8"))
    except Exception:
        return error_response("Invalid JSON", status=400, code="invalid_json")

    items = payload if isinstance(payload, list) else [payload]
    saved = []
    errors = []

    for item in items:
        code = item.get("code")
        date_value = item.get("date")
        valeur = item.get("valeur")

        if not code or not date_value or valeur is None:
            errors.append({"item": item, "error": "missing fields"})
            continue

        part = Part.objects.filter(code=code).first()
        if not part:
            errors.append({"item": item, "error": "unknown part"})
            continue

        try:
            try:
                parsed_date = dt_date.fromisoformat(date_value)
            except Exception:
                errors.append({"item": item, "error": "invalid date"})
                continue

            val = float(valeur)
            if val < 0:
                errors.append({"item": item, "error": "negative value"})
                continue

            obj, _ = Consumption.objects.update_or_create(
                part=part,
                date=parsed_date,
                defaults={"valeur": val},
            )
            saved.append(
                {
                    "code": obj.part.code,
                    "date": obj.date.isoformat(),
                    "valeur": obj.valeur,
                }
            )
        except (ValueError, IntegrityError) as exc:
            errors.append({"item": item, "error": str(exc)})

    if saved:
        log_activity(
            action=f"Saisie consommations ({len(saved)})",
            module="Saisie",
            details=f"Dates: {', '.join(sorted({s['date'] for s in saved}))}",
            utilisateur=user,
            role=role,
        )

    status = 207 if errors else 201
    return JsonResponse({"saved": saved, "errors": errors}, status=status)


# ---------------------------------------------------------------------------
# Approvals & budget
# ---------------------------------------------------------------------------


@csrf_exempt
@require_http_methods(["GET", "POST"])
def approvals(request):
    ensure_parts_loaded()
    if request.method == "GET":
        approved = list(
            Part.objects.filter(approuve=True).values_list("code", flat=True)
        )
        return JsonResponse({"approved": approved})

    try:
        payload = json.loads(request.body.decode("utf-8"))
    except Exception:
        return error_response("Invalid JSON", status=400, code="invalid_json")

    codes = payload.get("codes") if isinstance(payload, dict) else None
    if not codes or not isinstance(codes, list):
        return error_response("codes list required", status=400, code="missing_codes")

    if not check_api_auth(request):
        return error_response("Unauthorized", status=403, code="unauthorized")

    user, role = requester_identity(request)
    Part.objects.filter(code__in=codes).update(approuve=True)
    log_activity(
        action=f"Approvals ({len(codes)})",
        module="Prévisions",
        details=",".join(codes),
        utilisateur=user,
        role=role,
    )
    return JsonResponse({"approved": codes})


@csrf_exempt
@require_http_methods(["GET", "POST"])
def budget_state(request):
    ensure_parts_loaded()

    if request.method == "GET":
        config, _ = BudgetConfig.objects.get_or_create(id=1)
        selections = Selection.objects.filter(selected=True).values_list(
            "part__code", flat=True
        )
        return JsonResponse(
            {
                "budget_cap": config.budget_cap,
                "selected_codes": list(selections),
            }
        )

    try:
        payload = json.loads(request.body.decode("utf-8"))
    except Exception:
        return error_response("Invalid JSON", status=400, code="invalid_json")

    cap = payload.get("budget_cap")
    selected_codes = payload.get("selected_codes", [])

    if not check_api_auth(request):
        return error_response("Unauthorized", status=403, code="unauthorized")

    user, role = requester_identity(request)

    try:
        parsed_cap = None if cap is None or cap == "" else float(cap)
    except (TypeError, ValueError):
        return error_response(
            "budget_cap must be a number or null",
            status=400,
            code="invalid_budget_cap",
        )

    config, _ = BudgetConfig.objects.get_or_create(id=1)
    config.budget_cap = parsed_cap
    config.save()

    # reset then set selections
    Selection.objects.all().delete()
    bulk = []
    for code in selected_codes:
        part = Part.objects.filter(code=code).first()
        if part:
            bulk.append(Selection(part=part, selected=True))
    Selection.objects.bulk_create(bulk)

    log_activity(
        action="Budget/selection sauvegardés",
        module="Budget",
        details=f"cap={config.budget_cap}, selected={len(selected_codes)}",
        utilisateur=user,
        role=role,
    )
    return JsonResponse(
        {
            "ok": True,
            "budget_cap": config.budget_cap,
            "selected_codes": selected_codes,
        }
    )


# ---------------------------------------------------------------------------
# Activités / audit
# ---------------------------------------------------------------------------


@require_GET
def activities(request):
    """
    Retourne les activités récentes.

    Filtres optionnels via query params :
    - module : nom de module (Saisie, Budget, Prévisions, Admin, ...)
    - from : datetime ISO (>= created_at)
    - to : datetime ISO (<= created_at)
    - limit : nombre maximum d'entrées (défaut 50)
    """
    qs = ActivityLog.objects.all().order_by("-created_at")

    module = request.GET.get("module")
    if module:
        qs = qs.filter(module__iexact=module.strip())

    from_param = request.GET.get("from")
    to_param = request.GET.get("to")

    if from_param:
        try:
            dt_from = datetime.fromisoformat(from_param)
            qs = qs.filter(created_at__gte=dt_from)
        except ValueError:
            # on ignore un filtre mal formaté
            pass

    if to_param:
        try:
            dt_to = datetime.fromisoformat(to_param)
            qs = qs.filter(created_at__lte=dt_to)
        except ValueError:
            pass

    limit_param = request.GET.get("limit")
    try:
        limit = int(limit_param) if limit_param is not None else 50
    except (TypeError, ValueError):
        limit = 50
    if limit <= 0:
        limit = 50

    qs = qs[:limit]

    data = [
        {
            "utilisateur": a.utilisateur,
            "role": a.role,
            "action": a.action,
            "module": a.module,
            "details": a.details,
            "date": a.created_at.isoformat(),
        }
        for a in qs
    ]
    return JsonResponse(data, safe=False)
