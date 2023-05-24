from django.db import models


class ReviewManager(models.Manager):
    def from_user(self, user):
        return self.filter(order__listing__producer__user=user)
