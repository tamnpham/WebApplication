# Generated by Django 3.2.7 on 2021-11-30 12:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('quizzes', '0006_alter_result_score'),
    ]

    operations = [
        migrations.RenameField(
            model_name='result',
            old_name='n_corrects',
            new_name='numberCorrects',
        ),
        migrations.RenameField(
            model_name='result',
            old_name='n_questions',
            new_name='numberQuestions',
        ),
    ]
