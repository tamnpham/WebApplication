# Generated by Django 3.2.7 on 2021-11-27 09:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0008_auto_20211127_1445'),
        ('quizzes', '0003_remove_quiz_n_questions'),
    ]

    operations = [
        migrations.AlterField(
            model_name='result',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='questions.category', verbose_name='Category'),
        ),
    ]