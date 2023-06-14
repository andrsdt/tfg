from django.db import models


# https://stackoverflow.com/questions/3429878/automatic-creation-date-for-django-model-form-objects
class TimestampsMixin(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class SoftDeleteMixin(models.Model):
    class Meta:
        abstract = True

    # TODO: editable=False? Can a user revive a deleted object?
    is_deleted = models.BooleanField(default=False)

    def delete(self):
        self.is_deleted = True
        self.save()
