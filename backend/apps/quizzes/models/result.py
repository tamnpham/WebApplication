from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.core.models import BaseModel


class Result(BaseModel):
    """Manage results of users"""

    user = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        verbose_name=_("User"),
    )
    category = models.ForeignKey(
        "questions.Category",
        on_delete=models.CASCADE,
        verbose_name=_("Category"),
        null=True,
        blank=True,
    )
    duration = models.DurationField(
        verbose_name=_("Duration"),
        null=True,
        blank=True,
    )
    score = models.DecimalField(
        max_digits=7,       # Max 100 questions, 100 point / 1 question
        decimal_places=2,
        verbose_name=_("Score"),
    )
    n_corrects = models.IntegerField(
        verbose_name=_("Number of correct answers"),
    )
    n_questions = models.IntegerField(
        verbose_name=_("Number of question a user took"),
    )
    quiz = models.ForeignKey(
        "quizzes.Quiz",
        on_delete=models.CASCADE,
        verbose_name=_("Quiz"),
    )

    class Meta:
        verbose_name = _("Result")
        verbose_name_plural = _("Results")
