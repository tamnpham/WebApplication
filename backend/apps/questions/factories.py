import factory

from . import models


class CategoryFactory(factory.django.DjangoModelFactory):
    """Factory for generating test Category instance."""
    class Meta:
        model = models.Category

    level = factory.Faker("pyint", min_value=0, max_value=10)
    name = factory.Sequence(lambda n: f"Category #{n}")


class QuestionFactory(factory.django.DjangoModelFactory):
    """Factory for generating test Question instance."""
    class Meta:
        model = models.Question

    category = factory.SubFactory(CategoryFactory)
    title = factory.Sequence(lambda n: f"Title of Question #{n}")
    content = factory.Sequence(lambda n: f"Content of Question #{n}")
    answers = ("A", "B", "C", "D")
    trueAnswer = factory.Faker("pyint", min_value=0, max_value=3)
