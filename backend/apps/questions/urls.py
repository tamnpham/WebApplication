from django.urls.conf import path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(
    r"",
    views.QuestionViewSet,
    basename="question",
)
urlpatterns = [
    path("quiz/", views.QuizCreationAPI.as_view(), name="quiz-create"),
]
urlpatterns += router.urls

# Extra router and url pattern for Category
# Category is in questions zone but not prepended with `question/`
category_router = DefaultRouter()
category_router.register(
    r"category",
    views.CategoryViewSet,
    basename="category",
)
category_urlpatterns = category_router.urls
