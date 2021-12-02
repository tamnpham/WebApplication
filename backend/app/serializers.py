from django.contrib.postgres import fields
from rest_framework import serializers
from app.models import Question, Category
from django.contrib.auth.models import User

class RegistrationSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(max_length=50, min_length=6)
    username = serializers.CharField(max_length=50, min_length=6)
    password = serializers.CharField(max_length=150, write_only=True)
    name = serializers.CharField(max_length=250)
    class Meta:
        model = User
        fields = ['id', 'name','email', 'username', 'password', 'role']
    def validate(self, args):
        email = args.get('email', None)
        username = args.get('username', None)
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({'email': ('Email already exists')})
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError({'username': ('Username already exists')})

        return super().validate(args)
  
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'username', 'email', 'role']

class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'title', 'description']

class QuestionSerializer(serializers.ModelSerializer):
    # category = CategorySerializer(read_only=False)
    class Meta:
        model = Question
        fields = ['id', 'description', 'category', 'choices', 'answer', 'level']
