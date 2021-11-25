from rest_framework import mixins
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.viewsets import GenericViewSet

from apps.core import responses

from .models import Category, Question
from .serializers import CategorySerializer, QuestionSerializer
from rest_framework import serializers


class QuestionViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    GenericViewSet,
):
    """ViewSet for viewing questions."""
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = (
        IsAuthenticated,
    )


class CategoryViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    GenericViewSet,
):
    """ViewSet for viewing categories."""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (
        IsAuthenticated,
    )


class QuizCreationAPI(GenericAPIView):
    """APIView for handling quiz creation."""
    serializer_class = QuestionSerializer
    permission_classes = (
        IsAuthenticated,
    )

    def post(self, request, *args, **kwargs):
        """Return set of questions related to given category."""
        # order_by("?") randomize queryset
        # https://stackoverflow.com/a/47618345
        questions = Question.objects.filter(
            category=request.data.get("category_id"),
        ).order_by("?")
        n_questions = int(request.data.get("n_questions"))
        questions = questions[:n_questions]
        data = [
            QuestionSerializer(quest).data for quest in questions
        ]
        return responses.client_success(data)
