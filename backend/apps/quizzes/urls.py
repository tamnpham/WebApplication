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
]

# Extra router and url pattern for Category
# Category is in questions zone but not prepended with `question/`
result_router = DefaultRouter()
result_router.register(
    r"result",
    views.ResultViewSet,
    basename="result",
)
result_urlpatterns = result_router.urls
