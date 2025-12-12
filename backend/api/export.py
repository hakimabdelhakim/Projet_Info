import csv
from io import StringIO
from django.http import HttpResponse
from .models import Part


def export_previsions_csv():
    headers = [
        "code",
        "designation",
        "criticite",
        "stockActuel",
        "stockSecurite",
        "moyenneM3",
        "previsionM1",
        "ecartPourcent",
        "prixUnitaire",
        "fournisseur",
        "delai",
        "n_ac_2025",
        "approuve",
    ]
    buffer = StringIO()
    writer = csv.writer(buffer)
    writer.writerow(headers)
    for p in Part.objects.all():
        writer.writerow(
            [
                p.code,
                p.designation,
                p.criticite,
                p.stock_actuel,
                p.stock_securite,
                p.moyenne_m3,
                p.prevision_m1,
                p.ecart_pourcent,
                p.prix_unitaire,
                p.fournisseur,
                p.delai,
                p.n_ac_2025,
                p.approuve,
            ]
        )
    resp = HttpResponse(buffer.getvalue(), content_type="text/csv")
    resp["Content-Disposition"] = 'attachment; filename="previsions.csv"'
    return resp


def export_budget_csv():
    headers = ["code", "designation", "criticite", "quantite", "prixUnitaire", "total", "delai", "approuve"]
    buffer = StringIO()
    writer = csv.writer(buffer)
    writer.writerow(headers)
    for p in Part.objects.all():
        qty = max(0, p.n_ac_2025)
        total = qty * p.prix_unitaire
        writer.writerow(
            [
                p.code,
                p.designation,
                p.criticite,
                qty,
                p.prix_unitaire,
                total,
                p.delai,
                p.approuve,
            ]
        )
    resp = HttpResponse(buffer.getvalue(), content_type="text/csv")
    resp["Content-Disposition"] = 'attachment; filename="budget_purchases.csv"'
    return resp


def export_consumptions_csv():
    headers = ["code", "date", "valeur"]
    buffer = StringIO()
    writer = csv.writer(buffer)
    writer.writerow(headers)
    from .models import Consumption

    for c in Consumption.objects.select_related("part").all():
        writer.writerow([c.part.code, c.date.isoformat(), c.valeur])
    resp = HttpResponse(buffer.getvalue(), content_type="text/csv")
    resp["Content-Disposition"] = 'attachment; filename="consommations.csv"'
    return resp
