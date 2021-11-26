from django.urls import include, path

from apps.questions.urls import category_urlpatterns

app_name = "api"

urlpatterns = [
    # API URLS
    path("user/", include("apps.users.urls")),
    path("question/", include("apps.questions.urls")),
    path("blog/", include("apps.blogs.urls")),
]

urlpatterns += category_urlpatterns
