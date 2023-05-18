from django.conf import settings
from django.db import models
from grocerin.mixins import TimestampsMixin
from notifications.enums import NOTIFICATION_CHOICES
from notifications.managers import NotificationManager


class Notification(TimestampsMixin):
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    notification_type = models.CharField(max_length=64, choices=NOTIFICATION_CHOICES)
    # Flexible field containing the data for the specific notification
    data = models.JSONField()
    is_read = models.BooleanField(default=False)

    objects = NotificationManager()
