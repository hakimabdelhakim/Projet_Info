from django.db import models


class Part(models.Model):
    code = models.CharField(max_length=64, primary_key=True)
    designation = models.CharField(max_length=255, blank=True, default="")
    criticite = models.CharField(max_length=16, default="normal")
    stock_actuel = models.FloatField(default=0)
    stock_securite = models.FloatField(default=0)
    moyenne_m3 = models.FloatField(default=0)
    prevision_m1 = models.FloatField(default=0)
    ecart_pourcent = models.FloatField(default=0)
    prix_unitaire = models.FloatField(default=0)
    fournisseur = models.CharField(max_length=255, blank=True, default="")
    delai = models.FloatField(default=0)  # jours
    n_ac_2025 = models.FloatField(default=0)
    approuve = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Part"
        verbose_name_plural = "Parts"

    def to_dict(self):
        return {
            "code": self.code,
            "designation": self.designation,
            "criticite": self.criticite,
            "stockActuel": self.stock_actuel,
            "stockSecurite": self.stock_securite,
            "moyenneM3": self.moyenne_m3,
            "previsionM1": self.prevision_m1,
            "ecartPourcent": self.ecart_pourcent,
            "prixUnitaire": self.prix_unitaire,
            "fournisseur": self.fournisseur,
            "delai": self.delai,
            "n_ac_2025": self.n_ac_2025,
        }


class Consumption(models.Model):
    part = models.ForeignKey(Part, on_delete=models.CASCADE)
    date = models.DateField()
    valeur = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Consumption"
        verbose_name_plural = "Consumptions"
        unique_together = ("part", "date")


class BudgetConfig(models.Model):
    budget_cap = models.FloatField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Budget configuration"
        verbose_name_plural = "Budget configuration"


class Selection(models.Model):
    part = models.OneToOneField(Part, on_delete=models.CASCADE)
    selected = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Selection"
        verbose_name_plural = "Selections"


class ActivityLog(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    utilisateur = models.CharField(max_length=128, default="Système")
    role = models.CharField(max_length=64, default="Auto")
    action = models.CharField(max_length=255)
    module = models.CharField(max_length=64)
    details = models.TextField(blank=True, default="")

    class Meta:
        verbose_name = "Activity Log"
        verbose_name_plural = "Activity Logs"
