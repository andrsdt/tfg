from authentication.serializers import CustomRegisterSerializer
from dj_rest_auth.registration.views import RegisterView
from django.conf.urls import include
from django.urls import path

from .views import CsrfTokenViewSet, LoginViewSet

urlpatterns = [
    path("", include("dj_rest_auth.urls")),
    path(
        "set-csrf/",
        CsrfTokenViewSet.as_view({"get": "set_csrf_token"}),
        name="set-csrf",
    ),
    path("login/", LoginViewSet.as_view({"post": "login"}), name="login"),
    path("account/", include("allauth.urls")),
    # Custom serializer for registration
    path(
        "registration/",
        RegisterView.as_view(serializer_class=CustomRegisterSerializer),
        name="custom_register",
    ),
]
