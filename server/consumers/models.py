from consumers.managers import ConsumerManager
from django.db import models
from users.models import User


class Consumer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    # products = models.ManyToManyField(Product, related_name="consumers")
    # orders = models.ManyToManyField(Order, related_name="consumers")
    # reviews = models.ManyToManyField(Review, related_name="consumers")

    objects = ConsumerManager()
