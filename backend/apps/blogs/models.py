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

    class Meta:
        verbose_name = _("Result")
        verbose_name_plural = _("Result")
