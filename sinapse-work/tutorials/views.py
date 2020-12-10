from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status

from tutorials.models import Tutorial
from tutorials.serializers import TutorialSerializer
from rest_framework.decorators import api_view


@api_view(['GET', 'POST', 'DELETE'])
def tutorial_list(request):
    # GET list of tutorials, POST a new tutorial, DELETE all tutorials
    if request.method == 'GET':
      tutorials = Tutorial.objects.all()

    title = request.GET.get('title', None)
    if title is not None:
        tutorials = tutorials.filter(title__icontains=title)

    tutorials_serializer = TutorialSerializer(tutorials, many=True)
    return JsonResponse(tutorials_serializer.data, safe=False)
    # 'safe=False' for objects serialization


@api_view(['GET', 'PUT', 'DELETE'])
def tutorial_detail(request, pk):
    # ... tutorial = Tutorial.objects.get(pk=pk)

    if request.method == 'GET':
        tutorial_serializer = TutorialSerializer(tutorial)
        return JsonResponse(tutorial_serializer.data)

    # GET / PUT / DELETE tutorial


@api_view(['GET'])
def tutorial_list_published(request):
    tutorials = Tutorial.objects.filter(published=True)

    if request.method == 'GET':
        tutorials_serializer = TutorialSerializer(tutorials, many=True)
        return JsonResponse(tutorials_serializer.data, safe=False)
