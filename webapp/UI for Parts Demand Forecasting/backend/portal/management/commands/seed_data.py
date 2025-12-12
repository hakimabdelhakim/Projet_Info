from django.core.management.base import BaseCommand
from portal.models import Supplier, Part, Forecast, Consumption, BudgetLine, Alert

class Command(BaseCommand):
    help = "Seed demo data"

    def handle(self, *args, **kwargs):
        tech = Supplier.objects.get_or_create(name='TechCoupling SA')[0]
        indus = Supplier.objects.get_or_create(name='Indusmeca')[0]
        hydro = Supplier.objects.get_or_create(name='HydroTech Pro')[0]

        parts = [
            dict(code='ACC-001', designation='Accouplement elastique 50mm', type='elastic', criticite='urgent', supplier=tech, unit_price=550, lead_time_days=5, stock_actuel=2),
            dict(code='ACC-012', designation='Accouplement rigide 75mm', type='rigid', criticite='urgent', supplier=indus, unit_price=1300, lead_time_days=7, stock_actuel=1),
            dict(code='ACC-023', designation='Accouplement hydraulique 100mm', type='hydraulic', criticite='urgent', supplier=hydro, unit_price=3600, lead_time_days=10, stock_actuel=0),
        ]
        for p in parts:
            Part.objects.update_or_create(code=p['code'], defaults=p)

        p1 = Part.objects.get(code='ACC-001')
        p2 = Part.objects.get(code='ACC-012')
        p3 = Part.objects.get(code='ACC-023')

        for p, moy, prev, ecart in [
            (p1, 15, 18, 20),
            (p2, 10, 12, 20),
            (p3, 6, 8, 33),
        ]:
            Forecast.objects.update_or_create(part=p, month='2025-10', defaults=dict(moyenne_m3=moy, prevision_m1=prev, ecart_pourcent=ecart))
            Consumption.objects.update_or_create(part=p, month='2025-10', defaults=dict(quantity=None, status='en_attente'))
            BudgetLine.objects.update_or_create(part=p, defaults=dict(quantity=prev, unit_price=p.unit_price))

        for a in [
            dict(type='critique', severity='haute', message='Rupture imminente', details='ACC-023'),
            dict(type='warning', severity='moyenne', message='Ecart prevision/reel', details='ACC-012'),
        ]:
            Alert.objects.get_or_create(message=a['message'], defaults=a)

        self.stdout.write(self.style.SUCCESS('Seeded demo data.'))
