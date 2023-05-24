from django.db import models
from grocerin.mixins import TimestampsMixin
from listings.models import Listing
from orders.managers import OrderManager


# An order represent a transaction between a producer and a consumer.
# The system doesn't handle money transactions, so this is a way to keep
# track of the orders. When a producer sells a product, he/she can create an
# order for it indicating the quantity and the price it was sold for. The
# consumer will be notified and will be able to rate the producer for that order.
class Order(TimestampsMixin):
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
    # Consumer can be null if the producer says that he sold the product outside
    # the app but still wants to keep track of his stock and transactions
    consumer = models.ForeignKey("users.user", on_delete=models.CASCADE, null=True)
    quantity = models.PositiveIntegerField()
    total_price = models.PositiveIntegerField()

    objects = OrderManager()

    class Meta:
        ordering = ["-created_at"]

    @property
    def is_reviewed(self):
        return hasattr(self, "review")
