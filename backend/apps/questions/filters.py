import django_filters

from .models import Category, Question


class QuestionFilter(django_filters.FilterSet):
    """Filter for Question model."""
    code = django_filters.CharFilter(lookup_expr="icontains")
    content = django_filters.CharFilter(lookup_expr="icontains")

    class Meta:
        model = Question
        fields = (
            "code",
            "content",
        )


class CategoryFilter(django_filters.FilterSet):
    """Filter for Category model."""
    code = django_filters.CharFilter(lookup_expr="icontains")
    name = django_filters.CharFilter(lookup_expr="icontains")

    class Meta:
        model = Category
        fields = (
            "code",
            "name",
        )
