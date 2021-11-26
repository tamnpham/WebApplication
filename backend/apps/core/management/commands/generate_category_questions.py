from django.core.management.base import BaseCommand

from apps.questions.factories import CategoryFactory, QuestionFactory


class Command(BaseCommand):
    """Custom management command for sample category questions generator."""

    def add_arguments(self, parser):
        parser.add_argument(
            "size",
            type=int,
            help="Number of new category questions",
        )

    def handle(self, *args, **options):
        batch_size = options.get("size")
        new_category = CategoryFactory.create()
        self.stdout.write(
            self.style.SUCCESS(
                f"Generated category:"
                f"\nid: {new_category.id}"
                f"\nname: {new_category.name}"
            ),
        )

        questions = QuestionFactory.create_batch(
            size=batch_size,
            category=new_category
        )

        self.stdout.write(
            self.style.SUCCESS(
                f"Generate {batch_size} Question: {questions}",
            ),
        )
