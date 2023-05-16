from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _
from grocerin.mixins import TimestampsMixin
from users.managers import UserManager


class User(AbstractBaseUser, PermissionsMixin, TimestampsMixin):
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    email = models.EmailField(_("email address"), blank=True, unique=True)
    first_name = models.CharField(_("first name"), max_length=150, blank=True)
    last_name = models.CharField(_("last name"), max_length=150, blank=True)
    photo = models.ImageField(_("photo"), upload_to="users/", blank=True, null=True)
    # TODO: add location with PostGIS or something like that
    # https://raphael-leger.medium.com/django-handle-latitude-and-longitude-54a4bb2f6e3b
    is_staff = models.BooleanField(
        _("staff status"),
        default=False,
        help_text=_("Designates whether the user can log into this admin site."),
    )
    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_(
            "Designates whether this user should be treated as active. "
            "Unselect this instead of deleting accounts."
        ),
    )

    # TODO: implement permissions

    objects = UserManager()

    def get_full_name(self):
        """
        Return the first_name plus the last_name, with a space in between.
        """
        full_name = f"{self.first_name} {self.last_name}"
        return full_name.strip()

    def get_short_name(self):
        """Return the short name for the user."""
        return self.first_name

    @property
    def is_producer(self) -> bool:
        return hasattr(self, "producer")

    @property
    def is_consumer(self) -> bool:
        return hasattr(self, "consumer")

    def __str__(self):
        return self.email
