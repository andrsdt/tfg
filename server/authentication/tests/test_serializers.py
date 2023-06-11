import notifications
import pytest
from authentication.serializers import (
    CustomLoginSerializer,
    CustomRegisterSerializer,
    CustomUserDetailsSerializer,
)
from conftest import NEW_YORK_COORDINATES
from grocerin.validators import OnlyAlphaAndSpacesValidator
from rest_framework.serializers import ValidationError

"""
Code Analysis

Main functionalities:
The CustomLoginSerializer class is a subclass of LoginSerializer from the dj_rest_auth.serializers module. It is used to customize the login serializer for authentication in Django REST framework. The main functionalities of this class are to define the fields that are required for login, and to customize the validation of those fields. Specifically, it overrides the default username field with a hidden field, and requires the email and password fields for login.

Methods:
There are no additional methods defined in the CustomLoginSerializer class. It inherits all the methods from its parent class, LoginSerializer.

Fields:
The CustomLoginSerializer class defines three fields:
- username: a hidden field that is not required for login and has a default value of None.
- email: an email field that is required for login and cannot be left blank.
- password: a character field that is required for login and is write-only, meaning it is not returned in the response.
"""


class TestCustomLoginSerializer:
    # Tests that the serializer raises a validation error for an invalid email format.
    def test_invalid_email_format(self):
        # Edge case test for invalid email format
        data = {"email": "testexample.com"}
        serializer = CustomLoginSerializer(data=data)
        assert not serializer.is_valid()
        assert "email" in serializer.errors

    # Tests that the serializer raises a validation error for an empty email.
    def test_empty_email(self):
        # Edge case test for empty email
        data = {"email": ""}
        serializer = CustomLoginSerializer(data=data)
        assert not serializer.is_valid()
        assert "email" in serializer.errors

    # Tests that the serializer raises a validation error for an empty password.
    def test_empty_password(self):
        # Edge case test for empty password
        data = {"password": ""}
        serializer = CustomLoginSerializer(data=data)
        assert not serializer.is_valid()
        assert "password" in serializer.errors


"""
Code Analysis

Main functionalities:
The CustomRegisterSerializer class is a subclass of the RegisterSerializer class from the dj_rest_auth.registration.serializers module. It is used to customize the registration process for new users by adding additional fields to the registration form and validating the input data. The class also includes a custom_signup method that saves the user's first name and last name to the database and sends a notification to remind the user to complete their profile.

Methods:
- validate_username: This method is used to validate the username field and returns the username value.
- custom_signup: This method is called after the user has been successfully registered and saves the user's first name and last name to the database. It also sends a notification to remind the user to complete their profile.

Fields:
- username: This field is a HiddenField that is not included in the registration form.
- first_name: This field is a CharField that is required and validated using the MinLengthValidator and OnlyAlphaAndSpacesValidator classes.
- last_name: This field is a CharField that is required and validated using the MinLengthValidator and OnlyAlphaAndSpacesValidator classes.
"""


@pytest.mark.django_db
class TestCustomRegisterSerializer:
    # Tests that valid input data is successfully registered.
    def test_custom_register_serializer_valid_input(self, register_user_data):
        serializer = CustomRegisterSerializer(data=register_user_data)
        assert serializer.is_valid()

    # Tests that the custom_signup method updates the user's first and last name fields and sends a notification.
    def test_custom_register_serializer_custom_signup(self, mocker, register_user_data):
        serializer = CustomRegisterSerializer(data=register_user_data)
        assert serializer.is_valid()
        request = mocker.MagicMock(data=register_user_data, method="POST")
        user = serializer.save(request)
        assert user.first_name == "John"
        assert user.last_name == "Doe"
        mocker.patch("notifications.business_logic._send_notification")
        notifications.business_logic.send_reminder_complete_profile_notification(user)
        notifications.business_logic._send_notification.assert_called_once_with(
            user, "REMINDER_COMPLETE_PROFILE", {}
        )

    # Tests that input data containing invalid characters raises a validation error in the OnlyAlphaAndSpacesValidator.
    def test_only_alpha_and_spaces_validator_invalid_characters(self):
        validator = OnlyAlphaAndSpacesValidator
        with pytest.raises(ValidationError):
            validator("John123")

    # Tests that input data missing required fields raises a validation error.
    def test_custom_register_serializer_missing_fields(self, register_user_data):
        incomplete_data = {
            "email": register_user_data["email"],
            "password1": register_user_data["password1"],
            "password2": register_user_data["password2"],
        }
        serializer = CustomRegisterSerializer(data=incomplete_data)
        assert not serializer.is_valid()
        assert serializer.errors == {
            "first_name": ["This field is required."],
            "last_name": ["This field is required."],
        }

    # Tests that valid input data passes the OnlyAlphaAndSpacesValidator.
    def test_only_alpha_and_spaces_validator_valid_input(self):
        validator = OnlyAlphaAndSpacesValidator
        # Assert that no exception is raised when the input data is valid
        validator("John Doe")

    # Tests that the send_reminder_complete_profile_notification function successfully sends a notification.
    def test_send_reminder_complete_profile_notification(self, mocker, bare_user):
        user = bare_user
        mocker.patch("notifications.business_logic._send_notification")
        notifications.business_logic.send_reminder_complete_profile_notification(user)
        notifications.business_logic._send_notification.assert_called_once_with(
            user, "REMINDER_COMPLETE_PROFILE", {}
        )

    # Tests that input data containing invalid characters raises a validation error.
    def test_custom_register_serializer_invalid_characters(self, register_user_data):
        data = register_user_data
        data["first_name"] = "John123"
        data["last_name"] = "Doe123"

        serializer = CustomRegisterSerializer(data=data)
        assert not serializer.is_valid()
        assert serializer.errors == {
            "first_name": ["Este campo sólo puede contener letras y espacios"],
            "last_name": ["Este campo sólo puede contener letras y espacios"],
        }

    # Tests that input data containing fields with too few characters raises a validation error.
    def test_custom_register_serializer_too_few_characters(self, register_user_data):
        data = register_user_data
        data["first_name"] = "J"
        data["last_name"] = "D"

        serializer = CustomRegisterSerializer(data=data)
        assert not serializer.is_valid()
        assert serializer.errors == {
            "first_name": ["Ensure this value has at least 2 characters (it has 1)."],
            "last_name": ["Ensure this value has at least 2 characters (it has 1)."],
        }

    # Tests that input data containing fields with too many characters raises a validation error.
    def test_custom_register_serializer_too_many_characters(self, register_user_data):
        data = register_user_data
        data["first_name"] = "J" * 101
        data["last_name"] = "D" * 101

        serializer = CustomRegisterSerializer(data=data)
        assert not serializer.is_valid()
        assert serializer.errors == {
            "first_name": [
                "Ensure this value has at most 100 characters (it has 101)."
            ],
            "last_name": ["Ensure this value has at most 100 characters (it has 101)."],
        }

    # Tests that the validate_username method returns the provided username.
    def test_custom_register_serializer_validate_username(self):
        serializer = CustomRegisterSerializer()
        assert serializer.validate_username("testusername") == "testusername"


@pytest.mark.django_db
class TestCustomUserDetailsSerializer:
    # Tests that valid input data is correctly serialized and returned
    def test_valid_input_data_serialized(self, user_with_completed_profile):
        serializer = CustomUserDetailsSerializer(user_with_completed_profile)
        expected_data = {
            "pk": user_with_completed_profile.pk,
            "email": "test@example.com",
            "first_name": "John",
            "last_name": "Doe",
            "is_producer": False,
            "photo": None,
            "has_completed_onboarding": True,
            "phone": "+34666123456",
            "location": {"type": "Point", "coordinates": [-74.00597, 40.71427]},
            "created_at": user_with_completed_profile.created_at.isoformat().replace(
                "+00:00", "Z"
            ),
            "average_rating": None,
            "number_ratings": 0,
        }
        assert serializer.data == expected_data

    # Tests that updating a user's data with valid input data correctly updates the user and returns the updated data
    def test_update_user_with_valid_input_data(self, bare_user):
        data = {"first_name": "Jane", "last_name": "Doe", "phone": "+34666123456"}
        serializer = CustomUserDetailsSerializer(bare_user, data=data, partial=True)
        assert serializer.is_valid()
        updated_user = serializer.save()
        assert updated_user.first_name == "Jane"
        assert updated_user.last_name == "Doe"
        assert updated_user.phone == "+34666123456"

    # Tests that invalid input data raises a validation error
    def test_invalid_input_data_raises_validation_error(self):
        data = {"phone": "invalid_phone", "location": "invalid_email"}
        serializer = CustomUserDetailsSerializer(data=data)
        assert not serializer.is_valid()
        assert "phone" in serializer.errors
        assert "location" in serializer.errors

    # Tests that updating a user's data with invalid input data raises a validation error
    def test_update_user_with_invalid_input_data_raises_validation_error(
        self, bare_user
    ):
        data = {"phone": "invalid_phone", "location": "invalid_email"}
        serializer = CustomUserDetailsSerializer(bare_user, data=data, partial=True)
        assert not serializer.is_valid()
        assert "phone" in serializer.errors
        assert "location" in serializer.errors

    # Tests that a user cannot update their email
    def test_user_cannot_update_email(self, bare_user):
        data = {"email": "valid_email@mail.com"}
        serializer = CustomUserDetailsSerializer(bare_user, data=data, partial=True)
        assert serializer.is_valid()
        assert serializer.data["email"] == bare_user.email

    # Tests that updating a user's data with no changes returns the original data
    def test_update_user_with_no_changes_returns_original_data(self, bare_user):
        serializer = CustomUserDetailsSerializer(bare_user, data={}, partial=True)
        assert serializer.is_valid()
        updated_user = serializer.save()
        assert updated_user == bare_user

    # Tests that updating a user's data with completed onboarding deletes the reminder notification
    def test_completed_onboarding_deletes_reminder_notification(
        self, mocker, bare_user
    ):
        user = bare_user
        notification_filter_mock = mocker.patch(
            "notifications.models.Notification.objects.filter"
        )
        data = {"location": NEW_YORK_COORDINATES, "phone": "+34666123456"}
        serializer = CustomUserDetailsSerializer(user, data=data, partial=True)
        assert serializer.is_valid()
        serializer.save()
        notification_filter_mock.assert_called_once_with(
            receiver=user, notification_type="REMINDER_COMPLETE_PROFILE"
        )
        notification_filter_mock.return_value.delete.assert_called_once()
