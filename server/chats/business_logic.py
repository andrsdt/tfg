from chats.models import Conversation, Message
from listings.models import Listing
from users.models import User


def create_conversation(consumer: User, listing: Listing):
    """Creates a conversation in the database. If the conversation for that consumer and that listing already exists, returns the existing one because a consumer can only have one open chat regarding a listing."""
    [conversation, _] = Conversation.objects.get_or_create(
        consumer=consumer, listing=listing
    )
    return conversation


def persist_text_message(conversation: Conversation, sender: User, message: str):
    """Store an incoming chat message in the database. This method is invocked when a message arrives to the server via websockets in order to persist it."""
    # We don't have to .add() the message to the conversation because
    # we are using a ForeignKey in the Message model, which means that
    # the message already knows which conversation it belongs to.
    message = Message.objects.create(
        sender=sender,
        text=message,
        message_type="TEXT_MESSAGE",
        conversation=conversation,
    )
    # We manually save the conversation too because we want to update the updated_at field (for ordering purposes)
    conversation.save()
    return message


def mark_message_as_read(message_id: int):
    """Marks a message as read in the database. This method is invocked when a read confirmation arrives to the server via websockets in order to mark it as read."""
    Message.objects.get(id=message_id).mark_as_read()
