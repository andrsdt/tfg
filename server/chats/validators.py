from listings.models import Listing
from rest_framework.serializers import ValidationError
from users.models import User


def validate_is_listing_owner(consumer: User, listing: Listing):
    if consumer == listing.producer.user:
        raise ValidationError("No puedes iniciar una conversación contigo mismo")
