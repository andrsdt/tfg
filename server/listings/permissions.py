from producers.permissions import IsProducer


class IsListingOwner(IsProducer):
    message = "You are not the owner of this listing"

    def has_object_permission(self, request, view, obj):
        # Allow POST requests only for the producer who created the product
        is_producer = super().has_permission(request, view)
        return bool(is_producer and request.user.producer == obj.producer)
