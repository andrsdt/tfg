from listings.models import Listing
from producers.permissions import IsProducer
from rest_framework.permissions import IsAuthenticated


class ParticipatesInOrder(IsAuthenticated):
    message = "No tienes relación con este pedido"

    # NOTE: here, we DO use has_object_permission because we want to
    # check permissions against an order that already exists in the DB
    def has_object_permission(self, request, view, obj):
        is_authenticated = super().has_permission(request, view)
        participates_in_order = (
            request.user == obj.consumer
            or request.user.producer == obj.listing.producer
        )
        return bool(is_authenticated and participates_in_order)


class IsListingOwner(IsProducer):
    message = "No puedes vender un producto que no es tuyo"

    # NOTE: we have to use has_permission instead of has_object_permission
    # because the order is not created yet when the request is made. This
    # is because we are carrying out this validation check in order to
    # decide whether to allow the creation of the order or not.
    def has_permission(self, request, view):
        is_producer = super().has_permission(request, view)
        listing_id = request.data.get("listing")
        listing = Listing.objects.get(id=listing_id)
        return bool(is_producer and listing.producer == request.user.producer)
