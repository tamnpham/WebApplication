from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.postgres.fields import JSONField
from django.contrib.auth.models import AbstractUser
from app.userManager import CustomUserManager
# Create your models here.

# class User(models.Model):
#     name = models.CharField(null=False,blank=False, max_length=512)
#     username = models.CharField(null=False,blank=False, max_length=512, unique=True)
#     email = models.EmailField(null=False,blank=False, max_length=512, unique=True)
#     password = models.CharField(null=False,blank=False, max_length=512)
#     status = models.CharField(null=True,blank=True, max_length=512)
#     role = models.IntegerField(null=False, blank=False, default=1)
#     # USERNAME_FIELD = 'username'
#     # REQUIRED_FIELDS = []
#     # def __str__(self):
#     #     return self.username

# class User(AbstractUser):
#     last_login = None
#     is_staff = None
#     is_superuser = None
#     first_name = None
#     last_name = None
#     name = models.CharField(null=False,blank=False, max_length=512)
#     username = models.CharField(null=False,blank=False, max_length=512, unique=True)
#     email = models.EmailField(null=False,blank=False, max_length=512, unique=True)
#     status = models.CharField(null=True,blank=True, max_length=512)
#     role = models.IntegerField(null=False, blank=False, default=1)
#     USERNAME_FIELD = 'username'
#     REQUIRED_FIELDS = []

#     def __str__(self):
#         return self.username
#     class Meta:
#         db_table = 'User'
#     objects = CustomUserManager()

class Category(models.Model):
    title = models.TextField(null=False, blank=False)
    description = models.TextField(null=False, blank=False)

 
class Question(models.Model):
    title = models.TextField(null=False, blank=False)
    description = models.TextField(null=False, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    choices = models.JSONField(null=False, blank=False)
    answer = models.TextField(null=False,blank=False)
    level = models.IntegerField(null=True, blank=True)