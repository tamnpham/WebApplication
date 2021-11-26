from rest_framework.permissions import IsAuthenticated

from apps.users.models import User

class IsTeacherUser(IsAuthenticated):
    """
    Allows access only to Teacher users.
    """
    def has_permission(self, request, view):
        check_result = super().has_permission(request, view)
        return bool(check_result and request.user.role == User.TEACHER)