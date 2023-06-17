from django.db import models
from grocerin.mixins import SoftDeleteMixin, TimestampsMixin
from listings.enums import (
    PRODUCT_ALLERGEN_CHOICES,
    PRODUCT_FEATURE_CHOICES,
    PRODUCT_UNIT_CHOICES,
)
from listings.managers import ListingManager


def listing_images_directory_path(instance, filename):
    return f"listings/{instance.listing.id}/images/{filename}"


class Listing(TimestampsMixin, SoftDeleteMixin):
    title = models.CharField(max_length=100)
    description = models.TextField(null=True, max_length=2000)
    unit = models.CharField(max_length=10, choices=PRODUCT_UNIT_CHOICES)  # kg, unitary
    price_per_unit = models.PositiveIntegerField()
    g_per_unit = models.PositiveIntegerField(null=True)
    available_quantity = models.PositiveIntegerField()  # 10kg, 10units
    producer = models.ForeignKey("producers.Producer", on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

    objects = ListingManager()

    def __str__(self):
        return self.title

    def is_favorite(self, user) -> bool:
        return user.favorites.filter(id=self.id).exists()

    def set_active(self):
        self.is_active = True
        self.save()

    def set_inactive(self):
        self.is_active = False
        self.save()

    def substract_stock(self, quantity: int):
        self.available_quantity -= quantity
        self.save()


class ListingImage(models.Model):
    listing = models.ForeignKey(
        Listing, on_delete=models.CASCADE, related_name="images"
    )
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
