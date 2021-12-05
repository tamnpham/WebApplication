import random

from rest_framework import serializers

from apps.questions.serializers import QuestionSerializer

from .models import Quiz, Result


class QuizSerializer(serializers.ModelSerializer):
    """Serializer for representing `Quiz`."""
    numberQuestions = serializers.IntegerField()
    # questions = QuestionSerializer(many=True)
    questions = serializers.SerializerMethodField()

    class Meta:
        model = Quiz
        fields = (
            "id",
            "owner",
            "questions",
            "numberQuestions",
        )

    def get_questions(self, instance):
        """Get shuffled list of questions."""
        # The followings don't work:
        # https://stackoverflow.com/a/47618345
        # https://stackoverflow.com/a/2118712
        # Only these methods work:
        # https://stackoverflow.com/a/12073893
        # https://stackoverflow.com/a/33512488
        questions = instance.questions.all()
        questions = sorted(questions, key=lambda x: random.random())
        return [
            QuestionSerializer(
                quest,
                # many=True,
                read_only=True,
                context=self.context,
            ).data
            for quest in questions
        ]


class ResultSerializer(serializers.ModelSerializer):
    """Serializer for representing `Result`."""
    user = serializers.SerializerMethodField()

    class Meta:
        model = Result
        fields = "__all__"

    def get_user(self, instance):
        """Get limited fields of user."""
        user = instance.user
        return {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
        }
