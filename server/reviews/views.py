from rest_framework import mixins
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import GenericViewSet
from reviews.filters import ReviewFilterSet
from reviews.models import Review
from reviews.serializers import ReviewCreateSerializer, ReviewSerializer


class ReviewViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    GenericViewSet,
):
    queryset = Review.objects.all()
    filterset_class = ReviewFilterSet

    # https://www.django-rest-framework.org/api-guide/viewsets/#introspecting-viewset-actions
    def get_permissions(self):
        permissions = {
            # "create": [IsListingOwner],
            # "list": [ParticipatesInOrder],
        }

        default_permission = [AllowAny]

        return [p() for p in permissions.get(self.action, default_permission)]

    def get_serializer_class(self):
        serializers = {
            "create": ReviewCreateSerializer,
        }

        default_serializer = ReviewSerializer

        return serializers.get(self.action, default_serializer)
