from dj_rest_auth.registration.serializers import RegisterSerializer
from django.core.validators import MinLengthValidator
from grocerin.validators import OnlyAlphaValidator
from rest_framework import serializers


class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(
        required=True, validators=[MinLengthValidator(2), OnlyAlphaValidator]
    )
    last_name = serializers.CharField(
        required=True, validators=[MinLengthValidator(2), OnlyAlphaValidator]
    )

    def custom_signup(self, request, user):
        user.first_name = self.data.get("first_name")
        user.last_name = self.data.get("last_name")
        user.save(update_fields=["first_name", "last_name"])
        return user
