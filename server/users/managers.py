from django.contrib.auth.models import UserManager as NativeUserManager


class UserManager(NativeUserManager):
    # We don't need to override create() because in NativeUserManager
    # it already considers extra fields (first_name, last_name)
    def create_superuser(self, email, password, first_name, last_name):
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            first_name=first_name,
            last_name=last_name,
            is_staff=True,
            is_superuser=True,
        )
        user.set_password(password)
        user.save()
        return user
