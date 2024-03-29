from producers.permissions import IsProducer


class IsListingOwner(IsProducer):
    message = "No puedes modificar un producto que no es tuyo"

    def has_object_permission(self, request, view, obj):
        # Allow POST requests only for the producer who created the product
        is_producer = super().has_permission(request, view)
        return bool(is_producer and request.user.producer == obj.producer)
