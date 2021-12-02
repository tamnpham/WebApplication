from django.urls import path

from . import views

urlpatterns = [
    path("create/", views.UserCreateAPI.as_view(), name="api-user-create"),
    path("login/", views.UserLoginAPI.as_view(), name="api-user-login"),
    path(
        "profile/",
        views.UserAPI.as_view(),
        name="api-user-profile",
    ),
]
