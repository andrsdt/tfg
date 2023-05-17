from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import LoginSerializer, UserDetailsSerializer
from django.core.validators import MinLengthValidator
from grocerin.validators import OnlyAlphaAndSpacesValidator
from rest_framework import serializers
from users.models import User


class CustomLoginSerializer(LoginSerializer):
    class Meta:
        fields = ["email", "password"]

    username = serializers.HiddenField(default=None)
    email = serializers.EmailField(required=True, allow_blank=False)
    password = serializers.CharField(required=True, write_only=True)


class CustomRegisterSerializer(RegisterSerializer):
    class Meta:
        fields = ["email", "password1", "password2", "first_name", "last_name"]

    username = serializers.HiddenField(default=None)
    first_name = serializers.CharField(
        required=True, validators=[MinLengthValidator(2), OnlyAlphaAndSpacesValidator]
    )
    last_name = serializers.CharField(
        required=True, validators=[MinLengthValidator(2), OnlyAlphaAndSpacesValidator]
    )

    def validate_username(self, username):
        return username

    def custom_signup(self, request, user):
        user.first_name = self.data.get("first_name")
        user.last_name = self.data.get("last_name")
        user.save(update_fields=["first_name", "last_name"])
        return user


class CustomUserDetailsSerializer(UserDetailsSerializer):
    class Meta:
        fields = [
            "pk",
            "email",
            "first_name",
            "last_name",
            "is_producer",
            "has_completed_onboarding",
            "photo",
            "phone",
            "location",
            "created_at",
        ]
        read_only_fields = ["pk", "email", "is_producer"]
        model = User
