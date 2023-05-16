from consumers.managers import ConsumerManager
from django.conf import settings
from django.db import models


class Consumer(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, primary_key=True
    )
    # products = models.ManyToManyField(Product, related_name="consumers")
    # orders = models.ManyToManyField(Order, related_name="consumers")
    # reviews = models.ManyToManyField(Review, related_name="consumers")

    objects = ConsumerManager()
