from django.core.management.base import BaseCommand
from halo import Halo
from users.factories import UserFactory
from users.models import User


class Command(BaseCommand):
    help = "Populates the database with sample data. Default is 10"

    def add_arguments(self, parser):
        parser.add_argument(
            "--amount",
            type=int,
            help="Indicates the amount of sample data to be populated",
        )

    def _flush_database(self):
        User.objects.all().delete()

    def _generate_users(self, amount):
        for _ in range(amount):
            UserFactory()

    @Halo(text="Populating database with sample data...", spinner="dots")
    def handle(self, *args, **options):
        amount = options.get("amount") or 10
        self._flush_database()
        self._generate_users(amount)
