# Generated by Django 4.2.1 on 2023-05-19 17:55

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("chats", "0007_rename_message_type_message_type"),
    ]

    operations = [
        migrations.RenameField(
            model_name="message",
            old_name="type",
            new_name="message_type",
        ),
    ]
