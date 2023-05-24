from chats.filters import ChatFilterSet
from chats.models import Conversation
from chats.permissions import IsConversationParticipant
from chats.serializers import (
    ConversationCreateSerializer,
    ConversationPreviewSerializer,
    ConversationSerializer,
)
from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticated


class ChatViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Conversation.objects.all()
    filterset_class = ChatFilterSet

    def get_permissions(self):
        default_permission = [IsConversationParticipant]
        permissions = {
            "list": [IsAuthenticated],
            "retrieve": [IsConversationParticipant],
            "create": [IsAuthenticated],
        }

        return [p() for p in permissions.get(self.action, default_permission)]

    def get_serializer_class(self):
        default_serializer = ConversationSerializer
        serializers = {
            "list": ConversationPreviewSerializer,
            "retrieve": ConversationSerializer,
            "create": ConversationCreateSerializer,
        }

        return serializers.get(self.action, default_serializer)

    def get_queryset(self):
        default_queryset = Conversation.objects.user_is_participant(self.request.user)
        querysets = {
            "list": default_queryset,
            "retrieve": default_queryset,
            "create": Conversation.objects.all(),
        }

        return querysets.get(self.action, default_queryset)
