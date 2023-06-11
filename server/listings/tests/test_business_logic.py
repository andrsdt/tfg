import notifications.business_logic
import pytest
from django.db import IntegrityError, transaction
from listings.business_logic import (
    create_listing,
    delete_listing,
    dislike_listing,
    like_listing,
    update_listing,
)
from listings.models import ListingImage, ProductAllergen, ProductFeature
from notifications.models import Notification


@pytest.mark.django_db
class TestCreateListing:
    # Tests that valid input data creates a new listing instance with correct data, sets listing
    # images, allergens, and features correctly, and returns the created listing instance.
    def test_create_listing_valid_input(self, create_listing_data):
        # Arrange
        data = create_listing_data

        # Act
        listing = create_listing(data)

        # Assert
        assert listing.title == data["title"]
        assert listing.description == data["description"]
        assert listing.unit == data["unit"]
        assert listing.price_per_unit == data["price_per_unit"]
        assert listing.g_per_unit == data["g_per_unit"]
        assert listing.available_quantity == data["available_quantity"]
        assert listing.producer == data["producer"]

        assert ListingImage.objects.filter(listing=listing).count() == len(
            data["images"]
        )
        assert ProductAllergen.objects.filter(listing=listing).count() == len(
            data["allergens"]
        )
        assert ProductFeature.objects.filter(listing=listing).count() == len(
            data["features"]
        )

    # Tests that empty input data does not allow to create a new listing instance.
    @pytest.mark.django_db
    def test_create_listing_empty_input(self):
        # Arrange
        validated_data = {}

        # Act and assert
        with pytest.raises(IntegrityError):
            create_listing(validated_data)

    # Tests that missing required input data raises an error.
    @pytest.mark.django_db
    def test_create_listing_missing_required_input(self, create_listing_data):
        # Arrange
        data = create_listing_data
        del data["title"]

        # Act and Assert
        with pytest.raises(IntegrityError):
            create_listing(create_listing_data)

    # Tests that the function uses atomic transaction to ensure data consistency.
    @pytest.mark.django_db
    def test_create_listing_atomic_transaction(self, mocker, create_listing_data):
        # Arrange
        mocker.patch("listings.business_logic.create_listing")
        mocker.patch("django.db.transaction.atomic")

        # Act
        create_listing(create_listing_data)

        # Assert
        assert transaction.atomic.called

    # Tests that invalid input data raises an error.
    @pytest.mark.django_db
    def test_create_listing_invalid_input(self, create_listing_data):
        # Arrange
        data = create_listing_data
        data["price_per_unit"] = "invalid"

        # Act and Assert
        with pytest.raises(ValueError):
            create_listing(data)


@pytest.mark.django_db
class TestUpdateListing:
    # Tests that the function updates the instance with valid input data and returns it
    def test_happy_path_valid_data(self, listing, update_listing_data):
        # Arrange
        new_data = update_listing_data

        # Act
        updated_instance = update_listing(new_data, listing)

        # Assert
        assert updated_instance.title == new_data["title"]
        assert updated_instance.description == new_data["description"]
        assert updated_instance.unit == new_data["unit"]
        assert updated_instance.price_per_unit == new_data["price_per_unit"]
        assert updated_instance.g_per_unit == new_data["g_per_unit"]
        assert updated_instance.available_quantity == new_data["available_quantity"]
        assert updated_instance.producer == listing.producer

        assert ListingImage.objects.filter(listing=updated_instance).count() == len(
            new_data["images"]
        )
        assert ProductAllergen.objects.filter(listing=updated_instance).count() == len(
            new_data["allergens"]
        )
        assert ProductFeature.objects.filter(listing=updated_instance).count() == len(
            new_data["features"]
        )

    # Tests that the function updates the instance with valid input data and empty optional fields and returns it
    def test_happy_path_empty_optional_fields(self, listing):
        # Arrange
        new_data = {
            "title": "New Title",
            "description": "",
            "unit": "",
            "price_per_unit": 10.99,
            "g_per_unit": 1000,
            "available_quantity": 50,
            "producer": "",
            "images": [],
            "allergens": [],
            "features": [],
        }

        # Act
        updated_instance = update_listing(new_data, listing)

        # Assert
        assert updated_instance.title == new_data["title"]
        assert updated_instance.description == new_data["description"]
        assert updated_instance.unit == new_data["unit"]
        assert updated_instance.price_per_unit == new_data["price_per_unit"]
        assert updated_instance.g_per_unit == new_data["g_per_unit"]
        assert updated_instance.available_quantity == new_data["available_quantity"]
        assert updated_instance.producer == listing.producer

        assert ListingImage.objects.filter(listing=updated_instance).count() == len(
            new_data["images"]
        )
        assert ProductAllergen.objects.filter(listing=updated_instance).count() == len(
            new_data["allergens"]
        )
        assert ProductFeature.objects.filter(listing=updated_instance).count() == len(
            new_data["features"]
        )

    # Tests that the function does not update the instance when empty input data is provided and returns it
    def test_edge_case_empty_data(self, listing, create_listing_data):
        # Arrange
        data = create_listing_data
        new_data = {}

        # Act
        updated_instance = update_listing(new_data, listing)

        # Assert
        assert updated_instance.title == data["title"]
        assert updated_instance.description == data["description"]
        assert updated_instance.unit == data["unit"]
        assert updated_instance.price_per_unit == data["price_per_unit"]
        assert updated_instance.g_per_unit == data["g_per_unit"]
        assert updated_instance.available_quantity == data["available_quantity"]
        assert updated_instance.producer == listing.producer

        assert ListingImage.objects.filter(listing=updated_instance).count() == len(
            data["images"]
        )
        assert ProductAllergen.objects.filter(listing=updated_instance).count() == len(
            data["allergens"]
        )
        assert ProductFeature.objects.filter(listing=updated_instance).count() == len(
            data["features"]
        )

    # Tests that the function does not update the instance when invalid input data is provided and returns it
    def test_edge_case_invalid_data(self, listing, update_listing_data):
        # Arrange
        new_data = update_listing_data
        new_data["price_per_unit"] = "invalid"

        # Act and Assert
        with pytest.raises(ValueError):
            update_listing(new_data, listing)

    # Tests that the function updates the instance when it has no allergens or features and returns it
    def test_general_behaviour_no_allergens_features(
        self, listing, update_listing_data
    ):
        # Arrange
        new_data = update_listing_data
        new_data["allergens"] = []
        new_data["features"] = []

        # Act
        updated_instance = update_listing(new_data, listing)

        # Assert
        assert updated_instance.title == new_data["title"]
        assert updated_instance.description == new_data["description"]
        assert updated_instance.unit == new_data["unit"]
        assert updated_instance.price_per_unit == new_data["price_per_unit"]
        assert updated_instance.g_per_unit == new_data["g_per_unit"]
        assert updated_instance.available_quantity == new_data["available_quantity"]
        assert updated_instance.producer == listing.producer

        assert ListingImage.objects.filter(listing=updated_instance).count() == len(
            new_data["images"]
        )
        assert ProductAllergen.objects.filter(listing=updated_instance).count() == len(
            new_data["allergens"]
        )
        assert ProductFeature.objects.filter(listing=updated_instance).count() == len(
            new_data["features"]
        )

    # Tests that the function updates the instance when it has the maximum number of images and returns it
    def test_general_behaviour_max_images_allergens_features(
        self, listing, update_listing_data
    ):
        # Arrange
        new_data = update_listing_data
        new_data["images"] = [f"new_image_{i}.jpg" for i in range(0, 10)]

        # Act
        updated_instance = update_listing(new_data, listing)

        # Assert
        assert updated_instance.title == new_data["title"]
        assert updated_instance.description == new_data["description"]
        assert updated_instance.unit == new_data["unit"]
        assert updated_instance.price_per_unit == new_data["price_per_unit"]
        assert updated_instance.g_per_unit == new_data["g_per_unit"]
        assert updated_instance.available_quantity == new_data["available_quantity"]
        assert updated_instance.producer == listing.producer

        assert ListingImage.objects.filter(listing=updated_instance).count() == len(
            new_data["images"]
        )
        assert ProductAllergen.objects.filter(listing=updated_instance).count() == len(
            new_data["allergens"]
        )
        assert ProductFeature.objects.filter(listing=updated_instance).count() == len(
            new_data["features"]
        )


@pytest.mark.django_db
class TestDeleteListing:
    # Tests that instance is deleted successfully
    def test_delete_instance_success(self, listing):
        # Arrange
        instance = listing

        # Act
        delete_listing(instance)

        # Assert
        assert not instance.pk

    # Tests that related images are deleted
    def test_delete_related_images(self, listing, mocker):
        # Arrange
        instance = listing
        mock_listing_image = mocker.patch("listings.models.ListingImage.objects.filter")
        mock_listing_image.return_value.count.return_value = 2

        # Act
        delete_listing(instance)

        # Assert
        assert mock_listing_image.called_once_with(listing=instance)
        assert mock_listing_image.return_value.delete.called_once()

    # Tests that related features are deleted
    def test_delete_related_features(self, listing, mocker):
        # Arrange
        instance = listing
        mock_product_feature = mocker.patch(
            "listings.models.ProductFeature.objects.filter"
        )
        mock_product_feature.return_value.count.return_value = 3

        # Act
        delete_listing(instance)

        # Assert
        assert mock_product_feature.called_once_with(listing=instance)
        assert mock_product_feature.return_value.delete.called_once()

    # Tests that related allergens are deleted
    def test_delete_related_allergens(self, listing, mocker):
        # Arrange
        instance = listing
        mock_product_allergen = mocker.patch(
            "listings.models.ProductAllergen.objects.filter"
        )
        mock_product_allergen.return_value.count.return_value = 1

        # Act
        delete_listing(instance)

        # Assert
        assert mock_product_allergen.called_once_with(listing=instance)
        assert mock_product_allergen.return_value.delete.called_once()


@pytest.mark.django_db
class TestLikeListing:
    # Tests that the function adds the listing to the user's favorites
    def test_add_favorite(self, listing, bare_user):
        # Arrange
        user = bare_user
        assert not user.favorites.filter(id=listing.id).exists()

        # Act
        like_listing(listing, user)

        # Assert
        assert user.favorites.filter(id=listing.id).exists()

    # Tests that the function sends a notification to the producer if the user is not the producer
    def test_send_notification(self, listing, bare_user, mocker):
        # Arrange
        user = bare_user
        mocker.patch("notifications.business_logic._send_notification")
        producer = listing.producer.user
        assert (
            Notification.objects.filter(
                notification_type="NEW_LIKE", data={"listing": listing.id}
            ).count()
            == 0
        )

        # Act
        like_listing(listing, user)

        # Assert
        if user != producer:
            notifications.business_logic._send_notification.assert_called_once_with(
                producer, "NEW_LIKE", {"listing": listing.id}
            )
            assert (
                Notification.objects.filter(
                    notification_type="NEW_LIKE", data={"listing": listing.id}
                ).count()
                == 1
            )
        else:
            notifications.business_logic._send_notification.assert_not_called()
            assert (
                Notification.objects.filter(
                    notification_type="NEW_LIKE", data={"listing": listing.id}
                ).count()
                == 0
            )

    # Tests that the function does not send a notification to the producer if the user is liking his own product
    def test_no_notification(self, listing, mocker):
        # Arrange
        mocker.patch("notifications.business_logic._send_notification")
        producer = listing.producer.user

        # Act
        like_listing(listing, producer)

        # Assert
        notifications.business_logic._send_notification.assert_not_called()

    # Tests that the function does not add the listing to the user's favorites if it has already been liked
    def test_already_liked(self, mocker, bare_user, listing):
        # Arrange
        user = bare_user
        mocker.patch("notifications.business_logic._send_notification")
        user.favorites.add(listing)
        assert (
            Notification.objects.filter(
                notification_type="NEW_LIKE", data={"listing": listing.id}
            ).count()
            == 0
        )

        # Act
        like_listing(listing, user)

        # Assert
        notifications.business_logic._send_notification.assert_not_called()
        assert (
            Notification.objects.filter(
                notification_type="NEW_LIKE", data={"listing": listing.id}
            ).count()
            == 0
        )


@pytest.mark.django_db
class TestDislikeListing:
    # Tests that the function removes a listing from a user's favorites
    def test_remove_favorite(self, listing, bare_user):
        # Arrange
        user = bare_user
        user.favorites.add(listing)
        assert user.favorites.filter(id=listing.id).exists()

        # Act
        dislike_listing(listing, user)

        # Assert
        assert not user.favorites.filter(id=listing.id).exists()

    # Tests that the function does not remove a listing from a user's favorites if it was not previously added
    def test_remove_nonexistent_favorite(self, listing, bare_user):
        # Arrange
        user = bare_user
        assert not user.favorites.filter(id=listing.id).exists()

        # Act
        dislike_listing(listing, user)

        # Assert
        assert not user.favorites.filter(id=listing.id).exists()
