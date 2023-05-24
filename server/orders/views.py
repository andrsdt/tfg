from orders.filters import OrderFilterSet
from orders.models import Order
from orders.permissions import IsListingOwner, ParticipatesInOrder
from orders.serializers import OrderCreateSerializer, OrderSerializer
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet


class OrderViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    GenericViewSet,
):
    # TODO: make the queryset be my_orders()?
    queryset = Order.objects.all()
    filterset_class = OrderFilterSet

    # https://www.django-rest-framework.org/api-guide/viewsets/#introspecting-viewset-actions
    def get_permissions(self):
        permissions = {
            # TODO: Does "IsListingOwner" work sense here? "obj" is an Order, not a Listing
            "create": [IsListingOwner],
            "list": [ParticipatesInOrder],
            "retrieve": [ParticipatesInOrder],
        }

        default_permission = [ParticipatesInOrder]

        return [p() for p in permissions.get(self.action, default_permission)]

    def get_serializer_class(self):
        serializers = {
            "create": OrderCreateSerializer,
            "list": OrderSerializer,
            "retrieve": OrderSerializer,
        }

        default_serializer = OrderSerializer

        return serializers.get(self.action, default_serializer)
