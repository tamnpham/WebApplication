import factory

from apps.questions.factories import QuestionFactory
from apps.users.factories import UserFactory

from . import models

from datetime import timedelta

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


# For small scale testing only
class ResultFactory(factory.django.DjangoModelFactory):
    """Factory for generating test Result instances."""
    class Meta:
        model = models.Result
    
    duration = factory.Faker("time_delta")
    score = factory.Faker(
        "pyfloat",
        left_digits=5,
        right_digits=2,
        min_value=0.00,
        max_value=10000.00,
    )
    n_corrects = factory.Faker(
        "pyint",
        min_value=1,
        max_value=100,
    )
    n_questions = factory.Faker(
        "pyint",
        min_value=1,
        max_value=100,
    )
    category = ...
    quiz = ...
    user = ...



