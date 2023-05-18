from producers.models import Producer
from producers.permissions import IsProducer
from producers.serializers import BecomeProducerSerializer, ProducerSerializer
from rest_condition import Not
from rest_framework import mixins
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.viewsets import GenericViewSet


class ProducerViewSet(
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    GenericViewSet,
):
    queryset = Producer.objects.all()

    # https://www.django-rest-framework.org/api-guide/viewsets/#introspecting-viewset-actions
    def get_permissions(self):
        permissions = {
            "create": [IsAuthenticated, Not(IsProducer)],
        }

        default_permission = [AllowAny]

        return [p() for p in permissions.get(self.action, default_permission)]

    def get_serializer_class(self):
        serializers = {
            "create": BecomeProducerSerializer,
            "retrieve": ProducerSerializer,
        }

        default_serializer = ProducerSerializer

        return serializers.get(self.action, default_serializer)
