from rest_framework import serializers

from .models import Category, Question


class QuizSerializer(serializers.ModelSerializer):
    """Serializer for representing `Question`."""

    class Meta:
        model = Question
        exclude = (
            "trueAnswer",
        )

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

