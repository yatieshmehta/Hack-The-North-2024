# Generated by Django 5.0.3 on 2024-09-15 06:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('FinDev', '0013_alter_message_options_remove_chat_id_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='users',
            name='github',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='users',
            name='linkedin',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
