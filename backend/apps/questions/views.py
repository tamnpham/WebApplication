from rest_framework import mixins, status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from apps.core import responses
from apps.core.permissions import IsTeacherUser

from .models import Category, Question
from .serializers import CategorySerializer, QuestionSerializer, QuizSerializer


class QuestionViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    GenericViewSet,
):
    """ViewSet for viewing questions."""
    permission_classes_by_action = {
        "default": (
            IsAuthenticated,
        ),
        "create": (
            IsTeacherUser,
        ),
    }
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = (
        IsAuthenticated,
    )

    #
    def get_permissions(self):
        """Get permission based on action"""
        try:
            # return permission_classes depending on `action`
            return [
                permission()
                for permission in self.permission_classes_by_action[self.action]
            ]
        except KeyError:
            # action is not set return default permission_classes
            return [
                permission()
                for permission in self.permission_classes_by_action["default"]
            ]


class QuestionCreateViewSet(
    mixins.CreateModelMixin,
    GenericViewSet,
):
    """ViewSet for creating questions."""
    serializer_class = QuestionSerializer
    permission_classes = (
        IsTeacherUser,
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
    serializer_class = QuizSerializer
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
