from django.conf import settings
from django.db import models
from producers.managers import ProducerManager


class Producer(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, primary_key=True
    )
    biography = models.TextField(blank=True, null=True, max_length=3000)

    # TODO:O impelemnt these with a ForeingnKey in their models, same as listings
    # orders = models.ManyToManyField(Order, related_name="producers")
    # reviews = models.ManyToManyField(Review, related_name="producers")

    objects = ProducerManager()
