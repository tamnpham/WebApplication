from django.urls import include, path

from apps.blogs.urls import comment_urlpatterns
from apps.questions.urls import category_urlpatterns
from apps.users.urls import admin_urlpatterns

app_name = "api"

urlpatterns = [
    # API URLS
    path("user/", include("apps.users.urls")),
    path("question/", include("apps.questions.urls")),
    path("blog/", include("apps.blogs.urls")),
    path("quiz/", include("apps.quizzes.urls")),
]

urlpatterns += category_urlpatterns
urlpatterns += comment_urlpatterns
urlpatterns += admin_urlpatterns
