from django.urls import include, path
from listings.views import ListingViewSet
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r"", ListingViewSet)

urlpatterns = [
    path(
        "producers/<int:pk>/listings",
        ListingViewSet.as_view({"get": "list_recents_by_producer"}),
    ),
    path("listings/", include(router.urls)),
]
