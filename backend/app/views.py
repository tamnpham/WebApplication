from django.db.models import query
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework import viewsets
from rest_framework import serializers
from rest_framework import permissions
import uuid
from app.models import Category, Question
from app.serializers import QuestionSerializer,  CategorySerializer, RegistrationSerializer

from django.shortcuts import get_object_or_404

# Create your views here.

class RegistrationAPIView(generics.GenericAPIView):

    serializer_class = RegistrationSerializer
    # permission_classes = (permissions.IsAuthenticated,)
    def post(self, request):
        serializer = self.get_serializer(data = request.data)
        if(serializer.is_valid()):
            serializer.save()
            return Response({
                "RequestId": str(uuid.uuid4()),
                "Message": "User created successfully",
                
                "User": serializer.data}, status=status.HTTP_201_CREATED
                )
        
        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

# class ListUsersAPIView(APIView):
#     permission_classes = (permissions.IsAuthenticated,)
#     def get(self, request):
#         listUser = User.objects.all()
#         info = UserSerializer(listUser, many = True)
#         return Response(data = info.data, status = status.HTTP_200_OK)

    # def post(self, request, format=None):
    #     serializer = UserSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class DetailUsersAPIView(APIView):
#     permission_classes = (permissions.IsAuthenticated,)
#     def get(self,request, id):
#         try: 
#             user = get_object_or_404(User, pk=id)
#             data = UserSerializer(user).data
#             return Response(data, status = status.HTTP_200_OK)
#         except:
#             return Response("Error",status = status.HTTP_404_NOT_FOUND)

#     def patch(self, request, id):
#         user = get_object_or_404(Users, pk=id)
#         serializer = UserSerializer(user, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CategoryViewSet(viewsets.ModelViewSet):
    # permission_classes = (permissions.IsAuthenticated,)
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

class QuestionViewSet(viewsets.ModelViewSet):
    # permission_classes = (permissions.IsAuthenticated,)
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()