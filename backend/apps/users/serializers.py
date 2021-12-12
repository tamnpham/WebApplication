from rest_framework import serializers

from apps.core.serializers import CustomSerializerMixin
from apps.questions.serializers import CategorySerializer
from apps.quizzes.serializers import BadgeSerializer

from .models import User


class UserCreateSerializer(serializers.ModelSerializer):
    """Serializer for representing User when creating."""
    class Meta:
        model = User
        fields = (
            'id',
            'first_name',
            'last_name',
            'email',
            'password',
        )


class ProfileSerializer(
    serializers.HyperlinkedModelSerializer,
    CustomSerializerMixin,
):
    """Serializer for representing User."""
    avatar_url = serializers.SerializerMethodField()
    max_score = serializers.SerializerMethodField("get_max_score")
    top_3_scores = serializers.SerializerMethodField("get_top_3_scores")
    badges = BadgeSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = (
            'first_name',
            'last_name',
            'phone',
            'avatar',
            'school',
            'major',
            'avatar',
            'badges',

            'email',
            'role',

            'avatar_url',
            'max_score',
            'top_3_scores',
        )
        read_only_fields = (
            "email",
            "role",
        )

    def get_avatar_url(self, instance):
        """Customize image serialization method."""
        return self.to_url(instance.avatar)

    def get_max_score(self, instance):
        """Get max score among categories for a given user."""
        scoreboard = self.context.get("scoreboard")
        max_overall_category = None
        if scoreboard:
            max_instance = scoreboard.first()
            max_overall_category = CategorySerializer(
                instance=max_instance.category,
            ).data
            max_overall_category.update({
                "score": max_instance.score,
            })
        return max_overall_category

    def get_top_3_scores(self, instance):
        """Get top 3 scores among categories for a given user."""
        scoreboard = self.context.get("scoreboard")
        top_3 = []
        if scoreboard:
            for entry in scoreboard[:3]:
                data = CategorySerializer(instance=entry.category).data
                data["score"] = entry.score
                top_3.append(data)
        return top_3


class BlogAuthorSerializer(
    serializers.HyperlinkedModelSerializer,
    CustomSerializerMixin,
):
    """Serializer for representing Blog's Author."""
    avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            "first_name",
            "last_name",
            "avatar_url",
            "avatar",
        )

    def get_avatar_url(self, instance):
        """Customize image serialization method."""
        return self.to_url(instance.avatar)


class UserManagementSerializer(serializers.ModelSerializer):
    """Serializer for representing User Management feature."""
    avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = User
        exclude = (
            "password",
        )
        read_only_fields = (
            "email",
        )

    def get_avatar_url(self, instance):
        """Customize image serialization method."""
        return self.to_url(instance.avatar)
