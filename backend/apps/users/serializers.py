from rest_framework import serializers

from apps.questions.serializers import CategorySerializer

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


class UserSerializer(serializers.HyperlinkedModelSerializer):
    """Serializer for representing User."""
    avatar_url = serializers.SerializerMethodField()
    max_score = serializers.SerializerMethodField("get_max_score")
    top_3_scores = serializers.SerializerMethodField("get_top_3_scores")

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

            'avatar_url',
            'max_score',
            'top_3_scores',
        )
        read_only_fields = (
            "email",
            "role",
        )

    # https://stackoverflow.com/a/35522896
    def get_avatar_url(self, instance):
        """Customize image serialization method."""
        request = self.context.get("request")
        image_url = None
        if instance.avatar and instance.avatar.url:
            image_url = instance.avatar.url
            image_url = request.build_absolute_uri(image_url)
        return image_url

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


class BlogAuthorSerializer(serializers.HyperlinkedModelSerializer):
    """Serializer for representing Blog's Author."""
    avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            "first_name",
            "last_name",
            "avatar_url",
        )

    # https://stackoverflow.com/a/35522896
    def get_avatar_url(self, instance):
        """Customize image serialization method."""
        request = self.context.get("request")
        image_url = None
        if instance.avatar and instance.avatar.url:
            image_url = instance.avatar.url
            image_url = request.build_absolute_uri(image_url)
        return image_url
