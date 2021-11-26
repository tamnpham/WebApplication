from rest_framework import mixins, status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from apps.core import responses

from .models import Category, Question
from .serializers import CategorySerializer, QuestionSerializer


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
        n_questions = request.data.get("numberQuestions")
        category_id = request.data.get("categoryId")
        if not n_questions or not category_id:
            return Response(
                data={"error": "Invalid category or number of questions."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # order_by("?") randomize queryset
        # https://stackoverflow.com/a/47618345
        questions = Question.objects.filter(
            category=category_id,
        ).order_by("?")
        n_questions = int(n_questions)
        questions = questions[:n_questions]
        data = [
            QuestionSerializer(quest).data for quest in questions
        ]
        return responses.client_success(data)
