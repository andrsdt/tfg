from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import DestroyModelMixin
from rest_framework import status
from rest_framework.permissions import IsAuthenticated


class CsrfTokenViewSet(GenericViewSet):
    """
    A viewset for retrieving the CSRF token and setting it as a cookie.
    """

    permission_classes = [AllowAny]

    @action(detail=False, methods=["get"])
    @method_decorator(ensure_csrf_cookie)
    def get_csrf_token(self, request):
        """
        Retrieves the CSRF token and sets it as a cookie.
        """
        return Response()


class DeleteUserViewSet(GenericViewSet, DestroyModelMixin):
    """
    A viewset for deleting the user's account.
    """

    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
