from django.core.validators import ValidationError


class OnlyAlphaValidator:
    message = "This field must contain only letters."
    code = "invalid"

    def __init__(self, message=None, code=None):
        if message is not None:
            self.message = message
        if code is not None:
            self.code = code

    def __call__(self, value):
        if not value.isalpha():
            raise ValidationError(self.message, code=self.code)
