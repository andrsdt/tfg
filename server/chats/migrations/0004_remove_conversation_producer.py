# Generated by Django 4.2.1 on 2023-05-18 22:13

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("chats", "0003_remove_conversation_initiator_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="conversation",
            name="producer",
        ),
    ]