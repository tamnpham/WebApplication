# Generated by Django 3.2.7 on 2021-12-04 19:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0011_alter_question_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='code',
            field=models.CharField(blank=True, max_length=30, null=True, verbose_name='Code'),
        ),
    ]
