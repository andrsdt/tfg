from chats.business_logic import create_conversation
from chats.models import Conversation, Message
from chats.validators import validate_is_listing_owner
from listings.models import Listing
from listings.serializers import BasicListingSerializer
from rest_framework import serializers
from users.serializers import BasicUserSerializer


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        exclude = ("conversation",)


class ConversationPreviewSerializer(serializers.ModelSerializer):
    consumer = BasicUserSerializer()
    producer = BasicUserSerializer()
    listing = BasicListingSerializer()
    last_message = MessageSerializer()
    unread_messages_count = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = "__all__"

    def get_unread_messages_count(self, obj: Conversation) -> int:
        request_user = self.context["request"].user
        return obj.get_unread_messages_count_by_user(request_user)


class ConversationSerializer(serializers.ModelSerializer):
    consumer = BasicUserSerializer()
    producer = BasicUserSerializer()
    listing = BasicListingSerializer()
    messages = MessageSerializer(many=True)

    class Meta:
        model = Conversation
        fields = "__all__"


class ConversationCreateSerializer(serializers.ModelSerializer):
    consumer = serializers.HiddenField(default=serializers.CurrentUserDefault())
    listing = serializers.PrimaryKeyRelatedField(
        queryset=Listing.objects.active(),
        # TODO: is this really required=false?
        # required=False,
    )

    class Meta:
        model = Conversation
        fields = "__all__"

    def validate(self, attrs):
        consumer = attrs.get("consumer")
        listing = attrs.get("listing")
        validate_is_listing_owner(consumer, listing)

        return attrs

    def create(self, validated_data):
        return create_conversation(**validated_data)
