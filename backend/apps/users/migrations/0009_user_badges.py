# Generated by Django 3.2.7 on 2021-12-12 07:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quizzes', '0009_auto_20211212_1447'),
        ('users', '0008_alter_user_major'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='badges',
            field=models.ManyToManyField(to='quizzes.Badge', verbose_name='Badge based on the highest score'),
        ),
    ]
