from django.conf import settings
from rest_framework import serializers

from apps.core.serializers import CustomSerializerMixin

from .models import Category, Question


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for representing `Category`."""
    numberQuestions = serializers.IntegerField(required=False)

    class Meta:
        model = Category
        exclude = (
            "created",
            "modified",
        )


class QuestionSerializer(
    serializers.ModelSerializer,
    CustomSerializerMixin,
):
    """Serializer for representing `Question`."""
    categoryInfo = serializers.SerializerMethodField(read_only=True)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = "__all__"

    # https://stackoverflow.com/a/35522896
    def get_image_url(self, instance):
        """Customize image serialization method."""
        return self.to_url(instance.image)

    def get_categoryInfo(self, instance):
        """Get serialized category information."""
        category = instance.category
        return {
            "id": category.id,
            "name": category.name
        }
