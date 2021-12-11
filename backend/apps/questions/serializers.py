from django.conf import settings
from rest_framework import serializers

from .models import Category, Question


class QuestionSerializer(serializers.ModelSerializer):
    """Serializer for representing `Question`."""
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = "__all__"

    # https://stackoverflow.com/a/35522896
    def get_image_url(self, instance):
        """Customize image serialization method."""
        request = self.context.get("request")
        image_url = None

        if instance.image and instance.image.url:
            image_url = instance.image.url
            # image_url = request.build_absolute_\uri(image_url)

            # full_domain = 'http://' + request.META['HTTP_HOST']
            # if request.META["SERVER_PORT"] not in full_domain:
            #     full_domain += ':' + request.META["SERVER_PORT"]
            # image_url = full_domain + image_url

            image_url = settings.DOMAIN_URL + image_url
        return image_url


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for representing `Category`."""

    class Meta:
        model = Category
        exclude = (
            "created",
            "modified",
        )
