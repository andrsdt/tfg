from authentication.views import login_view
from django.conf.urls import include
from django.urls import path

urlpatterns = [
    path("", include("dj_rest_auth.urls")),
    path("login/", login_view, name="login"),
    path("account/", include("allauth.urls")),
    path("registration/", include("dj_rest_auth.registration.urls")),
]
