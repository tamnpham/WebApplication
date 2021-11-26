from rest_framework import serializers

from .models import User


class UserCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('email', 'password', 'role')


class UserSerializer(serializers.HyperlinkedModelSerializer):
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
