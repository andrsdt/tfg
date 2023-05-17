from django.urls import include, path
from listings.views import ListingViewSet
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r"", ListingViewSet)

urlpatterns = [
    path("listings/", include(router.urls)),
]
