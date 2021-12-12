# Generated by Django 3.2.7 on 2021-12-12 07:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quizzes', '0008_badge'),
    ]

    operations = [
        migrations.AddField(
            model_name='badge',
            name='required_exams',
            field=models.IntegerField(default=0, verbose_name='Required exams to achieve the badge.'),
        ),
        migrations.AlterField(
            model_name='badge',
            name='required_points',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=7, verbose_name='Required points to achieve the badge.'),
        ),
    ]