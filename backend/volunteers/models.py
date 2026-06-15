from django.db import models

class Volunteer(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    skills = models.TextField(help_text="e.g., Teaching, Content Writing, Web Dev")
    availability = models.CharField(max_length=100, help_text="e.g., Weekends, Daily 2 hours")
    status = models.CharField(max_length=20, default="Pending") # Pending, Approved, etc.
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} ({self.email})"