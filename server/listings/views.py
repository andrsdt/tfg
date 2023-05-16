from drf_spectacular.utils import extend_schema
from listings.models import Listing
from listings.permissions import IsListingOwner
from listings.serializers import ListingCreateSerializer, ListingSerializer
from producers.permissions import IsProducer
from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.all()
    serializer = ListingSerializer

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

    @extend_schema(
        responses=ListingSerializer(many=True),
    )
    def list_recents_by_producer(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        queryset = Listing.objects.from_producer(pk).order_by("-updated_at")

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        # Indicate that the return is a list
        return Response(serializer.data)


# Inherited from ModelViewSet
# def update(self, serializer):
#     serializer = ProductCreateSerializer(data=self.request.data)
#     serializer.save(producer=self.request.user.producer)

# Inherited from ModelViewSet
# def perform_destroy(self, instance):
#     instance.delete()
