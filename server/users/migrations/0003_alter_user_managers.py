# Generated by Django 4.2 on 2023-05-09 15:47

from django.db import migrations
import users.managers


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0002_remove_user_date_joined_user_created_at_and_more"),
    ]

    operations = [
        migrations.AlterModelManagers(
            name="user",
            managers=[
                ("objects", users.managers.UserManager()),
            ],
        ),
    ]