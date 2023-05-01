from django.utils import timezone
from factory import PostGenerationMethodCall
from factory.django import DjangoModelFactory
from factory.faker import Faker

# Faker.seed(0)

USER_PASSWORD = "password"


class UserFactory(DjangoModelFactory):
    first_name = Faker("first_name")
    last_name = Faker("last_name")
    email = Faker("email")
    password = PostGenerationMethodCall("set_password", USER_PASSWORD)
    is_active = Faker("boolean", chance_of_getting_true=80)
    date_joined = Faker("date_time_this_decade", tzinfo=timezone.utc)

    class Meta:
        model = "users.User"

        # If you are trying to create a user with an email that already exists, skip it
        django_get_or_create = ["email"]
