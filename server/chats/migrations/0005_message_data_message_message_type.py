# Generated by Django 4.2.1 on 2023-05-19 10:42

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("chats", "0004_remove_conversation_producer"),
    ]

    operations = [
        migrations.AddField(
            model_name="message",
            name="data",
            field=models.JSONField(default={}),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="message",
            name="message_type",
            field=models.CharField(
                choices=[
                    ("TEXT_MESSAGE", "TEXT_MESSAGE"),
                    ("LOCATION_MESSAGE", "LOCATION_MESSAGE"),
                    ("REMINDER_REVIEW", "REMINDER_REVIEW"),
                    ("REPORT_CONFIRMATION", "REPORT_CONFIRMATION"),
                ],
                default="TEXT_MESSAGE",
                max_length=64,
            ),
            preserve_default=False,
        ),
    ]
