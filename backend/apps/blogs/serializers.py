from django.conf import settings
from rest_framework import serializers

from apps.core.serializers import CustomSerializerMixin
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


class BlogSerializer(
    serializers.ModelSerializer,
    CustomSerializerMixin,
):
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
        return self.to_url(instance.image)
