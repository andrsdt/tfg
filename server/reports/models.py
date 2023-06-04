from django.db import models
from grocerin.mixins import TimestampsMixin
from reports.managers import ReportManager


class Report(TimestampsMixin):
    reporter = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, related_name="reports"
    )
    reported = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, related_name="reported", null=True
    )
    order = models.OneToOneField("orders.Order", on_delete=models.CASCADE, null=True)
    description = models.TextField(max_length=2000)
    is_resolved = models.BooleanField(default=False)

    objects = ReportManager()

    @property
    def target(self) -> str:
        return "ORDER" if hasattr(self, "order") else "PRODUCER"
