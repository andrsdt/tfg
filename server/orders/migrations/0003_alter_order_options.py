# Generated by Django 4.2.1 on 2023-05-21 20:07

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("orders", "0002_alter_order_total_price"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="order",
            options={"ordering": ["-created_at"]},
        ),
    ]
