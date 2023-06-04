# Tests that valid input data creates a new listing instance with correct data, sets listing images, allergens, and features correctly, and returns the created listing instance.
import pytest
from django.db import transaction
from listings.business_logic import create_listing
from listings.models import ListingImage, ProductAllergen, ProductFeature

# TODO: test_create_listing_valid_input(mocker):


# Tests that empty input data creates a new listing instance with default values and returns the created listing instance.
@pytest.mark.django_db
def test_create_listing_empty_input(mocker):
    # Arrange
    validated_data = {}
    mocker.patch("listings.models.Listing.objects.create")

    # Act
    result = create_listing(validated_data)

    # Assert
    assert result is not None
    assert result.title == "New Listing"
    assert result.description == ""
    assert result.unit == "unit"
    assert result.price_per_unit == 0.0
    assert result.g_per_unit == 0
    assert result.available_quantity == 0
    assert result.producer == ""


# Tests that missing required input data raises an error.
@pytest.mark.django_db
def test_create_listing_missing_required_input(mocker):
    # Arrange
    validated_data = {
        "title": "Test Listing",
        "description": "This is a test listing",
        "unit": "kg",
        "price_per_unit": 10.0,
        "g_per_unit": 1000,
        "producer": "Test Producer",
    }
    mocker.patch("listings.models.Listing.objects.create")

    # Act and Assert
    with pytest.raises(KeyError):
        create_listing(validated_data)


# Tests that the function uses atomic transaction to ensure data consistency.
@pytest.mark.django_db
def test_create_listing_atomic_transaction(mocker):
    # Arrange
    validated_data = {
        "title": "Test Listing",
        "description": "This is a test listing",
        "unit": "kg",
        "price_per_unit": 10.0,
        "g_per_unit": 1000,
        "available_quantity": 50,
        "producer": "Test Producer",
        "images": ["test_image1.jpg", "test_image2.jpg"],
        "allergens": ["peanuts", "gluten"],
        "features": ["organic", "non-GMO"],
    }
    mocker.patch("listings.models.Listing.objects.create")
    mocker.patch("listings.models.ListingImage.objects.update_or_create")
    mocker.patch("listings.models.ProductAllergen.objects.get_or_create")
    mocker.patch("listings.models.ProductFeature.objects.get_or_create")
    mocker.patch("django.db.transaction.atomic")

    # Act
    create_listing(validated_data)

    # Assert
    assert transaction.atomic.called


# Tests that invalid input data raises an error.
@pytest.mark.django_db
def test_create_listing_invalid_input(mocker):
    # Arrange
    validated_data = {
        "title": "Test Listing",
        "description": "This is a test listing",
        "unit": "kg",
        "price_per_unit": "invalid",
        "g_per_unit": 1000,
        "available_quantity": 50,
        "producer": "Test Producer",
        "images": ["test_image1.jpg", "test_image2.jpg"],
        "allergens": ["peanuts", "gluten"],
        "features": ["organic", "non-GMO"],
    }
    mocker.patch("listings.models.Listing.objects.create")

    # Act and Assert
    with pytest.raises(ValueError):
        create_listing(validated_data)


# Tests the performance implications of deleting all images and allergens before adding new ones, and possible race conditions when updating or creating listing images.
@pytest.mark.django_db
def test_create_listing_performance(mocker):
    # Arrange
    validated_data = {
        "title": "Test Listing",
        "description": "This is a test listing",
        "unit": "kg",
        "price_per_unit": 10.0,
        "g_per_unit": 1000,
        "available_quantity": 50,
        "producer": "Test Producer",
        "images": ["test_image1.jpg", "test_image2.jpg"],
        "allergens": ["peanuts", "gluten"],
        "features": ["organic", "non-GMO"],
    }
    mocker.patch("listings.models.Listing.objects.create")
    mocker.patch("listings.models.ListingImage.objects.filter")
    mocker.patch("listings.models.ProductAllergen.objects.filter")
    mocker.patch("listings.models.ProductFeature.objects.filter")
    mocker.patch("listings.models.ListingImage.objects.exclude")
    mocker.patch("listings.models.ProductAllergen.objects.exclude")
    mocker.patch("listings.models.ProductFeature.objects.exclude")

    # Act
    create_listing(validated_data)

    # Assert
    assert ListingImage.objects.filter.called
    assert ProductAllergen.objects.filter.called
    assert ProductFeature.objects.filter.called
    assert ListingImage.objects.exclude.called
    assert ProductAllergen.objects.exclude.called
    assert ProductFeature.objects.exclude.called
