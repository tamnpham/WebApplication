from rest_framework import serializers

from apps.questions.serializers import QuestionSerializer

from .models import Quiz, Result


class QuizSerializer(serializers.ModelSerializer):
    """Serializer for representing `Quiz`."""
    n_questions = serializers.IntegerField()
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Quiz
        fields = (
            "id",
            "owner",
            "questions",
            "n_questions",
        )


class ResultSerializer(serializers.ModelSerializer):
    """Serializer for representing `Result`."""

    class Meta:
        model = Result
        exclude = (
            "created",
            "modified",
        )
