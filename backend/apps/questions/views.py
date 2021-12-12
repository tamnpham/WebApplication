from rest_framework import mixins
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet

from apps.core import responses
from apps.core.permissions import IsAdminOrTeacher, IsAdminRoleUser
from apps.core.views import CustomMixin

from .filters import CategoryFilter, QuestionFilter
from .models import Category, Question
from .serializers import CategorySerializer, QuestionSerializer


class QuestionViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    CustomMixin,
    GenericViewSet,
):
    """ViewSet for viewing questions."""
    permission_classes_map = {
        "default": (IsAuthenticated,),
        "create": (IsAuthenticated, IsAdminOrTeacher,),
        "destroy": (IsAuthenticated, IsAdminOrTeacher,),
        "post_update": (IsAuthenticated, IsAdminRoleUser,),
    }
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    model = Question
    filterset_class = QuestionFilter

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
    permission_classes_map = {
        "default": (IsAuthenticated,),
        "create": (IsAuthenticated, IsAdminOrTeacher,),
        "destroy": (IsAuthenticated, IsAdminOrTeacher,),
        "post_update": (IsAuthenticated, IsAdminOrTeacher,),
    }
    model = Category
    filterset_class = CategoryFilter
