from django.db.models import query
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework import viewsets
from app.models import Users, Categories, Questions
from app.serializers import UserSerializer, QuestionSerializer,  CategorySerializer

from django.shortcuts import get_object_or_404

# Create your views here.

class ListUsersAPIView(APIView):

    def get(self, request):
        listUser = Users.objects.all()
        info = UserSerializer(listUser, many = True)
        return Response(data = info.data, status = status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DetailUsersAPIView(APIView):
    
    def get(self,request, id):
        try: 
            user = get_object_or_404(Users, pk=id)
            data = UserSerializer(user).data
            return Response(data, status = status.HTTP_200_OK)
        except:
            return Response("Error",status = status.HTTP_404_NOT_FOUND)

    def patch(self, request, id):
        user = get_object_or_404(Users, pk=id)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Categories.objects.all()