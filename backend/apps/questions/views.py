from rest_framework import mixins
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet

from apps.core.permissions import IsTeacherUser

from .models import Category, Question
from .serializers import (CategorySerializer, QuestionReturnSerializer,
                          QuestionSerializer)
from apps.core import responses


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
            IsAuthenticated,    # For testing
            # IsTeacherUser,
        ),
    }
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    serializer_action_classes = {
        "default": QuestionReturnSerializer,
        "create": QuestionSerializer,
    }

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

    def get_serializer_class(self):
        """Get serializer based on action."""
        try:
            return self.serializer_action_classes[self.action]
        except (KeyError, AttributeError):
            return self.serializer_action_classes["default"]

    @action(detail=False, methods=("post",))
    def filter(self, request):
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
