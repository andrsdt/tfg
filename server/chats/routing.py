from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from chats.consumers import TextRoomConsumer
from django.urls import re_path
from grocerin.asgi import application

websocket_urlpatterns = [
    re_path(r"^ws/chat/(?P<room_name>[^/]+)/$", TextRoomConsumer.as_asgi()),
]

application = ProtocolTypeRouter(
    {
        "http": application,
        "websocket":
        # This middleware allows us to get the user from the scope in the consumer
        AuthMiddlewareStack(URLRouter(websocket_urlpatterns)),
    }
)
