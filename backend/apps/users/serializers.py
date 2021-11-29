from rest_framework import serializers

from .models import User


class UserCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('email', 'password', 'role')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            'first_name',
            'last_name',
            'phone',
            'avatar',
            'school',
            'major',

            'email',
            'role',
        )
        read_only_fields = (
            "email",
            "role",
        )
        extra_kwargs = {
            "email": {
                "required": False,
            },
        }

    # https://stackoverflow.com/a/35522896
    def get_avatar(self, instance):
        """Customize image serialization method."""
        request = self.context.get("request")
        image_url = None
        if instance.avatar and instance.avatar.url:
            image_url = instance.avatar.url
            image_url = request.build_absolute_uri(image_url)
        return image_url
