from django.db import models


class ListingManager(models.Manager):
    def active(self):
        return self.filter(is_active=True)

    def from_producer(self, producer_id):
        return self.filter(producer=producer_id)
