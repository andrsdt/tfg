from django.db import models


class NotificationManager(models.Manager):
    def create(self, *args, **kwargs):
        """
        Override the default create method to validate the data
        """
        from notifications.validators import validate_notification_data

        validate_notification_data(kwargs["notification_type"], kwargs["data"])
        return super().create(*args, **kwargs)

    def to_user(self, user_id):
        return self.filter(receiver=user_id).order_by("-updated_at")
