from listings.models import Listing
from producers.permissions import IsProducer
from rest_framework.permissions import IsAuthenticated


class ParticipatesInOrder(IsAuthenticated):
    message = "No tienes relación con este pedido"

    def has_object_permission(self, request, view, obj):
        is_authenticated = super().has_permission(request, view)
        participates_in_order = (
            request.user == obj.consumer
            or request.user.producer == obj.listing.producer
        )
        return bool(is_authenticated and participates_in_order)


class IsListingOwner(IsProducer):
    message = "No puedes vender un producto que no es tuyo"

    def has_permission(self, request, view):
        is_producer = super().has_permission(request, view)
        listing_id = request.data.get("listing")
        listing = Listing.objects.get(id=listing_id)
        return bool(is_producer and listing.producer == request.user.producer)
