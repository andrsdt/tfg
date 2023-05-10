from django.db import models
from producers.managers import ProducerManager
from users.models import User


class Producer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    # products = models.ManyToManyField(Product, related_name="producers")
    # orders = models.ManyToManyField(Order, related_name="producers")
    # reviews = models.ManyToManyField(Review, related_name="producers")

    objects = ProducerManager()
