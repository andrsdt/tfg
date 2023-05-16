# Generated by Django 4.2 on 2023-05-15 00:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("producers", "0002_producer_document_producer_phone"),
    ]

    operations = [
        migrations.CreateModel(
            name="ListingImage",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("image", models.ImageField(upload_to="listing_images")),
            ],
        ),
        migrations.CreateModel(
            name="ProductAllergen",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "allergen",
                    models.CharField(
                        choices=[
                            ("LACTOSE", "lactose"),
                            ("WHEAT", "wheat"),
                            ("NUTS", "nuts"),
                            ("CELERY", "celery"),
                            ("CRUSTACEANS", "crustaceans"),
                            ("EGG", "egg"),
                            ("FISH", "fish"),
                            ("GLUTEN", "gluten"),
                            ("LUPINS", "lupins"),
                            ("MILK", "milk"),
                            ("MOLLUSKS", "mollusks"),
                            ("MUSTARD", "mustard"),
                            ("PEANUTS", "peanuts"),
                            ("SESAME", "sesame"),
                            ("SOYBEANS", "soybeans"),
                            ("SULPHITES", "sulphites"),
                        ],
                        max_length=30,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="ProductFeature",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "feature",
                    models.CharField(
                        choices=[
                            ("ALLOWS_DELIVERY", "allows_delivery"),
                            ("ALLOWS_PICKUP", "allows_pickup"),
                            ("IS_FROZEN", "is_frozen"),
                            ("IS_VEGAN", "is_vegan"),
                            ("IS_SUGAR_FREE", "is_sugar_free"),
                        ],
                        max_length=30,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Listing",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=100)),
                ("description", models.TextField(max_length=2000, null=True)),
                (
                    "unit",
                    models.CharField(
                        choices=[("KG", "kilogram"), ("UNIT", "unitary")], max_length=10
                    ),
                ),
                ("price_per_unit", models.DecimalField(decimal_places=2, max_digits=6)),
                ("kg_per_unit", models.DecimalField(decimal_places=2, max_digits=6)),
                ("available_quantity", models.PositiveIntegerField()),
                ("allergens", models.ManyToManyField(to="listings.productallergen")),
                ("features", models.ManyToManyField(to="listings.productfeature")),
                ("images", models.ManyToManyField(to="listings.listingimage")),
                (
                    "producer",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="producers.producer",
                    ),
                ),
            ],
        ),
    ]
