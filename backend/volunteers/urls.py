from django.urls import path
from .views import VolunteerCreateView, VolunteerListView

urlpatterns = [
    # POST request aayegi yahan: http://127.0.0.1:8000/api/volunteers/register/
    path('register/', VolunteerCreateView.as_view(), name='volunteer-register'),
    
    # GET request aayegi yahan: http://127.0.0.1:8000/api/volunteers/list/
    path('list/', VolunteerListView.as_view(), name='volunteer-list'),
]