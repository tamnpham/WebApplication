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
    image = models.ImageField(
        verbose_name=_("Image"),
        null=True,
        blank=True,
        max_length=255,
    )

    class Meta:
        verbose_name = _("Blog")
        verbose_name_plural = _("Blogs")

    def __str__(self) -> str:
        return self.title


class Comment(BaseModel):
    """Manage user's comments on blog."""
    user = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        verbose_name=_("User"),
    )
    content = models.TextField(
        verbose_name=_("Content"),
    )
    blog = models.ForeignKey(
        "blogs.Blog",
        on_delete=models.CASCADE,
        verbose_name=_("Blog"),
    )

    class Meta:
        verbose_name = _("Comment")
        verbose_name_plural = _("Comments")

    def __str__(self) -> str:
        return f"{self.content[:30]}..."
