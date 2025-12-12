from django.urls import path
from . import views

urlpatterns = [
    path("previsions/", views.previsions, name="previsions"),
    path("purchases/", views.purchases, name="purchases"),
    path("metrics/", views.metrics, name="metrics"),
    path("consommations/", views.consumptions, name="consommations"),
    path("budget/state/", views.budget_state, name="budget_state"),
    path("approvals/", views.approvals, name="approvals"),
    path("export/previsions.csv", views.export_previsions_csv_view, name="export_previsions_csv"),
    path("export/budget.csv", views.export_budget_csv_view, name="export_budget_csv"),
    path("export/consommations.csv", views.export_consommations_csv_view, name="export_consommations_csv"),
    path("activities/", views.activities, name="activities"),
]
