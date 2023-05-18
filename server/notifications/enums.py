NOTIFICATION_CHOICES = (
    ("CHAT_MESSAGE", "CHAT_MESSAGE"),  # You have received a new message from X
    (
        "NEW_LISTING",
        "NEW_LISTING",
    ),  # There is a new listing that matches your search criteria
    ("NEW_REVIEW", "NEW_REVIEW"),  # You have received a new review from X
    ("NEW_LIKE", "NEW_LIKE"),  # Someone has liked your listing
    ("REMINDER_REVIEW", "REMINDER_REVIEW"),  # You have not reviewed X yet
    (
        "REMINDER_COMPLETE_PROFILE",
        "REMINDER_COMPLETE_PROFILE",
    ),  # Your haven't completed your profile
    ("REPORT_CONFIRMATION", "REPORT_CONFIRMATION"),
)  # Your report to X has been received
