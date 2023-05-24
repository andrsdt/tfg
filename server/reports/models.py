from django.db import models
from grocerin.mixins import TimestampsMixin
from reports.managers import ReportManager


class Report(TimestampsMixin):
    reporter = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, related_name="reports"
    )
    reported = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, related_name="reported"
    )
    order = models.OneToOneField("orders.Order", on_delete=models.CASCADE, null=True)
    comment = models.TextField(max_length=2000)

    objects = ReportManager()
