from rest_framework import serializers

from .models import Blog


class BlogSerializer(serializers.ModelSerializer):
    """Serializer for representing `Blog`."""

    class Meta:
        model = Blog
        fields = "__all__"