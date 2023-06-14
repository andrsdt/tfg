from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import LoginSerializer, UserDetailsSerializer
from django.core.validators import MaxLengthValidator, MinLengthValidator
from drf_extra_fields.fields import Base64ImageField
from grocerin.validators import OnlyAlphaAndSpacesValidator
from notifications.business_logic import (
    delete_reminder_complete_profile_notification,
    send_reminder_complete_profile_notification,
)
from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework import serializers
from users.models import User


class CustomLoginSerializer(LoginSerializer):
    username = serializers.HiddenField(default=None)
    email = serializers.EmailField(required=True, allow_blank=False)
    password = serializers.CharField(required=True, write_only=True)


class CustomRegisterSerializer(RegisterSerializer):
    """
    Serializer for user registration.
    """

    class Meta:
        fields = [
            "email",
            "password1",
            "password2",
            "first_name",
            "last_name",
            "phone",
            "location",
        ]

    username = serializers.HiddenField(default=None)
    first_name = serializers.CharField(
        required=True,
        validators=[
            MinLengthValidator(2),
            MaxLengthValidator(100),
            OnlyAlphaAndSpacesValidator,
        ],
    )
    last_name = serializers.CharField(
        required=True,
        validators=[
            MinLengthValidator(2),
            MaxLengthValidator(100),
            OnlyAlphaAndSpacesValidator,
        ],
    )

    def validate_username(self, username):
        # NOTE: this is a hack to override the default username validation
        # from the library, which would raise an error since the username
        # field is not used in our app.
        return username

    def custom_signup(self, request, user):
        # NOTE: ideally this logic would be in business_logic.py
        # but due to the way dj_rest_auth works, it's tightly coupled
        # to the serializer (it already provides a "user" object),
        # which doesn't allow us to create it from scratch in
        # business_logic.py, but only add new fields to it.
        user.first_name = self.validated_data.get("first_name")
        user.last_name = self.validated_data.get("last_name")
        user.save(update_fields=["first_name", "last_name"])

        send_reminder_complete_profile_notification(user)

        return user


# NOTE: this serializer is used for GET, PUT and PATCH to /auth/user
class CustomUserDetailsSerializer(UserDetailsSerializer):
    photo = Base64ImageField()
    phone = PhoneNumberField(region="ES", required=False)

    class Meta:
        fields = [
            "pk",
            "email",  # read only
            "first_name",
            "last_name",
            "is_producer",
            "has_completed_onboarding",
            "photo",
            "phone",
            "location",
            "created_at",
            "average_rating",
            "number_ratings",
        ]
        model = User
        read_only_fields = ["email"]

    def update(self, instance, validated_data):
        updated_user = super().update(instance, validated_data)

        if updated_user.has_completed_onboarding:
            delete_reminder_complete_profile_notification(updated_user)

        return updated_user
