from django.core.validators import MinLengthValidator
from grocerin.validators import OnlyAlphaAndSpacesValidator
from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework import serializers

from .models import User


# TODO: delete this serializer if unused (CustomRegisterSerializer is used instead)
class UpdateCustomUserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(
        required=True, validators=[MinLengthValidator(2), OnlyAlphaAndSpacesValidator]
    )
    last_name = serializers.CharField(
        required=True, validators=[MinLengthValidator(2), OnlyAlphaAndSpacesValidator]
    )

    phone = PhoneNumberField(region="ES", required=True)
    location = serializers.CharField(required=False)

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
            "average_rating",
            "number_ratings",
        )


# Used for conversations preview and things like that
class BasicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "first_name",
            "last_name",
            "photo",
            "average_rating",
            "number_ratings",
        )
