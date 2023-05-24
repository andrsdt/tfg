from chats.models import Conversation
from listings.serializers import BasicListingSerializer
from orders.business_logic import create_order
from orders.models import Order
from rest_framework import serializers
from users.models import User
from users.serializers import BasicUserSerializer


class OrderSerializer(serializers.ModelSerializer):
    listing = BasicListingSerializer(read_only=True)
    consumer = BasicUserSerializer(read_only=True)
    is_reviewed = serializers.BooleanField(read_only=True)

    class Meta:
        model = Order
        fields = "__all__"
        # TODO: are these read_only_fields necessary? if they are,
        # I should add them to the other serializers too
        # NOTE: THEY ARE
        read_only_fields = ["id", "created_at", "updated_at"]


class OrderCreateSerializer(serializers.ModelSerializer):
    quantity = serializers.IntegerField(min_value=1)
    consumer = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), allow_null=False
    )

    class Meta:
        model = Order
        fields = "__all__"
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate_listing(self, listing):
        if not listing.is_active:
            raise serializers.ValidationError("El producto no está activo")
        return listing

    # TODO: extract these validations to validators.py? for easier testing
    def validate(self, data):
        listing = data["listing"]
        quantity = data["quantity"]
        consumer = data.get("consumer", None)

        # validate that the user is not buying himself the product,
        if listing.producer.user == consumer:
            raise serializers.ValidationError("No puedes comprar tu propio producto")

        # validate that the listing has enough stock, etc.)
        if listing.available_quantity < quantity:
            raise serializers.ValidationError(
                "No hay suficiente stock (hay "
                + str(listing.available_quantity)
                + " disponibles)"
            )

        # Validate that the user that we want to sell the product to
        # Is someone who we have had a conversation with before
        if consumer is not None:
            has_conversations = Conversation.objects.filter(
                consumer=consumer, listing=listing
            ).exists()
            if not has_conversations:
                raise serializers.ValidationError(
                    "No puedes venderle un producto alguien con quien no has hablado sobre este producto"
                )

        return data

    def create(self, validated_data):
        return create_order(**validated_data)
