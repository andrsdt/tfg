from rest_framework.permissions import IsAuthenticated


class IsProducer(IsAuthenticated):
    message = "The user is not a producer"

    def has_permission(self, request, view):
        is_authenticated = super().has_permission(request, view)
        return is_authenticated and bool(request.user.is_producer)
