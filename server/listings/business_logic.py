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
    _set_listing_images(validated_data.get("images", []), instance)
    _set_listing_allergens(validated_data.get("allergens", []), instance)
    _set_listing_features(validated_data.get("features", []), instance)
    return instance


@transaction.atomic
def delete_listing(instance):
    # NOTE: are images, features and allergens deleted automatically? check this
    # (I think they have on_delete=models.CASCADE, so they should be deleted)
    instance.delete()


def like_listing(instance: Listing, user: User):
    # Using add() on a relation that already exists won’t duplicate the relation, but it will still trigger signals.
    # https://docs.djangoproject.com/en/4.2/ref/models/relations/#django.db.models.fields.related.RelatedManager.add
    user.favorites.add(instance)
    send_new_like_notification(instance)


def dislike_listing(instance: Listing, user: User):
    user.favorites.remove(instance)


def _create_listing_instance(validated_data):
    return Listing.objects.create(
        title=validated_data["title"],
        description=validated_data["description"],
        unit=validated_data["unit"],
        price_per_unit=validated_data["price_per_unit"],
        g_per_unit=validated_data["g_per_unit"],
        available_quantity=validated_data["available_quantity"],
        producer=validated_data["producer"],
    )


def _update_listing_instance(validated_data, instance):
    instance.title = validated_data["title"]
    instance.description = validated_data["description"]
    instance.unit = validated_data["unit"]
    instance.price_per_unit = validated_data["price_per_unit"]
    instance.g_per_unit = validated_data["g_per_unit"]
    instance.available_quantity = validated_data["available_quantity"]
    instance.save()


def _set_listing_images(images, listing):
    # NOTE: this is currently deleting all images and uploading the new ones.
    # This is because names are generated via uuid and there is no way to
    # match new images to old ones. This is could have performance implications
    # in the future, if the load is too big, or excessive S3 bandwith usage.
    ListingImage.objects.filter(listing=listing).exclude(image__in=images).delete()

    for image in images:
        ListingImage.objects.update_or_create(listing=listing, image=image)


def _set_listing_allergens(allergens, listing):
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
