# Generated by Django 5.0.3 on 2024-09-14 19:29

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('FinDev', '0005_remove_users_resume_resumes_user_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resumes',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
