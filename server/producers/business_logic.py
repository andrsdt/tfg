from producers.models import Producer


def become_producer(user):
    """As a user, become a producer with all the consequences"""
    [producer, _] = Producer.objects.get_or_create(user=user)
    return producer
