from rest_framework import serializers

from apps.users.serializers import BlogAuthorSerializer

from .models import Blog


class BlogSerializer(serializers.ModelSerializer):
    """Serializer for representing `Blog`."""
    author = BlogAuthorSerializer(read_only=True)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Blog
        fields = "__all__"

    def create(self, validated_data):
        validated_data["author"] = self.context["request"].user
        return super().create(validated_data)

    # https://stackoverflow.com/a/35522896
    def get_image_url(self, instance):
        """Customize image serialization method."""
        request = self.context.get("request")
        image_url = None
        if instance.image and instance.image.url:
            image_url = instance.image.url
            image_url = request.build_absolute_uri(image_url)
        return image_url
