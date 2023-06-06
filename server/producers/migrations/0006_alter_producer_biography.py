# Generated by Django 4.2.1 on 2023-05-24 17:34

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("producers", "0005_remove_producer_document"),
    ]

    operations = [
        migrations.AlterField(
            model_name="producer",
            name="biography",
            field=models.TextField(blank=True, default="", max_length=3000),
            preserve_default=False,
        ),
    ]