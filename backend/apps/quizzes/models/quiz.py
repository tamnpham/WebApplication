from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.core.models import BaseModel


class Quiz(BaseModel):
    """Quiz, a list of questions."""

    owner = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        verbose_name=_("Owner"),
    )
    questions = models.ManyToManyField(
        "questions.Question",
        verbose_name=_("Question"),
    )

    @property
    def numberQuestions(self):
        return self.questions.count()

    class Meta:
        verbose_name = _("Quiz")
        verbose_name_plural = _("Quizzes")
