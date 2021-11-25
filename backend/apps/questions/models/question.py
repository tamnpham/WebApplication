from django.contrib.postgres import fields as postgres_fields
from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.core.models import BaseModel


class Question(BaseModel):
    """Manage questions."""

    category = models.ForeignKey(
        "questions.Category",
        on_delete=models.CASCADE,
        verbose_name=_("Category"),
    )
    code = models.CharField(
        verbose_name=_("Code"),
        max_length=255,
        blank=True,
        null=True,
    )
    title = models.CharField(
        verbose_name=_("Title"),
        max_length=255,
    )
    content = models.CharField(
        verbose_name=_("Content"),
        max_length=255,
    )
    answers = postgres_fields.ArrayField(
        verbose_name=_("Answer"),
        base_field=models.TextField(),
    )
    trueAnswer = models.IntegerField(
        verbose_name=_("True answer"),
    )
    image = models.ImageField(
        verbose_name=_("Image"),
        null=True,
        blank=True,
    )

    class Meta:
        verbose_name = _("Question")
        verbose_name_plural = _("Question")

    def __str__(self) -> str:
        return self.title
