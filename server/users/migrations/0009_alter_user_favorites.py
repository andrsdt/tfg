# Generated by Django 4.2.1 on 2023-05-18 10:53

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("listings", "0006_alter_listing_g_per_unit"),
        ("users", "0008_user_favorites"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="favorites",
            field=models.ManyToManyField(related_name="users", to="listings.listing"),
        ),
    ]
