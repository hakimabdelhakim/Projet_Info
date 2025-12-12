import json
from pathlib import Path
from django.db import transaction
import os
from .models import Part, ActivityLog

BASE_DIR = Path(__file__).resolve().parent.parent


def _path_predictions() -> Path:
    return BASE_DIR.parent / "webapp" / "UI for forecasting2" / "src" / "assets" / "predictions_2025.json"


def _path_stock_secu() -> Path:
    return BASE_DIR.parent / "webapp" / "UI for forecasting2" / "src" / "assets" / "stock_securite.json"


def load_json(path: Path):
    if not path.exists():
        return None
    return json.loads(path.read_text(encoding="utf-8"))


@transaction.atomic
def ensure_parts_loaded():
    if Part.objects.exists():
        return
    preds = load_json(_path_predictions()) or []
    stock_map = load_json(_path_stock_secu()) or {}
    bulk = []
    for r in preds:
        code = str(r.get("code"))
        bulk.append(
            Part(
                code=code,
                designation=r.get("designation", "") or "",
                criticite=str(r.get("criticite") or "normal"),
                stock_actuel=float(r.get("stockActuel") or 0),
                stock_securite=float(stock_map.get(code, r.get("moyenneM3") or 0)),
                moyenne_m3=float(r.get("moyenneM3") or 0),
                prevision_m1=float(r.get("previsionM1") or 0),
                ecart_pourcent=float(r.get("ecartPourcent") or 0),
                prix_unitaire=float(r.get("prixUnitaire") or 0),
                fournisseur=r.get("fournisseur", "") or "",
                delai=float(r.get("delai") or 0),
                n_ac_2025=float(r.get("n_ac_2025") or 0),
            )
        )
    Part.objects.bulk_create(bulk, ignore_conflicts=True)


def log_activity(action: str, module: str, details: str = "", utilisateur: str = "Système", role: str = "Auto"):
    ActivityLog.objects.create(
        action=action[:255],
        module=module[:64],
        details=details,
        utilisateur=utilisateur,
        role=role,
    )


def check_api_auth(request) -> bool:
    """
    Simple token check (désactivé pour l'instant).
    On retourne toujours True pour éviter les erreurs CORS / 403
    pendant le développement.
    """
    return True


def requester_identity(request):
    """Get user/role from headers (optional) for activity logs."""
    user = request.headers.get("X-User", "Système")
    role = request.headers.get("X-Role", "Auto")
    return user, role
