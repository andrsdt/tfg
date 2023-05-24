from django.urls import include, path
from rest_framework import routers
from reviews.views import ReviewViewSet

router = routers.SimpleRouter()
router.register(r"", ReviewViewSet)

urlpatterns = [
    path("reviews/", include(router.urls)),
]
