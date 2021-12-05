from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.core.models import BaseModel


class Category(BaseModel):
    """Manage category"""

    level = models.IntegerField(
        verbose_name=_("Category Level"),
        null=True,
        blank=True,
    )
    code = models.CharField(
        verbose_name=_("Code"),
        max_length=30,
        null=True,
        blank=True,
    )
    name = models.CharField(
        verbose_name=_("Category name"),
        max_length=255,
    )

    class Meta:
        verbose_name = _("Category")
        verbose_name_plural = _("Categories")

    def __str__(self) -> str:
        return self.name
