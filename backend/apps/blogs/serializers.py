from rest_framework import serializers

from .models import Blog
from apps.users.serializers import BlogAuthorSerializer

class BlogSerializer(serializers.ModelSerializer):
    """Serializer for representing `Blog`."""
    author = BlogAuthorSerializer(read_only=True)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Blog
        fields = "__all__"

    # https://stackoverflow.com/a/35522896
    def get_image_url(self, instance):
        """Customize image serialization method."""
        request = self.context.get("request")
        image_url = None
        if instance.image and instance.image.url:
            image_url = instance.image.url
            image_url = request.build_absolute_uri(image_url)
        return image_url
