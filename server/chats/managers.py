from django.db import models
from users.models import User


class ConversationManager(models.Manager):
    def user_is_participant(self, user: User):
        return self.filter(
            models.Q(consumer=user) | models.Q(listing__producer__user=user)
        )


class MessageManager(models.Manager):
    def from_conversation(self, conversation_id):
        return self.filter(conversation=conversation_id)

    def unread_by_user(self, user: User):
        return self.filter(sender=user, read_by_recipient=False)

    # Given a conversation, return all the messages a user still has to read
    def unread_by_user_from_conversation(self, conversation_id, user: User):
        return self.filter(
            read_by_recipient=False, conversation=conversation_id
        ).exclude(sender=user)
