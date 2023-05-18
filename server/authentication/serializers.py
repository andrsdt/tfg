from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import LoginSerializer, UserDetailsSerializer
from django.core.validators import MinLengthValidator
from drf_extra_fields.fields import Base64ImageField
from grocerin.validators import OnlyAlphaAndSpacesValidator
from notifications.business_logic import send_reminder_complete_profile_notification
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
        # NOTE: ideally this logic would be in business_logic.py
        # but due to the way dj_rest_auth works, it's tightly coupled
        # to the serializer (it already provides a "user" object),
        # which doesn't allow us to create it from scratch in
        # business_logic.py, but only add new fields to it.
        user.first_name = self.data.get("first_name")
        user.last_name = self.data.get("last_name")
        user.save(update_fields=["first_name", "last_name"])
        send_reminder_complete_profile_notification(user)
        return user


# NOTE: this serializer is used for GET, PUT and PATCH to /auth/user
class CustomUserDetailsSerializer(UserDetailsSerializer):
    photo = Base64ImageField()

    class Meta:
        fields = [
            "pk",
            "email",  # read only
            "first_name",
            "last_name",
            "is_producer",  # read only
            "has_completed_onboarding",  # read only
            "photo",
            "phone",
            "location",
            "created_at",  # read only
        ]
        read_only_fields = [
            "pk",
            "email",
            "is_producer",
            "created_at",
            "has_completed_onboarding",
        ]
        model = User
