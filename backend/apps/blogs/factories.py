import factory

from apps.users.factories import UserFactory

from . import models


class BlogFactory(factory.django.DjangoModelFactory):
    """Factory for generating test Blog instances."""
    class Meta:
        model = models.Blog

    author = factory.SubFactory(UserFactory)
    title = factory.Sequence(lambda n: f"Title of Blog #{n}")
    content = factory.Sequence(lambda n: f"Content of Blog #{n}")
