from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet

from apps.core.permissions import IsTeacherUser

from .models import Category, Question
from .serializers import (CategorySerializer, QuestionReturnSerializer,
                          QuestionSerializer)


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
    serializer_action_classes = {
        "default": QuestionReturnSerializer,
        "create": QuestionSerializer,
    }

    def get_permissions(self):
        """Get permission based on action"""
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
        try:
            return self.serializer_action_classes[self.action]
        except (KeyError, AttributeError):
            return self.serializer_action_classes["default"]


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
