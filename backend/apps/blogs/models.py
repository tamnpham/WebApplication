from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.core.models import BaseModel


class Blog(BaseModel):
    """Manage blog of users."""

    author = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        verbose_name=_("Author"),
    )
    title = models.CharField(
        max_length=255,
        verbose_name=_("Title"),
    )
    content = models.TextField(
        verbose_name=_("Content"),
    )
    category = models.ForeignKey(
        "questions.Category",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name=_("Category"),
    )

    class Meta:
        verbose_name = _("Result")
        verbose_name_plural = _("Result")

    def __str__(self) -> str:
        return self.title
