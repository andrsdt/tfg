from rest_framework.serializers import ValidationError


class OnlyAlphaAndSpacesValidator:
    def __init__(self, value):
        self.value = value
        self.__call__(value)

    def __call__(self, value):
        if not value.replace(" ", "").isalpha():
            message = "Este campo sólo puede contener letras y espacios"
            code = "only_alpha_and_spaces"
            raise ValidationError(message, code=code)


class InadequateLanguageValidator:
    CURSE_WORDS = ["mierda", "puta", "caca", "culo", "polla", "coño", "joder"]

    def __init__(self, value):
        self.value = value
        self.__call__(value)

    def __call__(self, value):
        for word in value.split(" "):
            if any(curse_word in word.lower() for curse_word in self.CURSE_WORDS):
                message = "Este campo contiene lenguaje inapropiado"
                code = "inadequate_language"
                raise ValidationError(message, code=code)
