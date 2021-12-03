from rest_framework import mixins, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from apps.core import responses
from apps.core.permissions import IsTeacherUser

from .models import Category, Question
from .serializers import CategorySerializer, QuestionSerializer


class QuestionViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    GenericViewSet,
):
    """ViewSet for viewing questions."""
    permission_classes_by_action = {
        "default": (
            IsAuthenticated,
        ),
        "create": (
            IsAuthenticated,    # For testing
            # IsTeacherUser,
        ),
        "update_question": (
            IsAuthenticated,    # For testing
            # IsTeacherUser,
        ),
    }
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def get_permissions(self):
        """Get permission based on action."""
        try:
            # return permission_classes depending on `action`
            return (
                permission()
                for permission in self.permission_classes_by_action[self.action]
            )
        except KeyError:
            # action is not set return default permission_classes
            return (
                permission()
                for permission in self.permission_classes_by_action["default"]
            )

    @action(detail=False, methods=("post",))
    def filter(self, request, *args, **kwargs):
        """Get list of questions by category."""
        queryset = self.get_queryset()
        category_id = request.data.get("categoryId")
        queryset = queryset.filter(category__id=category_id)
        return responses.client_success(
            [
                self.get_serializer(quest).data
                for quest in queryset
            ]
        )

    @action(detail=False, methods=("post",))
    def update_question(self, request, *args, **kwargs):
        """Update a question given question's ID."""
        question_id = request.data.get("id")
        question = Question.objects.filter(pk=question_id)
        if not question_id or not question:
            return Response(
                data={
                    "status": "error",
                    "message": "Question not found.",
                },
                status=status.HTTP_404_NOT_FOUND
            )
        question = question.get()       # Get object from queryset
        serializer = self.get_serializer(
            question,
            data=request.data,
            partial=True,
        )
        if not serializer.is_valid():
            return responses.client_error("Invalid data.")
        serializer.save()
        return responses.client_success(data=None)


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
