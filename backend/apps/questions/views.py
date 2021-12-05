from rest_framework import mixins
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet

from apps.core import responses
from apps.core.permissions import IsTeacherUser
from apps.core.views import CustomMixin

from .models import Category, Question
from .serializers import CategorySerializer, QuestionSerializer


class QuestionViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    CustomMixin,
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
        "post_update": (
            IsAuthenticated,    # For testing
            # IsTeacherUser,
        ),
    }
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    model = Question

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


class CategoryViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    CustomMixin,
    GenericViewSet,
):
    """ViewSet for viewing categories."""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (
        IsAuthenticated,
    )
    model = Category
