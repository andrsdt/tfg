# Generated by Django 4.2.1 on 2023-05-20 09:21

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("chats", "0008_rename_type_message_message_type"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="message",
            options={"ordering": ("created_at",)},
        ),
    ]
