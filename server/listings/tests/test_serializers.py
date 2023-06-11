import pytest
from listings.serializers import ListingCreateSerializer
from rest_framework.exceptions import ValidationError

"""
Code Analysis

Main functionalities:
The ListingCreateSerializer class is a Django REST Framework serializer that is used to create, update, and delete Listing objects. It validates the input data and creates a Listing object if the data is valid. It also provides methods to update and delete existing Listing objects. The serializer includes validation for inappropriate language, image upload, and allergen and feature selection. It also includes a default producer field that is set to the current user's producer.

Methods:
- validate(): validates the input data and sets the g_per_unit field to 1000 if the unit is "KG" and g_per_unit is not provided.
- validate_images(): validates the images field and returns a list of images.
- validate_allergens(): validates the allergens field and returns a list of allergens.
- validate_features(): validates the features field and returns a list of features.
- create(): creates a new Listing object using the validated data.
- update(): updates an existing Listing object using the validated data and the instance.
- delete(): deletes an existing Listing object.

Fields:
- title: a required CharField that validates the title of the Listing object.
- description: an optional CharField that validates the description of the Listing object.
- images: a ListingImageSerializer that validates the images of the Listing object.
- unit: a required ChoiceField that validates the unit of the Listing object.
- price_per_unit: a required IntegerField that validates the price per unit of the Listing object.
- g_per_unit: an optional IntegerField that validates the grams per unit of the Listing object.
- available_quantity: a required IntegerField that validates the available quantity of the Listing object.
- allergens: a ProductAllergenSerializer that validates the allergens of the Listing object.
- features: a ProductFeatureSerializer that validates the features of the Listing object.
- producer: a HiddenField that sets the producer of the Listing object to the current user's producer.
"""


@pytest.mark.django_db
class TestListingCreateSerializer:
    # Tests that empty input data raises a validation error
    def test_empty_input_data_raises_validation_error(self, mocker):
        # Arrange
        request = mocker.Mock()
        serializer = ListingCreateSerializer(data={}, context={"request": request})

        # Act & Assert
        with pytest.raises(ValidationError):
            serializer.is_valid(raise_exception=True)

    # Tests that invalid input data raises a validation error
    def test_invalid_input_data_raises_validation_error(
        self, mocker, create_listing_data
    ):
        # Arrange
        request = mocker.Mock()
        create_listing_data["unit"] = "INVALID_UNIT"
        serializer = ListingCreateSerializer(
            data=create_listing_data, context={"request": request}
        )

        # Act & Assert
        with pytest.raises(ValidationError):
            serializer.is_valid(raise_exception=True)

    # Tests that a listing with no images is not created
    def test_listing_with_no_images_not_created(self, mocker, create_listing_data):
        # Arrange
        request = mocker.Mock()
        create_listing_data["images"] = []
        serializer = ListingCreateSerializer(
            data=create_listing_data, context={"request": request}
        )

        # Act & Assert
        with pytest.raises(ValidationError):
            serializer.is_valid(raise_exception=True)

    # Tests that a listing with more than 10 images is not created
    def test_listing_with_more_than_10_images_not_created(
        self, mocker, create_listing_data
    ):
        # Arrange
        request = mocker.Mock()
        create_listing_data["images"] = [
            "test_image{}.jpg".format(i) for i in range(11)
        ]
        serializer = ListingCreateSerializer(
            data=create_listing_data, context={"request": request}
        )

        # Act & Assert
        with pytest.raises(ValidationError):
            serializer.is_valid(raise_exception=True)

    # Tests that inadequate language in title or description raises a validation error
    def test_inadequate_language_in_title_or_description_raises_validation_error(
        self, mocker, create_listing_data
    ):
        # Arrange
        request = mocker.Mock()
        create_listing_data["title"] = "This is a test mierda"
        serializer = ListingCreateSerializer(
            data=create_listing_data, context={"request": request}
        )

        # Act & Assert
        with pytest.raises(ValidationError):
            serializer.is_valid(raise_exception=True)

    # Tests that a listing with negative price_per_unit or available_quantity is not created
    def test_listing_with_negative_price_per_unit_or_available_quantity_not_created(
        self, mocker, create_listing_data
    ):
        # Arrange
        request = mocker.Mock()
        create_listing_data["price_per_unit"] = -1
        serializer = ListingCreateSerializer(
            data=create_listing_data, context={"request": request}
        )

        # Act & Assert
        with pytest.raises(ValidationError):
            serializer.is_valid(raise_exception=True)

        assert "price_per_unit" in serializer.errors
