from django.core.management.base import BaseCommand

import db_import


class Command(BaseCommand):
    """Custom management command for sample data generator"""

    def handle(self, *args, **options):
        db_import.import_via_api()
