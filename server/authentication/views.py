import json

from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet


class CsrfTokenViewSet(GenericViewSet):
    permission_classes = [AllowAny]

    @action(detail=True, methods=["get"])
    @ensure_csrf_cookie  # NOTE: if does not work, use @method_decorator(ensure...) or change the order
    def set_csrf_token(self, request):
        return Response({"message": "CSRF cookie set"})


class LoginViewSet(GenericViewSet):
    permission_classes = [AllowAny]

    @action(detail=True, methods=["post"])
    def login(self, request):
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")
        if username is None or password is None:
            return Response(
                {"error": {"__all__": "Please enter both username and password"}},
                status=status.HTTP_400_BAD_REQUEST,
            )
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({"message": "Successful login"})
        return Response(
            {"error": "Invalid credentials"},
            status=status.HTTP_401_UNAUTHORIZED,
        )
