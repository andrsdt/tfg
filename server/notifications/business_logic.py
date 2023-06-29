from chats.models import Conversation
from listings.models import Listing
from notifications.models import Notification
from orders.models import Order
from reviews.models import Review
from users.models import User


def mark_all_notifications_as_read(user):
    """
    Mark all notifications as read for the user
    """
    Notification.objects.to_user(user.id).update(is_read=True)


def _send_notification(receiver: User, notification_type, data: dict):
    """
    Send a notification to the receiver
    """
    Notification.objects.create(
        receiver=receiver, notification_type=notification_type, data=data
    )

    # In a future: send a notifications/emails/sms to the receiver
    # if they have it enabled in their notification preferences


def send_chat_message_notification(
    sender: User, receiver: User, conversation: Conversation
):
    """
    Send a notification to the receiver that they have received a new message from the sender.
    """
    data = {
        "sender": sender.id,
        "conversation": conversation.id,
    }

    # Delete any existing notifications of the same type and data
    # This is to prevent the receiver from receiving multiple notifications from the same sender
    Notification.objects.filter(
        receiver=receiver, notification_type="CHAT_MESSAGE", data=data
    ).delete()

    _send_notification(receiver, "CHAT_MESSAGE", data)


def send_new_listing_notification(receiver: User, listing: Listing):
    """
    Send a notification to the receiver that there is a new listing that matches their search criteria
    """
    data = {"listing": listing.id}
    _send_notification(receiver, "NEW_LISTING", data)


def send_new_review_notification(receiver: User, review: Review):
    """
    Send a notification to the receiver that they have received a new review
    """
    data = {"review": review.id}
    _send_notification(receiver, "NEW_REVIEW", data)


def send_new_like_notification(listing: Listing):
    """
    Send a notification to the owner of a listing that has received a new like
    """
    data = {"listing": listing.id}

    # Only send notification If it's the first one someone has liked that listing
    count_like_notifs_for_listing = Notification.objects.filter(
        notification_type="NEW_LIKE", data=data
    ).count()

    if count_like_notifs_for_listing == 0:
        _send_notification(listing.producer.user, "NEW_LIKE", data)


def send_review_order_notification(receiver: User, order: Order):
    """
    Send a notification to the receiver to let them know them that they can rate an order for a purchase they have made
    """
    data = {"order": order.id}
    _send_notification(receiver, "REVIEW_ORDER", data)


def send_reminder_complete_profile_notification(receiver: User):
    """
    Send a notification to the receiver to remind them to complete their profile
    """
    data = {}
    _send_notification(receiver, "REMINDER_COMPLETE_PROFILE", data)


def delete_reminder_complete_profile_notification(receiver: User):
    """
    Delete the notification to the receiver to remind them to complete their profile once they have completed it
    """
    Notification.objects.filter(
        receiver=receiver, notification_type="REMINDER_COMPLETE_PROFILE"
    ).delete()


def send_report_confirmation_notification(receiver: User, report):
    """
    Send a notification to the receiver to confirm that their report has been received
    """
    data = {"report": report.id}
    _send_notification(receiver, "REPORT_CONFIRMATION", data)
