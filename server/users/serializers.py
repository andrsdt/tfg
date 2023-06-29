from django.core.validators import MinLengthValidator
from grocerin.validators import OnlyAlphaAndSpacesValidator
from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework import serializers

from .models import User


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
            "is_producer",
        )
