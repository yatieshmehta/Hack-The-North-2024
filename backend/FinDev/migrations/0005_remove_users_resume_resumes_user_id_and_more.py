# Generated by Django 5.0.3 on 2024-09-14 19:28

import FinDev.models
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('FinDev', '0004_alter_users_resume'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='users',
            name='resume',
        ),
        migrations.AddField(
            model_name='resumes',
            name='user_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='resumes',
            name='file',
            field=models.FileField(upload_to=FinDev.models.resume_path),
        ),
    ]
