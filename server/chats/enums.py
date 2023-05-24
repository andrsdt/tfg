# Like notifications, messages may have different types. This will
# determine how they are displayed to the user. It also allows us
# to insert pseudomessages in the conversation Programatically from
# the backend (e.g. "Don't forget to rate X product!")
MESSAGE_TYPE_CHOICES = (
    ("TEXT_MESSAGE", "TEXT_MESSAGE"),  # Common text message between users
    (
        "LOCATION_MESSAGE",
        "LOCATION_MESSAGE",
    ),  # Message containing a location attachment
    ("REVIEW_ORDER", "REVIEW_ORDER"),  # Message to remind user to review
    (
        "REPORT_CONFIRMATION",
        "REPORT_CONFIRMATION",
    )  # Message to indicate the user has been reported
    # Message indicating that the user is blocked
)
