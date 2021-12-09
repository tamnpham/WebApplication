from django.urls.conf import path
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
        "update/",
        views.BlogViewSetAPI.as_view({"post": "post_update"}),
        name="blog-update",
    ),
]
urlpatterns += router.urls

# Extra router and url pattern for Comment
# Comment is in blogs zone but not prepended with `blog/`
comment_router = DefaultRouter()
comment_router.register(
    r"comment",
    views.CommentViewSet,
    basename="comment",
)
comment_urlpatterns = [
    path(
        "comment/update/",
        views.CommentViewSet.as_view({"post": "post_update"}),
        name="comment-update",
    ),
]
comment_urlpatterns += comment_router.urls
