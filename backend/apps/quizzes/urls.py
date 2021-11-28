from django.urls.conf import path

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
