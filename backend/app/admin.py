from django.contrib import admin
from app.models import Users, Categories, Questions

# Register your models here.

admin.site.register(Users)
admin.site.register(Categories)
admin.site.register(Questions)