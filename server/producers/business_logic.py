from django.db import transaction
from producers.models import Producer


@transaction.atomic
def become_producer(user, document, phone):
    """As a user, become a producer with all the consequences"""
    return Producer.objects.get_or_create(user=user, document=document, phone=phone)
