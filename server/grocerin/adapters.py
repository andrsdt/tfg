from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from authentication.serializers import CustomRegisterSerializer
from users.models import User


class SocialAccountAdapter(DefaultSocialAccountAdapter):
    def __init__(self, request=None):
        self.request = request
        super().__init__(request)

    def serialize_instance(self, instance):
        if isinstance(instance, User):
            return CustomRegisterSerializer(instance).data

        return super().serialize_instance(instance)

    def save_user(self, request, sociallogin, form=None):
        return super().save_user(request, sociallogin, form)
