from django.db import transaction
from listings.models import Listing
from notifications.business_logic import send_review_order_notification
from orders.models import Order
from users.models import User


@transaction.atomic
def create_order(
    listing: Listing, quantity: int, total_price: int, consumer: User = None
):
    # Create the order entity
    order = Order.objects.create(
        listing=listing, consumer=consumer, quantity=quantity, total_price=total_price
    )

    # Substract the available stock (quantity) from the listing
    listing.substract_stock(quantity)

    # Send a notification to the buyer to rate the order, only if the buyer is a
    # user of the app (the producer can mark a listing as sold outside the app)
    if consumer:
        send_review_order_notification(consumer, order)

    return order
