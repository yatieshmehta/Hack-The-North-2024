# Generated by Django 5.1.1 on 2024-09-14 18:13

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('FinDev', '0002_alter_users_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='users',
            name='resume',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='FinDev.resumes'),
            preserve_default=False,
        ),
    ]
