from django import forms
from django.forms import modelformset_factory
from .models import Consumption


class ConsumptionForm(forms.ModelForm):
    class Meta:
        model = Consumption
        fields = ["id", "quantity", "status"]
        widgets = {
            "id": forms.HiddenInput(),
            "quantity": forms.NumberInput(attrs={"class": "w-20 text-center rounded-input border-neutral-300"}),
            "status": forms.Select(
                choices=(
                    ("en_attente", "En attente"),
                    ("valide", "Validé"),
                ),
                attrs={"class": "rounded-input border-neutral-300"},
            ),
        }


ConsumptionFormSet = modelformset_factory(
    Consumption,
    form=ConsumptionForm,
    extra=0,
)

