from django.db import models


class Supplier(models.Model):
    name = models.CharField(max_length=200, unique=True)

    def __str__(self) -> str:
        return self.name


class Part(models.Model):
    TYPE_CHOICES = (
        ("elastic", "Élastique"),
        ("rigid", "Rigide"),
        ("hydraulic", "Hydraulique"),
        ("chain", "Chaîne"),
        ("magnetic", "Magnétique"),
    )
    CRITICITY_CHOICES = (
        ("urgent", "Urgent"),
        ("moyen", "Moyen"),
        ("normal", "Normal"),
    )

    code = models.CharField(max_length=50, unique=True)
    designation = models.CharField(max_length=255)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    criticite = models.CharField(max_length=20, choices=CRITICITY_CHOICES, default="normal")
    supplier = models.ForeignKey(Supplier, on_delete=models.PROTECT, related_name="parts")
    unit_price = models.DecimalField(max_digits=12, decimal_places=2)
    lead_time_days = models.PositiveIntegerField(default=0)
    stock_actuel = models.IntegerField(default=0)

    def __str__(self) -> str:
        return f"{self.code} - {self.designation}"


class Forecast(models.Model):
    part = models.ForeignKey(Part, on_delete=models.CASCADE, related_name="forecasts")
    month = models.CharField(max_length=7)  # e.g., 2025-10
    moyenne_m3 = models.IntegerField(default=0)
    prevision_m1 = models.IntegerField(default=0)
    ecart_pourcent = models.IntegerField(default=0)

    class Meta:
        unique_together = ("part", "month")


class Consumption(models.Model):
    part = models.ForeignKey(Part, on_delete=models.CASCADE, related_name="consumptions")
    month = models.CharField(max_length=7)
    quantity = models.IntegerField(null=True, blank=True)
    status = models.CharField(max_length=20, default="en_attente")

    class Meta:
        unique_together = ("part", "month")


class BudgetLine(models.Model):
    part = models.ForeignKey(Part, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    unit_price = models.DecimalField(max_digits=12, decimal_places=2)
    selected = models.BooleanField(default=False)

    @property
    def total(self):
        return self.quantity * self.unit_price


class Alert(models.Model):
    TYPE_CHOICES = (
        ("critique", "Critique"),
        ("warning", "Warning"),
        ("info", "Info"),
    )
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    severity = models.CharField(max_length=20, default="moyenne")
    message = models.CharField(max_length=255)
    details = models.CharField(max_length=255, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    processed = models.BooleanField(default=False)


# Create your models here.
