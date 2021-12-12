from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.models import UserManager as DjangoUserManager
from django.core import validators
from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.core.models import BaseModel
from apps.quizzes.models import Badge


class UserManager(DjangoUserManager):
    """Adjusted user manager that works w/o `username` field."""

    def _create_user(self, email, password, **extra_fields):
        """Create and save a user with the given email and password."""
        if not email:
            raise ValueError("The given email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """Create superuser instance (used by `createsuperuser` cmd)."""
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("role", User.ADMIN)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        # Ensure superuser also has Teacher privilege
        if extra_fields.get("role") is not User.TEACHER:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email, password, **extra_fields)


class User(
    AbstractBaseUser,
    PermissionsMixin,
    BaseModel,
):
    """Custom user model without username."""

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    STUDENT = "Student"
    TEACHER = "Teacher"
    ADMIN = "Admin"

    ROLES = (
        (STUDENT, "Student"),
        (TEACHER, "Teacher"),
        (ADMIN, "Admin"),
    )
    first_name = models.CharField(
        verbose_name=_("First name"),
        max_length=255,
        blank=True,
    )
    last_name = models.CharField(
        verbose_name=_("Last name"),
        max_length=255,
        blank=True,
    )

    is_staff = models.BooleanField(
        verbose_name=_("Staff status"),
        default=False,
        help_text="Designates whether the user can log into this admin site.",
    )
    is_active = models.BooleanField(
        verbose_name=_("Active"),
        default=True,
        help_text="Designates whether this user should be treated as active.",
    )

    avatar = models.ImageField(
        verbose_name=_("Avatar image"),
        null=True,
        blank=True,
        upload_to=settings.DEFAULT_MEDIA_PATH,
        max_length=255,
    )

    email = models.CharField(
        verbose_name=_("Email address"),
        max_length=254,
        blank=False,
        unique=True,
        validators=[validators.validate_email],
    )

    role = models.CharField(
        verbose_name=_("Role"),
        max_length=255,
        choices=ROLES,
        default=STUDENT,
    )

    phone = models.CharField(
        verbose_name=_("Phone"),
        max_length=30,
        blank=True,
        null=True,
    )

    school = models.CharField(
        verbose_name=_("School"),
        max_length=255,
        blank=True,
        null=True,
    )

    major = models.CharField(
        verbose_name=_("Major"),
        max_length=255,
        null=True,
        blank=True,
    )

    badges = models.ManyToManyField(
        "quizzes.Badge",
        verbose_name=_("Badge based on the highest score"),
    )

    def check_and_add_badges(self):
        """Check badge's requirements and add if all conditions are met."""
        achieved_badges = self.badges.values("id")
        remaining_badges = Badge.objects.exclude(pk__in=achieved_badges)
        result = []
        for badge in remaining_badges:
            if badge.is_sastified(self):
                self.badges.add(badge)
                result.append(badge)
        return result

    @property
    def full_name(self):
        """Return user's full name

        Returns:
            str: first name + last name
        """
        return f"{self.first_name} {self.last_name}"

    def __str__(self):
        return self.email
