from django.contrib.auth.models import UserManager as NativeUserManager


class UserManager(NativeUserManager):
    # We don't need to override create() because in NativeUserManager
    # it already considers extra fields (first_name, last_name)
    pass
