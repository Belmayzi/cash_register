from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="home"),
    path("database/", views.DbManager.as_view(), name="database"),
    path("select/", views.Selectprod.as_view(), name="select"),
]
