from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.

class User(models.Model):
    name = models.CharField(null=False,blank=False, max_length=512)
    username = models.CharField(null=False,blank=False, max_length=512, unique=True)
    email = models.EmailField(null=False,blank=False, max_length=512, unique=True)
    password = models.CharField(null=False,blank=False, max_length=512)
    status = models.CharField(null=True,blank=True, max_length=512)
    role = models.IntegerField(null=False, blank=False, default=1)

class Category(models.Model):
    title = models.TextField(null=False, blank=False)
    description = models.TextField(null=False, blank=False)
 
class Question(models.Model):
    title = models.TextField(null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    choices = ArrayField(models.TextField(blank=True))
    answer = models.TextField(null=False,blank=False)
    level = models.IntegerField(null=True, blank=True)