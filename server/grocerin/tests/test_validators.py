import pytest
from grocerin.validators import InadequateLanguageValidator
from rest_framework.serializers import ValidationError


# Tests that the constructor does not raise an error when the input value is not a curse word.
def test_constructor_with_non_curse_word():
    validator = InadequateLanguageValidator("hello")
    assert validator.value == "hello"


# Tests that the __call__ method raises an error when the input value is a curse word.
def test_call_with_curse_word():
    validator = InadequateLanguageValidator("")
    with pytest.raises(ValidationError):
        validator("puta")


# Tests that the constructor raises an error when the input value is a curse word in the same case as the list.
def test_constructor_with_curse_word_same_case():
    with pytest.raises(ValidationError):
        InadequateLanguageValidator("puta")


# Tests that the constructor raises an error when the input value is a curse word in a different case than the list.
@pytest.mark.parametrize(
    "curse",
    [
        "Puta",
        "putA",
        "PUTA",
    ],
)
def test_constructor_with_curse_word_different_case(curse: str):
    with pytest.raises(ValidationError):
        InadequateLanguageValidator(curse)


# Tests that the constructor does not raise an error when the input value is not a curse word.
@pytest.mark.parametrize(
    "curse", ["RePutaCion", "vehiculO", "Amputar", "perro", "mier", "miércoles"]
)
def test_constructor_with_curse_word(curse: str):
    validator = InadequateLanguageValidator(curse)
    assert validator.value == curse


# TODO: use parametrized tests for testing several inputs
# https://stackoverflow.com/questions/66867647/pytest-run-same-tests-for-different-sets-of-input-data


def test_constructor_with_empty_string():
    validator = InadequateLanguageValidator("")
    assert validator.value == ""


# Tests that the validator raises a ValidationError with the appropriate message and code when the input string contains only curse words.
def test_only_curse_words():
    with pytest.raises(ValidationError) as e:
        InadequateLanguageValidator("puta caca culo")
    assert (
        str(e.value)
        == "[ErrorDetail(string='Este campo contiene lenguaje inapropiado', code='inadequate_language')]"
    )
