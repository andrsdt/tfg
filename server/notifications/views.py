from grocerin.serializers import CountSerializer
from notifications.business_logic import mark_all_notifications_as_read
from notifications.models import Notification
from notifications.serializers import NotificationSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, mixins


class NotificationViewSet(mixins.ListModelMixin, GenericViewSet):
    queryset = Notification.objects.all()

    # https://www.django-rest-framework.org/api-guide/viewsets/#introspecting-viewset-actions
    def get_permissions(self):
        permissions = {
            "list": [IsAuthenticated],
            "count_unread": [IsAuthenticated],
            "mark_all_as_read": [IsAuthenticated],
        }
        default_permission = [IsAuthenticated]
        return [p() for p in permissions.get(self.action, default_permission)]

    def get_serializer_class(self):
        serializers = {
            "list": NotificationSerializer,
            "count_unread": CountSerializer,
        }
        default_serializer = NotificationSerializer
        return serializers.get(self.action, default_serializer)

    def get_queryset(self):
        default_queryset = Notification.objects.to_user(self.request.user.id)
        querysets = {
            "list": default_queryset,
            "count_unread": default_queryset.filter(is_read=False),
        }
        return querysets.get(self.action, default_queryset)

    def list(self, request):
        super_response = super().list(request)
        # When the user retrieves their notifications, mark them as read
        # TODO: in the future, mark them as read when the user clicks on
        # them. This would require a new endpoint to mark a single notification
        # as read.
        mark_all_notifications_as_read(request.user)
        return super_response

    def count_unread(self, _):
        return Response({"count": self.get_queryset().count()})
