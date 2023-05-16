from phonenumber_field.serializerfields import PhoneNumberField
from producers.models import Producer
from producers.validators import IsValidDocument
from rest_framework import serializers
from users.serializers import UserSerializer

from .business_logic import become_producer


class ProducerSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Producer
        fields = "__all__"


class BecomeProducerSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    document = serializers.CharField(
        max_length=20, required=True, validators=[IsValidDocument]
    )
    phone = PhoneNumberField(region="ES", required=True)

    class Meta:
        model = Producer
        fields = ("user", "document", "phone")

    def create(self, validated_data):
        producer = become_producer(
            user=validated_data["user"],
            document=validated_data["document"],
            phone=validated_data["phone"],
        )
        return producer
