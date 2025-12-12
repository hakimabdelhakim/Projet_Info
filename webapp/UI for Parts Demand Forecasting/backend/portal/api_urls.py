from django.urls import path
from . import api

urlpatterns = [
    path('health', api.health, name='api-health'),
    path('login', api.login, name='api-login'),
    path('previsions', api.previsions, name='api-previsions'),
    path('consommations', api.consommations_get, name='api-consommations-get'),
    path('consommations/save', api.consommations_save, name='api-consommations-save'),
    path('budget', api.budget_lines, name='api-budget-lines'),
    path('budget/toggle', api.budget_toggle, name='api-budget-toggle'),
    path('budget/toggle-all', api.budget_toggle_all, name='api-budget-toggle-all'),
    path('budget/approve', api.budget_approve, name='api-budget-approve'),
    path('alerts', api.alerts_list, name='api-alerts-list'),
    path('alerts/process', api.alerts_process, name='api-alerts-process'),
]
