from django.urls import path

from . import views

urlpatterns = [
    path("create/", views.UserCreateAPI.as_view(), name="api-user-create"),
    path("login/", views.UserLoginAPI.as_view(), name="api-user-login"),

    path(
        "<int:user_id>/get/",
        views.UserAPI.as_view(),
        name="api-user-get",
    ),
    path(
        "<int:user_id>/update/",
        views.UserAPI.as_view(),
        name="api-user-update",
    ),
]
