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
    path(
        "filter/",
        views.QuestionViewSet.as_view({"post": "filter"}),
        name="question-list-by-category",
    ),
    path(
        "update/",
        views.QuestionViewSet.as_view({"post": "update_question"}),
        name="question-update",
    ),
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
