import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from chats.business_logic import mark_message_as_read, persist_text_message
from chats.models import Conversation
from chats.serializers import MessageSerializer
from notifications.business_logic import send_chat_message_notification


class TextRoomConsumer(WebsocketConsumer):
    def _send_to_websocket(self, payload: dict):
        payload["type"] = "websocket_message"
        async_to_sync(self.channel_layer.group_send)(self.room_group_name, payload)

    def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )

        user = self.scope["user"]
        try:
            conversation = Conversation.objects.get(id=int(self.room_name))
        except Conversation.DoesNotExist:
            self.close()

        user_belongs_to_conversation = (
            user == conversation.consumer or user == conversation.producer
        )

        if user.is_authenticated and user_belongs_to_conversation:
            self.accept()
        else:
            self.close()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    # Called when the socket receives a message
    # (This is, when a user sends a message)
    def receive(self, text_data=None, bytes_data=None):
        # Receive message from WebSocket
        text_data_json = json.loads(text_data)

        # Channels uses the 'type' key to identify
        # which handler method to invoke
        message_type = text_data_json.get("message_type")

        # Depending on message_type, we will
        # execute a different method
        callbacks = {
            "TEXT_MESSAGE": self._text_message,
            "READ_CONFIRMATION": self._read_confirmation,
        }
        callbacks[message_type](text_data_json)

    def _text_message(self, payload: dict):
        sender = self.scope["user"]
        text = payload.get("text")

        # CREATE THE MESSAGE IN THE DATABASE FOR PERSISTENCE
        conversation = Conversation.objects.get(id=int(self.room_name))
        message = persist_text_message(conversation, sender, text)

        # SEND A NOTIFICATION TO THE USER THAT THEY HAVE A MESSAGE
        receiver = conversation.get_other_user(sender)
        send_chat_message_notification(sender, receiver, conversation)

        # Serialize and send that message to room group
        serialized_message = MessageSerializer(message).data
        self._send_to_websocket(serialized_message)

    def _read_confirmation(self, payload: dict):
        # Mark the message as read and notify the users in the chat
        message_id = payload.get("message_id")
        mark_message_as_read(message_id)
        self._send_to_websocket(payload)

    def websocket_message(self, event):
        payload = event.copy()
        payload.pop("type")

        # Send message to WebSocket
        self.send(text_data=json.dumps(payload))
