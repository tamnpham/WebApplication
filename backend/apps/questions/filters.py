import django_filters

from .models import Question


class QuestionFilter(django_filters.FilterSet):
    """Filter for Question model."""
    content = django_filters.CharFilter(lookup_expr="icontains")

    class Meta:
        model = Question
        fields = (
            "content",
        )
