from django.core.management.base import BaseCommand

from apps.questions.factories import (
    QuestionFactory,
    CategoryFactory,
)
from apps.users.factories import (
    StudentFactory,
    TeacherFactory,
)
from apps.blogs.factories import BlogFactory


class Command(BaseCommand):
    """Custom management command for sample data generator"""
    MODELS = {
        "student": StudentFactory,
        "teacher": TeacherFactory,
        "category": CategoryFactory,
        "question": QuestionFactory,
        "blog": BlogFactory,
    }

    def add_arguments(self, parser):
        parser.add_argument(
            "model",
            type=str,
            choices=self.MODELS.keys(),
            help="Name of model selected to generate sample instances",
        )
        parser.add_argument(
            "size",
            type=int,
            help="Number of new instances",
        )

    def handle(self, *args, **options):
        batch_size = options.get("size")
        model_name = options["model"]

        sample_instances = self.MODELS[model_name].create_batch(
            size=batch_size,
        )
        self.stdout.write(
            self.style.SUCCESS(
                f"Generate {batch_size} {model_name}: {sample_instances}",
            ),
        )
