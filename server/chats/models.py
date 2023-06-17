from chats.enums import MESSAGE_TYPE_CHOICES
from chats.managers import ConversationManager, MessageManager
from django.conf import settings
from django.db import models
from grocerin.mixins import TimestampsMixin
from users.models import User


class Conversation(TimestampsMixin):
    consumer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    listing = models.ForeignKey(
        "listings.Listing",
        on_delete=models.CASCADE,
    )

    objects = ConversationManager()

    class Meta:
        ordering = ("-updated_at",)

    @property
    def producer(self):
        return self.listing.producer.user

    @property
    def last_message(self):
        return Message.objects.from_conversation(self.id).last()

    def get_unread_messages_count_by_user(self, user: User):
        # Get the number of messages a user has to read
        return Message.objects.unread_by_user_from_conversation(self.id, user).count()

    def get_other_user(self, user: User):
        # Get the other user in the conversation
        if user == self.consumer:
            return self.producer
        return self.consumer

    def __str__(self):
        return f"iniciator: {self.consumer} , receiver: {self.producer}"


class Message(TimestampsMixin):
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name="message_sender",
    )
    conversation = models.ForeignKey(
        Conversation, on_delete=models.CASCADE, related_name="messages"
    )
    text = models.CharField(max_length=2000)
    message_type = models.CharField(max_length=64, choices=MESSAGE_TYPE_CHOICES)
    read_by_recipient = models.BooleanField(default=False)

    # Flexible field containing the data for the specific notification
    # E.g. if the message is a location message, this field will contain
    # the location data
    data = models.JSONField(null=True)

    objects = MessageManager()

    class Meta:
        ordering = ("created_at",)

    def mark_as_read(self):
        self.read_by_recipient = True
        self.save()

    def __str__(self):
        return f"Conversation {self.conversation.pk}: {self.sender} -> {self.text}"
