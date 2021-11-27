# Generated by Django 3.2.7 on 2021-11-27 07:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_auto_20211126_1647'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='major',
            field=models.CharField(choices=[('Information Security', 'Information Security'), ('Computer Networks and Data Communications', 'Computer Networks and Data Communications'), ('Computer Science', 'Computer Science')], default='Information Security', max_length=255, verbose_name='Major'),
        ),
    ]