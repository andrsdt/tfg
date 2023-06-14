from django.db import models


class SoftDeleteQuerySet(models.QuerySet):
    def delete(self):
        self.update(is_deleted=True)


class SoftDeleteManager(models.Manager):
    def get_queryset(self):
        return SoftDeleteQuerySet(self.model, using=self._db).exclude(is_deleted=True)
