from django.db import models


class ListingManager(models.Manager):
    def from_producer(self, producer_id):
        return self.filter(producer=producer_id)
