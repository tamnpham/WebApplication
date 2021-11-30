from rest_framework import serializers

from apps.questions.serializers import CategorySerializer

from .models import User


class UserCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('email', 'password', 'role')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    avatar = serializers.SerializerMethodField()
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

            'max_score',
            'top_3_scores',
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
