import django_filters

from .models import Blog, Comment


class BlogFilter(django_filters.FilterSet):
    """Filter for Blog model."""
    title = django_filters.CharFilter(lookup_expr="icontains")
    content = django_filters.CharFilter(lookup_expr="icontains")

    class Meta:
        model = Blog
        fields = (
            "title",
            "content",
        )


class CommentFilter(django_filters.FilterSet):
    """Filter for Comment model."""
    content = django_filters.CharFilter(lookup_expr="icontains")

    class Meta:
        model = Comment
        fields = (
            "content",
        )
