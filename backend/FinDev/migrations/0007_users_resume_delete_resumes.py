# Generated by Django 5.0.3 on 2024-09-14 19:33

import FinDev.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('FinDev', '0006_alter_resumes_user_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='users',
            name='resume',
            field=models.FileField(default=1, upload_to=FinDev.models.resume_path),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='Resumes',
        ),
    ]
