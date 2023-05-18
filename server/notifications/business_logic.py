from notifications.models import Notification
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


def send_chat_message_notification(sender: User, receiver: User):
    """
    Send a notification to the receiver that they have received a new message from the sender
    """
    data = {
        "sender": sender.id,
    }
    _send_notification(receiver, "CHAT_MESSAGE", data)


def send_new_listing_notification(receiver, listing):
    """
    Send a notification to the receiver that there is a new listing that matches their search criteria
    """
    data = {"listing": listing.id}
    _send_notification(receiver, "NEW_LISTING", data)


def send_new_review_notification(receiver, review):
    """
    Send a notification to the receiver that they have received a new review
    """
    data = {"review": review.id}
    _send_notification(receiver, "NEW_REVIEW", data)


def send_new_like_notification(listing):
    """
    Send a notification to the owner of a listing that has received a new like
    """
    data = {"listing": listing.id}
    # TODO: only send notification If it's the first like for that listing
    _send_notification(listing.producer.user, "NEW_LIKE", data)


def send_reminder_review_notification(receiver, listing):
    """
    Send a notification to the receiver to remind them that they have not reviewed a listing that they have purchased
    """
    data = {"listing": listing.id}
    _send_notification(receiver, "REMINDER_REVIEW", data)


def send_reminder_complete_profile_notification(receiver):
    """
    Send a notification to the receiver to remind them to complete their profile
    """
    data = {}
    _send_notification(receiver, "REMINDER_COMPLETE_PROFILE", data)


def send_report_confirmation_notification(receiver, report):
    """
    Send a notification to the receiver to confirm that their report has been received
    """
    data = {"report": report.id}
    _send_notification(receiver, "REPORT_CONFIRMATION", data)
