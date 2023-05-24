from jsonschema import validate
from rest_framework.serializers import ValidationError

DATA_STRUCTURE = {
    "CHAT_MESSAGE": {
        "sender": "int",
    },
    "NEW_LISTING": {"listing": "int"},
    "NEW_REVIEW": {"review": "int"},
    "NEW_LIKE": {"listing": "int"},
    "REVIEW_ORDER": {"order": "int"},
    "REMINDER_COMPLETE_PROFILE": {},
    "REPORT_CONFIRMATION": {"report": "int"},
}


def validate_notification_data(notification_type, data):
    """
    Validate that the data for the notification is valid for the notification_type
    """
    # Validate the data against the schema
    try:
        schema = DATA_STRUCTURE[notification_type]
        validate(data, schema)
    except Exception as e:
        raise ValidationError(
            f"Data for notification_type {notification_type} is invalid: {e}"
        )
