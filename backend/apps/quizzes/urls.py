from django.urls.conf import path
from rest_framework.routers import DefaultRouter

from . import views

urlpatterns = [
    path(
        "create/",
        views.QuizCreationAPI.as_view(),
        name="quiz-create",
    ),
    path(
        "score/",
        views.QuizScoringAPI.as_view(),
        name="quiz-score",
    ),
    path(
        "result/",
        views.ResultViewAPI.as_view(),
        name="quiz-result-view",
    ),
    path(
        "scoreboard/",
        views.ScoreboardViewAPI.as_view(),
        name="quiz-scoreboard",
    ),
]

# Extra router and url pattern for Badge
# Badge is in blogs zone but not prepended with `blog/`
badge_router = DefaultRouter()
badge_router.register(
    r"badge",
    views.BadgeViewSet,
    basename="badge",
)
badge_urlpatterns = [
    path(
        "badge/update/",
        views.BadgeViewSet.as_view({"post": "post_update"}),
        name="badge-update",
    ),
]
badge_urlpatterns += badge_router.urls
