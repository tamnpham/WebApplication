from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet

from .models import Blog
from .serializers import BlogSerializer


class BlogViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    GenericViewSet,
):
    """ViewSet for viewing blogs."""
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = (
        IsAuthenticated,
    )