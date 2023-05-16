import re

from django.core.exceptions import ValidationError


class IsValidDocument:
    def __init__(self, value):
        self.value = value
        self.__call__(value)

    def __call__(self, value):
        if not is_valid_dni(value) and not is_valid_nif(value):
            message = "The document is not a valid DNI or NIF"
            code = "invalid_document"
            raise ValidationError(message, code=code)


def is_valid_dni(dni):
    return (
        bool(re.match(r"^\d{8}[A-Z]$", dni))
        and dni[8].upper() == "TRWAGMYFPDXBNJZSQVHLCKE"[int(dni[:8]) % 23]
    )


def is_valid_nif(nif):
    return bool(re.match(r"^[KLMXYZ]?\d{7}[A-Z]$", nif))
