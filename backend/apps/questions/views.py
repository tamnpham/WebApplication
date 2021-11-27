from rest_framework import mixins, status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.renderers import JSONRenderer
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
    GenericViewSet,
):
    """ViewSet for viewing questions."""
    permission_classes_by_action = {
        "default": (
            IsAuthenticated,
        ),
        "create": (
            # IsTeacherUser,
            IsAuthenticated,
        ),
    }
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    # permission_classes = (
    #     IsAuthenticated,
    # )

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
