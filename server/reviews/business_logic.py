from notifications.business_logic import send_new_review_notification
from notifications.models import Notification
from orders.models import Order
from reviews.models import Review


def create_review(order: Order, rating: int, comment: str = None):
    review = Review.objects.create(order=order, rating=rating, comment=comment)

    # Notify the producer that they have received a new review
    producer = order.listing.producer
    send_new_review_notification(producer.user, review)

    # Delete the notification for the consumer that they have to review the producer
    Notification.objects.to_user(order.consumer).filter(
        notification_type="REVIEW_ORDER", data__order=order.id
    ).delete()

    return review
