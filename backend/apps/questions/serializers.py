from rest_framework import serializers

from .models import Category, Question


class QuestionSerializer(serializers.ModelSerializer):
    """Serializer for representing `Question`."""

    class Meta:
        model = Question
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for representing `Category`."""

    class Meta:
        model = Category
        fields = "__all__"
