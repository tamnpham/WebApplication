from django.contrib import admin

from .models import Quiz, Result


@admin.register(Result)
class ResultAdmin(admin.ModelAdmin):
    """Management UI for Result model."""
    ordering = ("-created", )
    list_display = (
        "user",
        "category",
        "duration",
        "score",
        "numberCorrects",
        "numberQuestions",
    )
    readonly_fields = (
        "created",
        "modified",
    )


@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    """Management UI for Result model."""
    ordering = ("-created", )
    list_display = (
        "owner",
        "get_questions",
        "numberQuestions",
    )
    readonly_fields = (
        "created",
        "modified",
    )

    def get_questions(self, obj):
        return "\n".join([
            quest.title for quest in obj.questions.all()
        ])
