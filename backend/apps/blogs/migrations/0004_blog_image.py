# Generated by Django 3.2.7 on 2021-11-29 05:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blogs', '0003_alter_blog_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='image',
            field=models.ImageField(blank=True, max_length=255, null=True, upload_to='', verbose_name='Image'),
        ),
    ]