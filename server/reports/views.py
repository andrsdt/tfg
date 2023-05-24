from reports.models import Report
from reports.serializers import ReportCreateSerializer, ReportSerializer
from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet


class ReportViewSet(
    mixins.CreateModelMixin,
    GenericViewSet,
):
    queryset = Report.objects.all()

    # https://www.django-rest-framework.org/api-guide/viewsets/#introspecting-viewset-actions
    def get_permissions(self):
        permissions = {
            "create": [IsAuthenticated],
        }

        default_permission = [IsAuthenticated]

        return [p() for p in permissions.get(self.action, default_permission)]

    def get_serializer_class(self):
        serializers = {
            "create": ReportCreateSerializer,
        }

        default_serializer = ReportSerializer

        return serializers.get(self.action, default_serializer)
