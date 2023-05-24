from django.urls import include, path
from reports.views import ReportViewSet
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r"", ReportViewSet)

urlpatterns = [
    path("reports/", include(router.urls)),
]
