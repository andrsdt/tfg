from grocerin.managers import SoftDeleteManager


class ProducerManager(SoftDeleteManager):
    def delete(self):
        producer = self.get_queryset().get(pk=self.pk)

        producer.is_deleted = True
        producer.biography = None

        for listing in producer.listings.all():
            listing.delete()
