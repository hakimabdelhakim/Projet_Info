from django.shortcuts import render, redirect
from django.views.decorators.http import require_http_methods
from django.db.models import Q
from django.contrib import messages
from .models import Part, Forecast, Consumption, BudgetLine, Alert, Supplier
from .forms import ConsumptionFormSet

MOCK_USERS = [
    {"id": "1", "nom": "Fatima Ziani", "email": "fatima.ziani@ocp.ma", "username": "manager", "password": "demo", "role": "manager"},
    {"id": "2", "nom": "Ahmed El Amrani", "email": "ahmed.amrani@ocp.ma", "username": "appro", "password": "demo", "role": "approvisionnement"},
    {"id": "3", "nom": "Sarah Benali", "email": "sarah.benali@ocp.ma", "username": "logistique", "password": "demo", "role": "logistique"},
]


def _get_user(request):
    return request.session.get("user")


def dashboard(request):
    user = _get_user(request)
    if not user:
        return redirect('login')
    ctx = {
        "user": user,
        "kpi": {
            "budget": {"used": 1234500, "total": 2000000},
            "critical_parts": 54,
            "forecast_next": 342,
            "stock_total": 1247,
        }
    }
    return render(request, 'portal/dashboard.html', ctx)


@require_http_methods(["GET", "POST"])
def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = next((u for u in MOCK_USERS if (u['username'] == username or u['email'] == username) and u['password'] == password), None)
        if user:
            request.session['user'] = {k: v for k, v in user.items() if k not in ('password',)}
            return redirect('dashboard')
        return render(request, 'portal/login.html', {"error": "Identifiants incorrects"})
    return render(request, 'portal/login.html')


def logout_view(request):
    request.session.flush()
    return redirect('login')


def previsions(request):
    user = _get_user(request)
    if not user:
        return redirect('login')
    month = request.GET.get('month', '2025-10')
    q = request.GET.get('q', '').strip()
    type_f = request.GET.get('type') or ''
    crit_f = request.GET.get('criticite') or ''
    supp_f = request.GET.get('supplier') or ''

    forecasts = (
        Forecast.objects.filter(month=month)
        .select_related('part', 'part__supplier')
        .order_by('part__code')
    )
    if q:
        forecasts = forecasts.filter(Q(part__code__icontains=q) | Q(part__designation__icontains=q))
    if type_f:
        forecasts = forecasts.filter(part__type=type_f)
    if crit_f:
        forecasts = forecasts.filter(part__criticite=crit_f)
    if supp_f:
        forecasts = forecasts.filter(part__supplier__id=supp_f)

    suppliers = Supplier.objects.all().order_by('name')
    return render(
        request,
        'portal/previsions.html',
        {"user": user, "items": forecasts, "month": month, "suppliers": suppliers, "q": q, "type_f": type_f, "crit_f": crit_f, "supp_f": supp_f},
    )


def saisie(request):
    user = _get_user(request)
    if not user:
        return redirect('login')
    month = request.GET.get('month', '2025-10')
    qs = Consumption.objects.filter(month=month).select_related('part')
    if request.method == 'POST':
        formset = ConsumptionFormSet(request.POST, queryset=qs)
        if formset.is_valid():
            instances = formset.save()
            messages.success(request, f"{len(instances)} consommations enregistrées")
            return redirect(f"/saisie/?month={month}")
        else:
            messages.error(request, "Erreur de validation")
    else:
        formset = ConsumptionFormSet(queryset=qs)
    total_prev = sum((Forecast.objects.filter(part=c.part, month=month).first() or Forecast(prevision_m1=0)).prevision_m1 for c in qs)
    total_reel = sum(c.quantity or 0 for c in qs)
    return render(request, 'portal/saisie.html', {"user": user, "formset": formset, "month": month, "total_prev": total_prev, "total_reel": total_reel})


def budget(request):
    user = _get_user(request)
    if not user:
        return redirect('login')
    lines = BudgetLine.objects.select_related('part').order_by('part__code')
    if request.method == 'POST':
        action = request.POST.get('action')
        if action == 'toggle':
            line_id = request.POST.get('line_id')
            try:
                line = lines.get(id=line_id)
                line.selected = not line.selected
                line.save()
            except BudgetLine.DoesNotExist:
                pass
        elif action == 'toggle_all':
            all_selected = lines.filter(selected=True).count() != lines.count()
            lines.update(selected=all_selected)
        elif action == 'approve':
            lines.update(selected=False)
            messages.success(request, "Achats approuvés (démo)")
        return redirect('/budget/')

    selected_total = sum(l.total for l in lines if l.selected)
    total_budget = 2_000_000
    used_budget = 1_234_500
    available = total_budget - used_budget
    after = available - selected_total
    return render(
        request,
        'portal/budget.html',
        {"user": user, "lines": lines, "selected_total": selected_total, "available": available, "after": after, "total_budget": total_budget, "used_budget": used_budget},
    )


def administration(request):
    user = _get_user(request)
    if not user:
        return redirect('login')
    if request.method == 'POST':
        alert_id = request.POST.get('alert_id')
        try:
            a = Alert.objects.get(id=alert_id)
            a.processed = True
            a.save()
        except Alert.DoesNotExist:
            pass
        return redirect('/administration/')

    alerts = Alert.objects.order_by('-date')
    return render(request, 'portal/administration.html', {"user": user, "alerts": alerts})

