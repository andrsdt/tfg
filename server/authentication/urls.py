from dj_rest_auth.registration.views import RegisterView
from django.conf.urls import include
from django.urls import path

from .views import CsrfTokenViewSet

urlpatterns = [
    path("auth/", include("dj_rest_auth.urls")),
    path(
        "auth/set-csrf/",
        CsrfTokenViewSet.as_view({"get": "set_csrf_token"}),
        name="set-csrf",
    ),
    path("auth/account/", include("allauth.urls")),
    # Custom serializer for registration
    path(
        "auth/registration/",
        RegisterView.as_view(),
        name="account_signup",
    ),
]
