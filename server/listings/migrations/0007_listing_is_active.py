# Generated by Django 4.2.1 on 2023-05-20 09:21

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("listings", "0006_alter_listing_g_per_unit"),
    ]

    operations = [
        migrations.AddField(
            model_name="listing",
            name="is_active",
            field=models.BooleanField(default=True),
        ),
    ]
