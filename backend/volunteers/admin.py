from django.contrib import admin
from .models import Volunteer

# Admin panel me Volunteer table show karne ke liye
@admin.register(Volunteer)
class VolunteerAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'phone', 'status', 'created_at')
    search_fields = ('full_name', 'email')
    list_filter = ('status', 'created_at')
