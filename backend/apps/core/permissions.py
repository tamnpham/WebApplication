from rest_framework.permissions import BasePermission

from apps.users.models import User


class IsTeacherUser(BasePermission):
    """Allows access only to Teacher users."""

    def has_permission(self, request, view):
        return bool(request.user and request.user.role == User.TEACHER)


class IsAdminRoleUser(BasePermission):
    """Allow access only to Admin-role users."""

    def has_permission(self, request, view):
        return bool(request.user and request.user.role == User.ADMIN)


class IsAdminOrTeacher(BasePermission):
    """Permission class for modification on Question."""

    def has_permission(self, request, view):
        return bool(
            request.user and
            (
                request.user.role == User.ADMIN or
                request.user.role == User.TEACHER
            ),
        )
