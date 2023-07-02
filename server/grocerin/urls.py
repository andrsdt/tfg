"""grocerin URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls import include
from django.views.static import serve
from django.contrib import admin
from django.urls import path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

debug_urlpatterns = (
    [
        path("api/v1/schema/", SpectacularAPIView.as_view(), name="schema"),
        path(
            "api/v1/docs",
            SpectacularSwaggerView.as_view(url_name="schema"),
            name="docs",
        ),
    ]
    if settings.DEBUG
    else []
)

urlpatterns = debug_urlpatterns + [
    path("admin/", admin.site.urls),
    # Endpoints
    path("api/v1/", include("authentication.urls")),
    path("api/v1/", include("users.urls")),
    path("api/v1/", include("producers.urls")),
    path("api/v1/", include("listings.urls")),
    path("api/v1/", include("orders.urls")),
    path("api/v1/", include("reviews.urls")),
    path("api/v1/", include("chats.urls")),
    path("api/v1/", include("notifications.urls")),
    path("api/v1/", include("reports.urls")),
]

if not settings.DEBUG:
    urlpatterns += [
        # Serve static files
        path("static/<path:path>", serve, {"document_root": settings.STATIC_ROOT}),
        # Serve media files
        path("media/<path:path>", serve, {"document_root": settings.MEDIA_ROOT}),
    ]
