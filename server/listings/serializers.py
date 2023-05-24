from drf_extra_fields.fields import Base64ImageField
from grocerin.validators import InadequateLanguageValidator
from listings.business_logic import create_listing, delete_listing, update_listing
from listings.enums import PRODUCT_UNIT_CHOICES
from listings.models import Listing, ListingImage, ProductAllergen, ProductFeature
from producers.serializers import BasicProducerSerializer
from rest_framework import serializers


class CurrentProducerDefault:
    requires_context = True

    def __call__(self, serializer_field):
        return serializer_field.context["request"].user.producer

    def __repr__(self):
        return "%s()" % self.__class__.__name__


class ListingImageSerializer(serializers.ModelSerializer):
    image = Base64ImageField()

    class Meta:
        model = ListingImage
        fields = ("image",)


class ProductAllergenSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductAllergen
        fields = ("allergen",)


class ProductFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductFeature
        fields = ("feature",)


class BasicListingSerializer(serializers.ModelSerializer):
    images = ListingImageSerializer(many=True, read_only=True)
    producer = BasicProducerSerializer(read_only=True)

    class Meta:
        model = Listing
        fields = (
            "id",
            "title",
            "images",
            "unit",
            "price_per_unit",
            "g_per_unit",
            "is_active",
            "producer",
        )


class ListingSerializer(serializers.ModelSerializer):
    allergens = ProductAllergenSerializer(many=True, read_only=True)
    features = ProductFeatureSerializer(many=True, read_only=True)
    images = ListingImageSerializer(many=True, read_only=True)
    producer = BasicProducerSerializer(read_only=True)
    is_favorite = serializers.SerializerMethodField()

    class Meta:
        model = Listing
        fields = "__all__"

    def get_is_favorite(self, obj: Listing) -> bool:
        request = self.context.get("request")
        if request and not request.user.is_anonymous:
            return obj.is_favorite(request.user)
        return False


class ListingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = "__all__"
        # TODO: exclude id, producer, is_active, created_at, updated_at?

    title = serializers.CharField(
        required=True,
        validators=[InadequateLanguageValidator],
        min_length=1,
        max_length=100,
    )
    description = serializers.CharField(
        required=False,
        validators=[InadequateLanguageValidator],
        max_length=2000,
    )
    images = ListingImageSerializer(many=True)
    unit = serializers.ChoiceField(required=True, choices=PRODUCT_UNIT_CHOICES)
    price_per_unit = serializers.IntegerField(
        required=True, min_value=0, max_value=100000
    )
    g_per_unit = serializers.IntegerField(min_value=0, max_value=100000)
    available_quantity = serializers.IntegerField(
        required=True, min_value=1, max_value=10000
    )
    allergens = ProductAllergenSerializer(many=True, required=False)
    features = ProductFeatureSerializer(many=True, required=False)
    producer = serializers.HiddenField(default=CurrentProducerDefault())

    # g_per_unit is not required for unit products. For weight products, it will default to 1000g (1 kg)
    def validate(self, data):
        unit = data.get("unit")
        g_per_unit = data.get("g_per_unit")
        sanitized_g_per_unit = g_per_unit if g_per_unit > 0 else None
        data.update({"g_per_unit": 1000 if unit == "KG" else sanitized_g_per_unit})
        return data

    def validate_images(self, images):
        if len(images) < 1:
            raise serializers.ValidationError("At least 1 image is required")
        if len(images) > 10:
            raise serializers.ValidationError("You can't upload more than 10 images")
        return list(map(lambda image: image["image"], images))

    def validate_allergens(self, allergens):
        return list(map(lambda allergen: allergen["allergen"], allergens))

    def validate_features(self, features):
        return list(map(lambda feature: feature["feature"], features))

    def create(self, validated_data):
        # TODO: do **validated_data instead of validated_data and
        # change the method to accept individual parameters
        return create_listing(validated_data)

    def update(self, instance, validated_data):
        return update_listing(validated_data, instance=instance)

    def delete(self, instance):
        delete_listing(instance)
