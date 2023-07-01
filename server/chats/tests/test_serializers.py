from users.models import User
from producers.models import Producer
from listings.models import Listing
from chats.models import Conversation
from chats.serializers import ConversationCreateSerializer
from rest_framework.serializers import ValidationError
from chats.models import Message
from chats.serializers import ConversationPreviewSerializer, ConversationSerializer
from chats.validators import validate_is_listing_owner
from django.test import RequestFactory

import pytest

"""
Code Analysis

Objective:
- The objective of this code snippet is to provide serializers for the Conversation and Message models, as well as a serializer for creating a new Conversation. These serializers are used to convert the data to and from JSON format, and are used in the API views to handle requests related to Conversations and Messages.

Inputs:
- The code snippet imports models and serializers from the chats, listings, and users apps, as well as the create_conversation function from the chats.business_logic module.

Flow:
- The code defines three serializers: MessageSerializer, ConversationPreviewSerializer, and ConversationSerializer. The MessageSerializer is used to serialize Message objects, while the ConversationPreviewSerializer and ConversationSerializer are used to serialize Conversation objects in different contexts.
- The ConversationCreateSerializer is used to serialize data for creating a new Conversation, and includes validation to ensure that the consumer is not the same as the listing owner.
- The serializers use other serializers to include related objects, such as BasicUserSerializer and BasicListingSerializer.
- The serializers also define methods to include additional data, such as the number of unread messages in a Conversation.

Outputs:
- The main outputs of the code snippet are the serializers for the Conversation and Message models, which are used to convert data to and from JSON format in the API views.

Additional aspects:
- The code snippet includes a validator function, validate_is_listing_owner, which is used to ensure that the consumer is not the same as the listing owner when creating a new Conversation.
- The code snippet also includes a create_conversation function, which is imported from the chats.business_logic module and used in the ConversationCreateSerializer to create a new Conversation object.
"""


@pytest.mark.django_db
class TestCodeSnippet:
    # Tests that a conversation preview can be retrieved with valid data
    def test_get_conversation_preview_valid_data(self, bare_user, producer, listing):
        consumer = bare_user
        conversation = Conversation.objects.create(consumer=consumer, listing=listing)
        Message.objects.create(
            sender=producer.user, conversation=conversation, text="Test message"
        )
        request = RequestFactory().get("/api/v1/chats/")
        request.user = consumer
        serializer = ConversationPreviewSerializer(
            conversation, context={"request": request}
        )
        assert serializer.data["consumer"]["id"] == consumer.id
        assert serializer.data["producer"]["id"] == producer.user.id
        assert serializer.data["listing"]["id"] == listing.id

    # Tests that a conversation can be retrieved with valid data
    def test_get_conversation_valid_data(self, bare_user, producer, listing):
        consumer = bare_user
        conversation = Conversation.objects.create(consumer=consumer, listing=listing)
        Message.objects.create(
            sender=producer.user, conversation=conversation, text="Test message"
        )
        request = RequestFactory().get("/api/v1/chats/")
        request.user = consumer
        serializer = ConversationSerializer(conversation, context={"request": request})
        assert serializer.data["consumer"]["id"] == consumer.id
        assert serializer.data["producer"]["id"] == producer.user.id
        assert serializer.data["listing"]["id"] == listing.id
        assert serializer.data["messages"][0]["text"] == "Test message"

    # Tests that a consumer cannot start a conversation with themselves
    def test_validate_is_listing_owner(self, bare_user, listing):
        consumer = bare_user
        with pytest.raises(ValidationError):
            validate_is_listing_owner(consumer, listing)

    # Tests that the number of unread messages for a user in a conversation can be retrieved
    def test_get_unread_messages_count_by_user(self, bare_user, producer, listing):
        consumer = bare_user
        conversation = Conversation.objects.create(consumer=consumer, listing=listing)
        Message.objects.create(
            sender=producer.user,
            conversation=conversation,
            text="Test message",
            read_by_recipient=True,
        )
        Message.objects.create(
            sender=producer.user, conversation=conversation, text="Test message"
        )
        assert conversation.get_unread_messages_count_by_user(consumer) == 0

    # Tests that the other user in a conversation can be retrieved
    def test_get_other_user(self, bare_user, producer, listing):
        consumer = bare_user
        conversation = Conversation.objects.create(consumer=consumer, listing=listing)
        assert conversation.get_other_user(consumer) == producer.user
        assert conversation.get_other_user(producer.user) == consumer
