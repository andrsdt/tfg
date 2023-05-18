# Generated by Django 4.2.1 on 2023-05-18 13:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Notification",
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
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "category",
                    models.CharField(
                        choices=[
                            ("USER_CHAT_MESSAGE", "USER_CHAT_MESSAGE"),
                            ("USER_NEW_LISTING", "USER_NEW_LISTING"),
                            ("USER_NEW_REVIEW", "USER_NEW_REVIEW"),
                            ("USER_NEW_LIKE", "USER_NEW_LIKE"),
                            ("USER_NEW_OFFER", "USER_NEW_OFFER"),
                        ],
                        max_length=64,
                    ),
                ),
                ("data", models.JSONField()),
                ("is_read", models.BooleanField(default=False)),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
    ]
