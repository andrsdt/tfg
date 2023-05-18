from django.urls import include, path
from notifications.views import NotificationViewSet
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r"", NotificationViewSet)

urlpatterns = [
    path("notifications/", include(router.urls)),
    path("notifications/count/", NotificationViewSet.as_view({"get": "count_unread"})),
]
