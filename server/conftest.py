import pytest
from authentication.serializers import (
    CustomRegisterSerializer,
    CustomUserDetailsSerializer,
)
from listings.business_logic import create_listing
from orders.business_logic import create_order
from producers.serializers import BecomeProducerSerializer

NEW_YORK_COORDINATES = "POINT(-74.00597 40.71427)"


@pytest.fixture
def register_user_data():
    """Returns a dictionary with valid data to register a new user."""
    return {
        "email": "test@example.com",
        "password1": "testpassword",
        "password2": "testpassword",
        "first_name": "John",
        "last_name": "Doe",
    }


@pytest.fixture
def bare_user(mocker, register_user_data):
    """Returns a user who just registered, but has not completed his profile yet."""
    request = mocker.MagicMock()
    serializer = CustomRegisterSerializer(data=register_user_data)
    serializer.is_valid()
    return serializer.save(request)


@pytest.fixture
def user_with_completed_profile(bare_user, mocker):
    """Returns a user who has registered and completed his profile."""
    update_data = {"location": NEW_YORK_COORDINATES, "phone": "+34666123456"}
    serializer = CustomUserDetailsSerializer(bare_user, data=update_data, partial=True)
    assert serializer.is_valid()
    return serializer.save()


@pytest.fixture
def producer(mocker, user_with_completed_profile):
    """Returns a test producer"""
    request = mocker.MagicMock()
    request.user = user_with_completed_profile
    serializer = BecomeProducerSerializer(data={}, context={"request": request})
    assert serializer.is_valid()
    return serializer.save()


@pytest.fixture
def allergens():
    """Returns a list of allergens."""


@pytest.fixture
def create_listing_data(producer):
    """Returns a dictionary with valid data to create a new listing."""
    return {
        "title": "Test Listing",
        "description": "This is a test listing",
        "unit": "KG",
        "price_per_unit": 100,
        "g_per_unit": 1000,
        "available_quantity": 50,
        "producer": producer,
        "images": ["test_image1.jpg", "test_image2.jpg"],
        "allergens": ["PEANUTS", "GLUTEN"],
        "features": ["IS_FROZEN", "IS_VEGAN"],
    }


@pytest.fixture
def update_listing_data():
    """Returns a dictionary with valid data to update a listing."""
    return {
        "title": "Updated Test Listing",
        "description": "This is an updated test listing",
        "unit": "UNIT",
        "price_per_unit": 1,
        "g_per_unit": 1,
        "available_quantity": 1,
        "images": ["test_image3.jpg", "test_image4.jpg"],
        "allergens": ["GLUTEN", "SOY"],
        "features": [],
    }


@pytest.fixture
def listing(create_listing_data):
    """Returns a test listing."""
    return create_listing(create_listing_data)


@pytest.fixture
def create_external_order_data(listing):
    """Returns a dictionary with valid data to create a new order made outside the platform."""

    return {
        "listing": listing,
        "consumer": None,
        "quantity": 1,
        "total_price": 100,
    }


@pytest.fixture
def external_order(create_external_order_data):
    """Returns a test order made outside the platform."""
    return create_order(**create_external_order_data)


@pytest.fixture
def create_order_data(bare_user, listing):
    """Returns a dictionary with valid data to create a new order sold to a user in the platform."""
    return {
        "listing": listing,
        "consumer": bare_user,
        "quantity": 1,
        "total_price": 100,
    }


@pytest.fixture
def order(create_order_data):
    """Returns a test order sold to a user in the platform."""
    return create_order(**create_order_data)
