from django.conf import settings
from rest_framework import serializers

from apps.users.serializers import BlogAuthorSerializer

from .models import Blog, Comment


class CommentSerializer(serializers.ModelSerializer):
    """Serializer for representing `Comment`."""
    user = BlogAuthorSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = "__all__"

    # https://stackoverflow.com/a/42346410
    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)


class BlogSerializer(serializers.ModelSerializer):
    """Serializer for representing `Blog`."""
    author = BlogAuthorSerializer(read_only=True, required=False)
    image_url = serializers.SerializerMethodField()
    comments = CommentSerializer(
        source="comment_set",
        many=True,
        required=False,
    )

    class Meta:
        model = Blog
        fields = "__all__"

    # https://stackoverflow.com/a/42346410
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
            # image_url = request.build_absolute_uri(image_url)

            # full_domain = 'http://' + request.META['HTTP_HOST']
            # if request.META["SERVER_PORT"] not in full_domain:
            #     full_domain += ':' + request.META["SERVER_PORT"]
            # image_url = full_domain + image_url

            image_url = settings.DOMAIN_URL + image_url
        return image_url
