from drf_spectacular.utils import extend_schema
from listings.business_logic import delete_listing, dislike_listing, like_listing
from listings.filters import ListingFilterSet
from listings.models import Listing
from listings.permissions import IsListingOwner
from listings.serializers import ListingCreateSerializer, ListingSerializer
from producers.permissions import IsProducer
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response


class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.active()
    filterset_class = ListingFilterSet

    # https://www.django-rest-framework.org/api-guide/viewsets/#introspecting-viewset-actions
    def get_permissions(self):
        default_permission = [IsListingOwner]
        permissions = {
            "list": [AllowAny],
            "retrieve": [AllowAny],
            "create": [IsProducer],
            "update": [IsListingOwner],
            "destroy": [IsListingOwner],
            "like": [IsAuthenticated],
            "dislike": [IsAuthenticated],
            "activate": [IsListingOwner],
            "deactivate": [IsListingOwner],
        }
        return [p() for p in permissions.get(self.action, default_permission)]

    def get_serializer_class(self):
        default_serializer = ListingSerializer
        serializers = {
            "create": ListingCreateSerializer,
            "update": ListingCreateSerializer,
        }
        return serializers.get(self.action, default_serializer)

    def get_queryset(self):
        active_listings = Listing.objects.active()
        my_listings = Listing.objects.from_producer(self.request.user.id)
        default_queryset = active_listings

        querysets = {
            # A user can list/retrieve a listing if it's active
            # or also if it's inactive but only if he is the owner
            "list": active_listings | my_listings,
            "retrieve": active_listings | my_listings,
            "update": my_listings,
            "activate": my_listings,
            "deactivate": my_listings,
            "like": active_listings | my_listings,
            "dislike": active_listings | my_listings,
        }
        return querysets.get(self.action, default_queryset)

    @extend_schema(request=None, responses={204: None})
    @action(detail=True, methods=["post"])
    def like(self, request, pk=None):
        listing = self.get_object()
        like_listing(listing, request.user)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @extend_schema(request=None, responses={204: None})
    @action(detail=True, methods=["post"])
    def dislike(self, request, pk=None):
        listing = self.get_object()
        dislike_listing(listing, request.user)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @extend_schema(request=None, responses={204: None})
    @action(detail=True, methods=["post"])
    def activate(self, _, pk=None):
        listing = self.get_object()
        listing.set_active()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @extend_schema(request=None, responses={204: None})
    @action(detail=True, methods=["post"])
    def deactivate(self, _, pk=None):
        listing = self.get_object()
        listing.set_inactive()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # NOTE: destroy does not call any serializers,
    # therefore it's defined in the views.py instead
    def perform_destroy(self, instance):
        delete_listing(instance)
