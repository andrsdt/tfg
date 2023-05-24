from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet


class CsrfTokenViewSet(GenericViewSet):
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        return None

    @action(detail=False, methods=["get"])
    @method_decorator(ensure_csrf_cookie)
    def set_csrf_token(self, request):
        return Response()
