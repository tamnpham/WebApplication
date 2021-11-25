import uuid
import factory

from . import models

DEFAULT_PASSWORD = "LSExam123!"


class UserFactory(factory.django.DjangoModelFactory):
    """Factory for generate test User instance"""
    first_name = factory.Faker("first_name")
    last_name = factory.Faker("last_name")
    # avatar = factory.django.ImageField(color="magenta")
    phone = factory.Faker("phone_number")
    password = factory.PostGenerationMethodCall(
        "set_password",
        DEFAULT_PASSWORD,
    )

    class Meta:
        model = models.User

    @factory.lazy_attribute
    def email(self):
        """Return formatted email."""
        return (
            f"{uuid.uuid4()}@"
            f"lsexam.com"
        )


class StudentFactory(UserFactory):
    """Factory for generating User instance with student role"""
    role = models.User.STUDENT


class TeacherFactory(UserFactory):
    """Factory for generating User instance with teacher role"""
    role = models.User.TEACHER
