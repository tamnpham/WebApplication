from django.contrib import admin

from .models import Blog


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    """Management UI for Blog model."""
    ordering = ("-created",)
    list_display = (
        "author",
        "title",
        "content",
    )
    readonly_fields = (
        "created",
        "modified",
    )
