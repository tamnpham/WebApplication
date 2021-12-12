from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.core.models import BaseModel

from .result import Result


class Badge(BaseModel):
    """Badge class for certain achievements."""

    title = models.CharField(
        verbose_name=_("Title"),
        max_length=255,
    )
    image = models.ImageField(
        verbose_name=_("Badge image"),
        null=True,
        blank=True,
        upload_to=settings.DEFAULT_MEDIA_PATH,
        max_length=255,
    )
    required_points = models.DecimalField(
        max_digits=7,
        decimal_places=2,
        verbose_name=_("Required points to achieve the badge."),
        default=settings.DEFAULT_BADGE_REQUIRED_VALUES,
    )
    required_exams = models.IntegerField(
        verbose_name=_("Required exams to achieve the badge."),
        default=settings.DEFAULT_BADGE_REQUIRED_VALUES,
    )

    def is_sastified(self, user):
        """Check if the given user sastifies the requirements of the badge."""
        queryset = Result.objects.filter(user=user.id)
        n_exams = queryset.count()
        max_score = queryset.order_by("-score").first().score
        if (
            n_exams >= self.required_exams and
            max_score >= self.required_points
        ):
            return True
        return False

    class Meta:
        verbose_name = _("Badge")
        verbose_name_plural = _("Badges")
