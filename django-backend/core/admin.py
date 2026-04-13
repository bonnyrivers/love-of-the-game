from django.contrib import admin
from .models import MatchRadius, Profile
# Admin site registrations for the models

@admin.register(MatchRadius)
class MatchRadiusAdmin(admin.ModelAdmin):
    list_display = ('min_radius', 'max_radius', 'unit')

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'age', 'gender', 'profession', 'photo_verified', 'user')
