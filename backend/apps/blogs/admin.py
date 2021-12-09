from django.contrib import admin

from .models import Blog, Comment


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


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    """Management UI for Comment model."""
    ordering = ("-created",)
    list_display = (
        "user",
        "blog",
        "content",
    )
    readonly_fields = (
        "blog",
        "user",
        "created",
        "modified",
    )
