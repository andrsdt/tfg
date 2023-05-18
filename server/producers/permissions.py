from rest_framework.permissions import IsAuthenticated


class IsProducer(IsAuthenticated):
    message = "No puedes realizar esta acción porque no eres un productor"

    def has_permission(self, request, view):
        is_authenticated = super().has_permission(request, view)
        return is_authenticated and bool(request.user.is_producer)
