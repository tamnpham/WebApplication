from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet

from apps.core.permissions import IsTeacherUser
from apps.core.views import CustomMixin

from .filters import BlogFilter, CommentFilter
from .models import Blog, Comment
from .serializers import BlogSerializer, CommentSerializer


class BlogViewSetAPI(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    CustomMixin,
    GenericViewSet,
):
    """ViewSet for viewing blogs."""
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes_map = {
        "default": (IsAuthenticated,),
        "create": (IsTeacherUser,),
        "destroy": (IsTeacherUser,),
        "post_update": (IsTeacherUser,),
    }
    model = Blog
    filterset_class = BlogFilter


class CommentViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    CustomMixin,
    GenericViewSet,
):
    """ViewSet for viewing categories."""
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes_map = {
        "default": (IsAuthenticated,),
        "create": (IsTeacherUser,),
        "destroy": (IsTeacherUser,),
        "post_update": (IsTeacherUser,),
    }
    model = Comment
    filterset_class = CommentFilter
