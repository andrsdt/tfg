from orders.serializers import OrderSerializer
from rest_framework import serializers
from reviews.business_logic import create_review
from reviews.models import Review


class ReviewSerializer(serializers.ModelSerializer):
    order = OrderSerializer(read_only=True)

    class Meta:
        model = Review
        fields = "__all__"
        read_only_fields = ["id", "created_at", "updated_at"]


class ReviewCreateSerializer(serializers.ModelSerializer):
    # TODO: pretty error?
    rating = serializers.IntegerField(min_value=1, max_value=5)
    # TODO: comment max length field with pretty error message
    comment = serializers.CharField(max_length=500, required=False)

    class Meta:
        model = Review
        fields = "__all__"
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate_order(self, order):
        if order.is_reviewed:
            raise serializers.ValidationError(
                "Ya has dejado una valoración para esta compra"
            )
        return order

    # TODO: redundant?
    def validate_rating(self, rating):
        if rating < 1 or rating > 5:
            raise serializers.ValidationError(
                "La valoración debe ser un número entre 1 y 5"
            )
        return rating

    def validate_comment(self, comment):
        if len(comment) > 500:
            raise serializers.ValidationError(
                "El comentario no puede tener más de 500 caracteres"
            )
        return comment

    def create(self, validated_data):
        return create_review(**validated_data)
