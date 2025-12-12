from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('previsions/', views.previsions, name='previsions'),
    path('saisie/', views.saisie, name='saisie'),
    path('budget/', views.budget, name='budget'),
    path('administration/', views.administration, name='administration'),
]
