from rest_framework import mixins
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import GenericViewSet
from users.models import User
from users.serializers import BasicUserSerializer


class UserViewSet(
    mixins.RetrieveModelMixin,
    GenericViewSet,
):
    queryset = User.objects.all()

    # https://www.django-rest-framework.org/api-guide/viewsets/#introspecting-viewset-actions
    def get_permissions(self):
        permissions = {
            "retrieve": [AllowAny],
        }

        default_permission = [AllowAny]

        return [p() for p in permissions.get(self.action, default_permission)]

    def get_serializer_class(self):
        serializers = {
            "retrieve": BasicUserSerializer,
        }

        default_serializer = BasicUserSerializer

        return serializers.get(self.action, default_serializer)
