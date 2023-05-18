from listings.business_logic import dislike_listing, like_listing
from listings.filters import ListingFilterSet
from listings.models import Listing
from listings.permissions import IsListingOwner
from listings.serializers import ListingCreateSerializer, ListingSerializer
from producers.permissions import IsProducer
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.all()
    filterset_class = ListingFilterSet

    # https://www.django-rest-framework.org/api-guide/viewsets/#introspecting-viewset-actions
    def get_permissions(self):
        permissions = {
            "list": [AllowAny],
            "retrieve": [AllowAny],
            "create": [IsProducer],
            "update": [IsListingOwner],
            "partial_update": [IsListingOwner],
            "destroy": [IsListingOwner],
        }

        default_permission = [AllowAny]

        return [p() for p in permissions.get(self.action, default_permission)]

    def get_serializer_class(self):
        serializers = {
            "create": ListingCreateSerializer,
            "update": ListingCreateSerializer,
            "partial_update": ListingCreateSerializer,
        }

        default_serializer = ListingSerializer

        return serializers.get(self.action, default_serializer)

    # Inherited from ModelViewSet

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    @action(detail=True, methods=["post"])
    def like(self, request, pk=None):
        listing = self.get_object()
        like_listing(listing, request.user)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=["post"])
    def dislike(self, request, pk=None):
        listing = self.get_object()
        dislike_listing(listing, request.user)
        return Response(status=status.HTTP_204_NO_CONTENT)
