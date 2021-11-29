from rest_framework import serializers

from .models import Category, Question


class QuestionSerializer(serializers.ModelSerializer):
    """Serializer for representing `Question`."""
    image = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = "__all__"

    # https://stackoverflow.com/a/35522896
    def get_image(self, instance):
        """Customize image serialization method."""
        request = self.context.get("request")
        image_url = None
        if instance.image and instance.image.url:
            image_url = instance.image.url
            image_url = request.build_absolute_uri(image_url)
        return image_url


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for representing `Category`."""

    class Meta:
        model = Category
        fields = "__all__"
