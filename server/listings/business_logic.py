from django.db import transaction
from listings.models import Listing, ListingImage, ProductAllergen, ProductFeature
from notifications.business_logic import send_new_like_notification
from users.models import User


@transaction.atomic
def create_listing(validated_data):
    listing = _create_listing_instance(validated_data)
    _set_listing_images(validated_data.get("images", []), listing)
    _set_listing_allergens(validated_data.get("allergens", []), listing)
    _set_listing_features(validated_data.get("features", []), listing)
    return listing


@transaction.atomic
def update_listing(validated_data, instance):
    _update_listing_instance(validated_data, instance)
    _set_listing_images(validated_data.get("images"), instance)
    _set_listing_allergens(validated_data.get("allergens"), instance)
    _set_listing_features(validated_data.get("features"), instance)
    return instance


@transaction.atomic
def delete_listing(instance: Listing):
    instance.delete()


def like_listing(instance: Listing, user: User):
    # Using add() on a relation that already exists won’t duplicate the relation, but it will still trigger signals.
    # https://docs.djangoproject.com/en/4.2/ref/models/relations/#django.db.models.fields.related.RelatedManager.add
    user.favorites.add(instance)

    # Only send a notification to the producer
    # if he hasn't liked his own listing
    if user != instance.producer.user:
        send_new_like_notification(instance)


def dislike_listing(instance: Listing, user: User):
    user.favorites.remove(instance)


def _create_listing_instance(validated_data: dict):
    return Listing.objects.create(
        title=validated_data.get("title"),
        description=validated_data.get("description"),
        unit=validated_data.get("unit"),
        price_per_unit=validated_data.get("price_per_unit"),
        g_per_unit=validated_data.get("g_per_unit"),
        available_quantity=validated_data.get("available_quantity"),
        producer=validated_data.get("producer"),
    )


def _update_listing_instance(validated_data, instance):
    instance.title = validated_data.get("title", instance.title)
    instance.description = validated_data.get("description", instance.description)
    instance.unit = validated_data.get("unit", instance.unit)
    instance.price_per_unit = validated_data.get(
        "price_per_unit", instance.price_per_unit
    )
    instance.g_per_unit = validated_data.get("g_per_unit", instance.g_per_unit)
    instance.available_quantity = validated_data.get(
        "available_quantity", instance.available_quantity
    )
    instance.save()


def _set_listing_images(images, listing):
    if images is None:
        return

    ListingImage.objects.filter(listing=listing).exclude(image__in=images).delete()
    for image in images:
        ListingImage.objects.update_or_create(listing=listing, image=image)


def _set_listing_allergens(allergens, listing):
    if allergens is None:
        return

    # Delete all allergens that are not in the new list of allergens
    ProductAllergen.objects.filter(listing=listing).exclude(
        allergen__in=allergens
    ).delete()

    for allergen in allergens:
        [listing_allergen, present] = ProductAllergen.objects.get_or_create(
            listing=listing, allergen=allergen
        )
        if not present:
            listing.allergens.add(listing_allergen)


def _set_listing_features(features, listing):
    if features is None:
        return

    # Delete all features that are not in the new list of features
    ProductFeature.objects.filter(listing=listing).exclude(
        feature__in=features
    ).delete()

    for feature in features:
        [listing_feature, present] = ProductFeature.objects.get_or_create(
            listing=listing, feature=feature
        )
        if not present:
            listing.features.add(listing_feature)
