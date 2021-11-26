from django.urls.conf import path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(
    r"",
    views.BlogViewSet,
    basename="blog",
)
urlpatterns = []
urlpatterns += router.urls
