from django.urls import include, path
from rest_framework import routers
from users.views import UserViewSet

router = routers.SimpleRouter()
router.register(r"", UserViewSet)

urlpatterns = [
    path("users/", include(router.urls)),
]
