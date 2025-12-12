from django.contrib import admin
from .models import Supplier, Part, Forecast, Consumption, BudgetLine, Alert

@admin.register(Supplier)
class SupplierAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)


@admin.register(Part)
class PartAdmin(admin.ModelAdmin):
    list_display = ("code", "designation", "type", "criticite", "supplier", "unit_price", "stock_actuel")
    list_filter = ("type", "criticite", "supplier")
    search_fields = ("code", "designation")


@admin.register(Forecast)
class ForecastAdmin(admin.ModelAdmin):
    list_display = ("part", "month", "moyenne_m3", "prevision_m1", "ecart_pourcent")
    list_filter = ("month",)


@admin.register(Consumption)
class ConsumptionAdmin(admin.ModelAdmin):
    list_display = ("part", "month", "quantity", "status")
    list_filter = ("month", "status")
    search_fields = ("part__code", "part__designation")


@admin.register(BudgetLine)
class BudgetLineAdmin(admin.ModelAdmin):
    list_display = ("part", "quantity", "unit_price", "selected", "total")
    list_filter = ("selected",)


@admin.register(Alert)
class AlertAdmin(admin.ModelAdmin):
    list_display = ("type", "severity", "message", "processed", "date")
    list_filter = ("type", "severity", "processed")

# Register your models here.
