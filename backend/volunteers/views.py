from rest_framework import generics
from .models import Volunteer
from .serializers import VolunteerSerializer

# 1. API to register a new volunteer (Frontend ka form ye API hit karega)
class VolunteerCreateView(generics.CreateAPIView):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer

# 2. API to get all volunteers (Admin dashboard ye API hit karega)
class VolunteerListView(generics.ListAPIView):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer