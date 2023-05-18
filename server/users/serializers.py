from django.core.validators import MinLengthValidator
from grocerin.validators import OnlyAlphaAndSpacesValidator
from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework import serializers

from .models import User


class UpdateCustomUserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(
        required=True, validators=[MinLengthValidator(2), OnlyAlphaAndSpacesValidator]
    )
    last_name = serializers.CharField(
        required=True, validators=[MinLengthValidator(2), OnlyAlphaAndSpacesValidator]
    )

    phone = PhoneNumberField(region="ES", required=True)

    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "photo",
            "phone",
            "location",
        ]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "first_name",
            "last_name",
            "photo",
            "phone",
            "location",
            "created_at",
        )
