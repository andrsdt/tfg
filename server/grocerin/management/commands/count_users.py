from django.core.management.base import BaseCommand

from users.models import User


"""Returns the number of users in the database"""


class Command(BaseCommand):
    def handle(self, *args, **options):
        number_users = User.objects.count()
        self.stdout.write(str(number_users))
