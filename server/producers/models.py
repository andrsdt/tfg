from django.conf import settings
from django.db import models
from producers.managers import ProducerManager


class Producer(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, primary_key=True
    )
    # TODO: allow producers to edit their biography
    biography = models.TextField(blank=True, max_length=3000)

    objects = ProducerManager()

    def __str__(self):
        # Pedro Cavaco (pedro@mail.com)
        return f"{self.user.first_name} {self.user.last_name} ({self.user.email})"
