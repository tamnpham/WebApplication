import factory

from apps.questions.factories import QuestionFactory
from apps.users.factories import UserFactory

from . import models


class QuizFactory(factory.django.DjangoModelFactory):
    """Factory for generating test Quiz instances."""
    class Meta:
        model = models.Quiz

    owner = factory.SubFactory(UserFactory)

    @factory.post_generation
    def questions(obj, create, extracted, **kwargs):
        if not create:
            return

        if extracted:
            assert isinstance(extracted, int)
            questions = QuestionFactory.create_batch(
                size=extracted,
                **kwargs,
            )
            for quest in questions:
                obj.questions.add(quest)
