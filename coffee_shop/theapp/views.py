from django.http.response import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.http import HttpResponse

from django.views.decorators.csrf import csrf_exempt, csrf_protect

from rest_framework.response import Response
from rest_framework.views import APIView

from .api.serializers import DbAddToSerializer, DbEditSerializer, DbselectSerializer

from .models import Products
from django.core import serializers


@csrf_protect
def index(request):
    items = Products.objects.all()
    return render(request, "theapp/home.html", {"items": items})


def Dbpage(request):
    return render(request, "theapp/database.html")


class DbManager(APIView):
    def get(self, request, *args, **kwargs):
        items = Products.objects.all()
        return render(request, "theapp/database.html", {"items": items})

    def post(self, request, *args, **kwargs):
        serializer = DbAddToSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return HttpResponseRedirect("/database")
        return Response(serializer.errors)

    def put(self, request, *args, **kwargs):

        data = request.data
        instance = Products.objects.get(id=data["id"])

        instance.name = data["name"]
        instance.price = data["price"]
        serializer = DbEditSerializer(instance, data=request.data)

        instance.save()

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, *args, **kwargs):
        # select multiple rows to delete at once
        data = request.data
        instance = Products.objects.get(id=data["id"])
        instance.delete()

        return Response(data)


class Selectprod(APIView):
    def get(self, request, *args, **kwargs):
        products = Products.objects.filter(selected=True)
        products_json = serializers.serialize("json", products)
        return HttpResponse(products_json, content_type="application/json")

    def put(self, request, *args, **kwargs):
        data = request.data
        instance = Products.objects.get(id=data["id"])
        instance.selected = True
        serializer = DbselectSerializer(instance, data=request.data)

        instance.save()
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
