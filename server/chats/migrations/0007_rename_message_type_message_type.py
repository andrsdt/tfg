# Generated by Django 4.2.1 on 2023-05-19 17:54

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("chats", "0006_alter_message_data"),
    ]

    operations = [
        migrations.RenameField(
            model_name="message",
            old_name="message_type",
            new_name="type",
        ),
    ]