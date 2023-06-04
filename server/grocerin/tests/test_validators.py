import pytest
from grocerin.validators import InadequateLanguageValidator
from rest_framework.serializers import ValidationError


# Tests that the constructor does not raise an error when the input value is not a curse word.
def test_constructor_with_non_curse_word():
    validator = InadequateLanguageValidator("hello")
    assert validator.value == "hello"


# Tests that the constructor raises an error when the input value is a curse word in the same case as the list.
def test_constructor_with_curse_word_same_case():
    with pytest.raises(ValidationError):
        InadequateLanguageValidator("puta")


# Tests that the constructor raises an error when the input value is a curse word with additional characters.
def test_constructor_with_curse_word_additional_characters():
    with pytest.raises(ValidationError):
        InadequateLanguageValidator("puta123")


# Tests that the constructor does not raise an error when the input value is an empty string.
def test_constructor_with_empty_string():
    validator = InadequateLanguageValidator("")
    assert validator.value == ""


# Tests that the validator catches curse words with different capitalization.
def test_different_capitalization():
    validator = InadequateLanguageValidator("ThIs iS a s3nTeNc3...")
    assert validator.value == "ThIs iS a s3nTeNc3..."


# Tests that the validator raises a ValidationError with the appropriate message and code when the input string contains only curse words.
def test_only_curse_words():
    with pytest.raises(ValidationError) as e:
        InadequateLanguageValidator("puta caca culo")
    assert (
        str(e.value)
        == "[ErrorDetail(string='Este campo contiene lenguaje inapropiado', code='inadequate_language')]"
    )


# Tests that the __call__ method raises an error when the input value is a curse word.
def test_call_with_curse_word():
    validator = InadequateLanguageValidator("")
    with pytest.raises(ValidationError):
        validator("puta")
