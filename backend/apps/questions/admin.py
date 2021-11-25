from django.contrib import admin

from .models import Category, Question, Result


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    """Management UI for Question model."""
    ordering = ("-created",)
    list_display = (
        "category",
        "code",
        "title",
        "content",
        "answers",
        "trueAnswer",
        "image",
    )
    readonly_fields = (
        "created",
        "modified",
    )


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """Management UI for Category model."""
    ordering = ("-created", )
    list_display = (
        "name",
        "level",
    )
    readonly_fields = (
        "created",
        "modified",
    )


@admin.register(Result)
class ResultAdmin(admin.ModelAdmin):
    """Management UI for Result model."""
    ordering = ("-created", )
    list_display = (
        "user",
        "category",
        "duration",
        "score",
        "n_corrects",
        "n_questions",
    )
    readonly_fields = (
        "created",
        "modified",
    )
