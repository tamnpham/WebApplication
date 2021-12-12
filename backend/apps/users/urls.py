from django.urls import path
from rest_framework.routers import DefaultRouter

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

# Extra router and url pattern for Admin management
# Admin management is in user zone but not prepended with `user/`
admin_router = DefaultRouter()
admin_router.register(
    r"admin",
    views.AdminManagementViewSet,
    basename="admin",
)
admin_urlpatterns = [
    path(
        "admin/update/",
        views.AdminManagementViewSet.as_view({"post": "post_update"}),
        name="admin-update",
    ),
    path(
        "admin/promote/",
        views.AdminManagementViewSet.as_view({"post": "promote"}),
        name="admin-promote",
    ),
]
admin_urlpatterns += admin_router.urls
