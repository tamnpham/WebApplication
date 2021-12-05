from django.core.management.base import BaseCommand

import db_import


class Command(BaseCommand):
    """Custom management command for sample data generator"""

    def add_arguments(self, parser):
        parser.add_argument(
            "--opentrivia",
            action="store_true",
        )

    def handle(self, *args, **options):
        if options.get("opentrivia"):
            db_import.import_opentrivia()
        else:
            db_import.import_via_api()
