from django.http.response import HttpResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import mixins, status
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from apps.core import responses
from apps.questions.models import Category

from .models import Blog
from .serializers import BlogSerializer


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


# @method_decorator(csrf_exempt, name='dispatch')
class BlogUpdateAPI(RetrieveUpdateAPIView):
    """APIview for updating blog."""
    serializer_class = BlogSerializer
    permission_classes = (
        IsAuthenticated,
    )
    http_method_names = ('post',)

    def post(self, request, *args, **kwargs):
        blog_id = kwargs.get("blog_id")
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

        category_id = request.data.get("category")
        category = Category.objects.filter(pk=category_id)
        if category_id and not category:
            if not category:
                return Response(
                    data={
                        "status": "error",
                        "message": "Category not found.",
                    },
                    status=status.HTTP_404_NOT_FOUND
                )
            category = category.get()   # Get object from queryset
            blog.category = category

        fields = (
            "title",
            "content",
        )
        for field in fields:
            value = request.data.get(field)
            if value:
                setattr(blog, field, value)

        blog.save()
        return responses.client_success(data=None)
