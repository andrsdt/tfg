from django.urls import include, path
from listings.views import ListingViewSet
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r"", ListingViewSet)

urlpatterns = [
    path("listings/", include(router.urls)),
    path("listings/<int:pk>/like/", ListingViewSet.as_view({"post": "like"})),
    path("listings/<int:pk>/dislike/", ListingViewSet.as_view({"post": "dislike"})),
    path("listings/<int:pk>/activate/", ListingViewSet.as_view({"post": "activate"})),
    path(
        "listings/<int:pk>/deactivate/", ListingViewSet.as_view({"post": "deactivate"})
    ),
]
