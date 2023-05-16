from django.urls import include, path
from producers.views import ProducerViewSet
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r"", ProducerViewSet)

urlpatterns = [
    path("producers/", include(router.urls)),
]
