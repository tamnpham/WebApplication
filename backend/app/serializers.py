from django.contrib.postgres import fields
from rest_framework import serializers
from app.models import Users, Questions, Categories

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'name', 'username', 'email', 'role']

class QuestionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Questions
        fields = '__all__'

class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Categories
        fields = ['id', 'title', 'description']
