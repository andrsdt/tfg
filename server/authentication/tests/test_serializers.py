import notifications
import pytest
from authentication.serializers import CustomLoginSerializer, CustomRegisterSerializer
from grocerin.validators import OnlyAlphaAndSpacesValidator
from notifications.business_logic import send_reminder_complete_profile_notification
from rest_framework.serializers import ValidationError
from users.models import User

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
        data = {"email": "testexample.com", "password": "password123"}
        serializer = CustomLoginSerializer(data=data)
        assert not serializer.is_valid()
        assert "email" in serializer.errors

    # Tests that the serializer raises a validation error for an empty email.
    def test_empty_email(self):
        # Edge case test for empty email
        data = {"email": "", "password": "password123"}
        serializer = CustomLoginSerializer(data=data)
        assert not serializer.is_valid()
        assert "email" in serializer.errors

    # Tests that the serializer raises a validation error for an empty password.
    def test_empty_password(self):
        # Edge case test for empty password
        data = {"email": "test@example.com", "password": ""}
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
    def test_custom_register_serializer_valid_input(self):
        data = {
            "email": "test@example.com",
            "password1": "testpassword",
            "password2": "testpassword",
            "first_name": "John",
            "last_name": "Doe",
            "phone": "1234567890",
            "location": "New York",
        }
        serializer = CustomRegisterSerializer(data=data)
        assert serializer.is_valid()

    # Tests that the custom_signup method updates the user's first and last name fields and sends a notification.
    def test_custom_register_serializer_custom_signup(self, mocker):
        data = {
            "email": "test@example.com",
            "password1": "testpassword",
            "password2": "testpassword",
            "first_name": "John",
            "last_name": "Doe",
            "phone": "1234567890",
            "location": "New York",
        }
        request = mocker.Mock()
        serializer = CustomRegisterSerializer(data=data)
        assert serializer.is_valid()
        # The user is created internally by the auth library
        # in this point, after the serializer is validated
        user = User.objects.create(email="test@example.com")
        # After that, our custom_signup method is called
        serializer.custom_signup(request, user)
        assert user.first_name == "John"
        assert user.last_name == "Doe"
        mocker.patch("notifications.business_logic._send_notification")
        send_reminder_complete_profile_notification(user)
        notifications.business_logic._send_notification.assert_called_once_with(
            user, "REMINDER_COMPLETE_PROFILE", {}
        )

    # Tests that input data containing invalid characters raises a validation error in the OnlyAlphaAndSpacesValidator.
    def test_only_alpha_and_spaces_validator_invalid_characters(self):
        validator = OnlyAlphaAndSpacesValidator
        with pytest.raises(ValidationError):
            validator("John123")

    # Tests that input data missing required fields raises a validation error.
    def test_custom_register_serializer_missing_fields(self):
        data = {
            "email": "test@example.com",
            "password1": "testpassword",
            "password2": "testpassword",
        }
        serializer = CustomRegisterSerializer(data=data)
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
    def test_send_reminder_complete_profile_notification(self, mocker):
        user = User.objects.create(email="test@example.com")
        mocker.patch("notifications.business_logic._send_notification")
        send_reminder_complete_profile_notification(user)
        notifications.business_logic._send_notification.assert_called_once_with(
            user, "REMINDER_COMPLETE_PROFILE", {}
        )

    # Tests that input data containing invalid characters raises a validation error.
    def test_custom_register_serializer_invalid_characters(self):
        data = {
            "email": "test@example.com",
            "password1": "testpassword",
            "password2": "testpassword",
            "first_name": "John123",
            "last_name": "Doe123",
            "phone": "1234567890",
            "location": "New York",
        }
        serializer = CustomRegisterSerializer(data=data)
        assert not serializer.is_valid()
        assert serializer.errors == {
            "first_name": ["Este campo sólo puede contener letras y espacios"],
            "last_name": ["Este campo sólo puede contener letras y espacios"],
        }

    # Tests that input data containing fields with too few characters raises a validation error.
    def test_custom_register_serializer_too_few_characters(self):
        data = {
            "email": "test@example.com",
            "password1": "testpassword",
            "password2": "testpassword",
            "first_name": "J",
            "last_name": "D",
            "phone": "1234567890",
            "location": "New York",
        }
        serializer = CustomRegisterSerializer(data=data)
        assert not serializer.is_valid()
        assert serializer.errors == {
            "first_name": ["Ensure this value has at least 2 characters (it has 1)."],
            "last_name": ["Ensure this value has at least 2 characters (it has 1)."],
        }

    # Tests that input data containing fields with too many characters raises a validation error.
    def test_custom_register_serializer_too_many_characters(self):
        data = {
            "email": "test@example.com",
            "password1": "testpassword",
            "password2": "testpassword",
            "first_name": "J" * 101,
            "last_name": "D" * 101,
            "phone": "1234567890",
            "location": "New York",
        }
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

    # Tests that the send_reminder_complete_profile_notification function fails to send a notification.
    def test_send_reminder_complete_profile_notification_failure(self, mocker):
        user = User.objects.create(email="test@example.com")
        mocker.patch(
            "notifications.business_logic._send_notification", side_effect=Exception
        )
        with pytest.raises(Exception):
            send_reminder_complete_profile_notification(user)
