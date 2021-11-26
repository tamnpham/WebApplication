from django.urls.conf import path
from django.views.decorators.csrf import csrf_exempt
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(
    r"",
    views.BlogViewSetAPI,
    basename="blog",
)
urlpatterns = [
    path(
        "<int:blog_id>/update/",
        # csrf_exempt(views.BlogUpdateAPI.as_view()),
        views.BlogUpdateAPI.as_view(),
        name="blog-update",
    ),
]
urlpatterns += router.urls
