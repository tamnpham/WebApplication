from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import mixins, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from apps.core import responses

from .models import Blog
from .serializers import BlogSerializer
from rest_framework.decorators import action


class BlogViewSetAPI(
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

    @action(detail=False, methods=("post",))
    def update_blog(self, request, *args, **kwargs):
        blog_id = request.data.get("id")
        blog = Blog.objects.filter(pk=blog_id)
        if not blog_id or not blog:
            return Response(
                data={
                    "status": "error",
                    "message": "Blog not found.",
                },
                status=status.HTTP_404_NOT_FOUND
            )
        blog = blog.get()       # Get object from queryset

        serializer = self.get_serializer(
            blog,
            data=request.data,
            partial=True,
        )

        if not serializer.is_valid():
            return responses.client_error("Invalid data.")
        serializer.save()
        return responses.client_success(data=None)
