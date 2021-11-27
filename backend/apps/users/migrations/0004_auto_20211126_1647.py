# Generated by Django 3.2.7 on 2021-11-26 09:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_user_avatar'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='major',
            field=models.CharField(choices=[('Information Security', 'Khoa học máy tính'), ('Computer Networks and Data Communications', 'Mạng máy tính và truyền thông'), ('Information Security', 'An toàn thông tin')], default='Information Security', max_length=255, verbose_name='Major'),
        ),
        migrations.AddField(
            model_name='user',
            name='school',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='School'),
        ),
    ]