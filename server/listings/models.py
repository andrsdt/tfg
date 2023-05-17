from django.db import models
from grocerin.mixins import TimestampsMixin
from listings.enums import (
    PRODUCT_ALLERGEN_CHOICES,
    PRODUCT_FEATURE_CHOICES,
    PRODUCT_UNIT_CHOICES,
)
from listings.managers import ListingManager


def listing_images_directory_path(instance, filename):
    return f"listings/{instance.listing.id}/images/{filename}"


class Listing(TimestampsMixin):
    title = models.CharField(max_length=100)
    description = models.TextField(null=True, max_length=2000)
    # TODO: force between 1 and 10 images on create/update
    # images = models.ManyToManyField("ListingImage")
    unit = models.CharField(max_length=10, choices=PRODUCT_UNIT_CHOICES)  # kg, unitary
    # 1 if unit == kg, input by user if unit == unitary
    price_per_unit = models.PositiveIntegerField()
    g_per_unit = models.PositiveIntegerField(null=True)
    # TODO: check if this ensures that at least there is 1 unit/kg available
    available_quantity = models.PositiveIntegerField()  # 10kg, 10units
    # allergens = models.ManyToManyField("ProductAllergen")
    # features = models.ManyToManyField("ProductFeature")
    producer = models.ForeignKey("producers.Producer", on_delete=models.CASCADE)
    # location. TODO: set on product or on user?
    # category = models.CharField(choices=CATEGORY_CHOICES)

    objects = ListingManager()

    def __str__(self):
        return self.title


class ListingImage(models.Model):
    listing = models.ForeignKey(
        Listing, on_delete=models.CASCADE, related_name="images"
    )
    # TODO: delegate to a service to handle image storage in production (S3 or similar)
    image = models.ImageField(upload_to=listing_images_directory_path)

    def __str__(self):
        return self.image.name


class ProductAllergen(models.Model):
    listing = models.ForeignKey(
        Listing, on_delete=models.CASCADE, related_name="allergens"
    )
    allergen = models.CharField(
        max_length=30, choices=PRODUCT_ALLERGEN_CHOICES
    )  # kg, unit

    def __str__(self):
        return self.allergen


class ProductFeature(models.Model):
    listing = models.ForeignKey(
        Listing, on_delete=models.CASCADE, related_name="features"
    )
    feature = models.CharField(max_length=30, choices=PRODUCT_FEATURE_CHOICES)

    def __str__(self):
        return self.feature