from django.urls import include, path
from orders.views import OrderViewSet
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r"", OrderViewSet)

urlpatterns = [
    path("orders/", include(router.urls)),
]
