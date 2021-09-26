from django.contrib import admin
from app.models import User, Category, Question

# Register your models here.

admin.site.register(User)
admin.site.register(Category)
admin.site.register(Question)