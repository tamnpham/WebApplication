# Generated by Django 3.2.7 on 2021-09-22 17:44

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_user_email'),
    ]

    operations = [
        migrations.CreateModel(
            name='Categories',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField()),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Questions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField()),
                ('description', models.TextField()),
                ('choices', django.contrib.postgres.fields.ArrayField(base_field=models.TextField(blank=True), size=None)),
                ('answer', models.TextField()),
                ('level', models.IntegerField()),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.categories')),
            ],
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=512)),
                ('username', models.CharField(max_length=512, unique=True)),
                ('email', models.EmailField(max_length=512, unique=True)),
                ('password', models.CharField(max_length=512)),
                ('status', models.CharField(blank=True, max_length=512, null=True)),
                ('role', models.IntegerField(default=1)),
            ],
        ),
        migrations.DeleteModel(
            name='User',
        ),
    ]
