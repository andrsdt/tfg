from chats.models import Conversation
from rest_framework.permissions import IsAuthenticated


class IsConversationParticipant(IsAuthenticated):
    message = "No eres participante de esta conversación"

    def has_object_permission(self, request, view, obj: Conversation):
        # Allow requests only for the participants of the conversation
        is_authenticated = super().has_permission(request, view)
        user = request.user
        user_is_participant = user == obj.consumer or user == obj.producer
        return bool(is_authenticated and user_is_participant)
