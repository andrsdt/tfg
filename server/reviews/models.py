from django.db import models
from grocerin.mixins import TimestampsMixin
from orders.models import Order
from reviews.managers import ReviewManager


class Review(TimestampsMixin):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name="review")
    rating = models.PositiveIntegerField()
    comment = models.TextField(max_length=150, null=True)
    # TODO: is_anonymous

    objects = ReviewManager()

    class Meta:
        ordering = ["-created_at"]
