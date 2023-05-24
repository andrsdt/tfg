# Generated by Django 4.2.1 on 2023-05-21 07:12

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("listings", "0007_listing_is_active"),
        ("users", "0009_alter_user_favorites"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="favorites",
            field=models.ManyToManyField(
                related_name="liked_by", to="listings.listing"
            ),
        ),
    ]
