from django.db import models
from products.managers import ProductManager


class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.IntegerField()
    description = models.TextField()
    image = models.ImageField(upload_to="products/images/")

    def __str__(self):
        return self.name

    objects = ProductManager()
