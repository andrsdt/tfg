import pytest
from producers.models import Producer
from reviews.models import Review
from users.models import User
from users.serializers import UserSerializer


@pytest.mark.django_db
class TestCustomUserSerializer:
    # Tests that the serializer handles null values for optional fields
    def test_null_optional_fields(self):
        user = User(first_name="John", last_name="Doe")
        serializer = UserSerializer(user)
        assert serializer.data == {
            "id": None,
            "first_name": "John",
            "last_name": "Doe",
            "photo": None,
            "phone": None,
            "location": None,
            "created_at": None,
            "average_rating": None,
            "number_ratings": 0,
        }

    # Tests that the serializer returns the correct value for is_producer
    def test_is_producer(self):
        user = User()
        assert user.is_producer == False
        user.producer = Producer()
        assert user.is_producer == True

    # Tests that the serializer handles edge cases for photo
    def test_photo_edge_cases(self):
        user = User()
        assert user.photo == None
        user.photo = "photo.jpg"
        assert user.photo == "photo.jpg"
        user.photo = "photo.png"
        assert user.photo == "photo.png"

    # Tests that the delete method correctly updates the user
    def test_delete_user(self, bare_user):
        user = bare_user

        user.delete()
        assert user.is_active == False
        assert user.first_name == "Usuario"
        assert user.last_name == "Eliminado"
        assert user.photo == None
        assert user.email == f"deleted_user_{user.id}@mail.com"
        assert user.location == None
        assert user.phone == None
        assert user.favorites.count() == 0
        assert hasattr(user, "producer") == False
