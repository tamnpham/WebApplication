from rest_framework import status
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound
from rest_framework.response import Response

from .paginations import StandardPagination
from .responses import client_error, client_success


class CustomMixin:
    """Custom mixin support partially instance updating by post method."""
    model = None
    # pagination_class = StandardPagination
    filterset_class = None
    permission_classes_map = None
    permission_default_field = "default"

    def get_permissions(self):
        """Get permission based on action."""
        if not self.permission_classes_map:
            return super().get_permissions()
        action = self.action
        if not action:
            action = self.permission_default_field
        return (
            permission()
            for permission in self.permission_classes_map[action]
        )

    def get_filterset_class(self):
        """Return filterset class"""
        return self.filterset_class

    def get_queryset(self):
        """Apply filter for queryset."""
        queryset = super().get_queryset()
        filterset_class = self.get_filterset_class()
        if filterset_class:
            filter = filterset_class(self.request.GET, queryset=queryset)
            queryset = filter.qs
        return queryset

    def get_model(self):
        """Get appropriate model."""
        if not self.model:
            raise NotFound("Model has not been declared.")
        return self.model

    @action(detail=False, methods=("post",))
    def post_update(self, request, *args, **kwargs):
        """Update a instance given instance's ID by post method."""
        instance_id = request.data.get("id")
        instance = self.get_model().objects.filter(pk=instance_id)
        if not instance_id or not instance:
            return Response(
                data={
                    "status": "error",
                    "message": f"{self.get_model().__name__} not found.",
                },
                status=status.HTTP_404_NOT_FOUND
            )
        instance = instance.get()       # Get object from queryset
        serializer = self.get_serializer(
            instance,
            data=request.data,
            partial=True,
        )
        if not serializer.is_valid():
            return client_error("Invalid data.")
        serializer.save()
        return client_success(data=None)
