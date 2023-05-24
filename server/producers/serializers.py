from producers.models import Producer
from rest_framework import serializers
from users.serializers import UserSerializer

from .business_logic import become_producer


class ProducerSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Producer
        fields = "__all__"


class BasicProducerSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Producer
        fields = ("user",)


class BecomeProducerSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Producer
        fields = ("user",)

    def create(self, validated_data):
        producer = become_producer(
            user=validated_data["user"],
        )
        return producer
