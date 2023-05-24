from chats.views import ChatViewSet
from django.urls import include, path
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r"", ChatViewSet)

urlpatterns = [
    path("chats/", include(router.urls)),
]
