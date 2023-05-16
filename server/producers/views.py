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
        if self.action == "create":
            return BecomeProducerSerializer
        elif self.action == "retrieve":
            return ProducerSerializer

        return super().get_serializer()

    # become producer method
    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     serializer.save(user=request.user)
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(
    #         {"message": "You are now a producer!"},
    #         status=status.HTTP_201_CREATED,
    #         headers=headers,
    #     )
