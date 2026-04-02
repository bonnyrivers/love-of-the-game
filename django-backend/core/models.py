from uuid import uuid4

from django.db import models


class Gender(models.TextChoices):
    MALE = "M", "Male"
    FEMALE = "F", "Female"
    NON_BINARY = "NB", "Non-binary"
    TRANS_FEMALE = "TF", "Trans Female"
    TRANS_MALE = "TM", "Trans Male"
    OTHER = "O", "Other"

    def __str__(self):
        return self.label 


class OpenTo(models.TextChoices):
    MEN = "M", "Men"
    WOMEN = "W", "Women"
    EVERYONE = "E", "Everyone" 

    def __str__(self):
        return self.label   

class Profession(models.TextChoices):
    SELF_EMPLOYED = "SE", "Self-employed"
    WORK_FROM_HOME = "WFH", "Work from home"
    HYBRID = "HY", "Hybrid"
    IN_OFFICE = "IO", "In-office"
    UNEMPLOYED = "UE", "Unemployed"
    STUDENT = "ST", "Student"

    def __str__(self):
        return self.label

# Radius in kilometers or miles, depending on the unit specified
class MatchRadius(models.Model):
    min_radius = models.IntegerField()
    max_radius = models.IntegerField()
    unit = models.CharField(max_length=2, choices=[("KM", "Kilometers"), ("MI", "Miles")], default="MI")

    def __str__(self):
        return f"{self.min_radius}-{self.max_radius} {self.unit}"

class Profile (models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30, blank=True, default="")
    age = models.PositiveSmallIntegerField(null=True, blank=True)
    sign = models.CharField(max_length=20, blank=True, default="")
    gender = models.CharField(max_length=2, choices=Gender.choices, default=Gender.OTHER)
    open_to = models.JSONField(default=list)
    profession = models.CharField(max_length=3, choices=Profession.choices, default=Profession.UNEMPLOYED)
    match_radius = models.ForeignKey(MatchRadius, on_delete=models.SET_NULL, null=True)
    bucket = models.JSONField(default=list)
    quick_answers = models.JSONField(default=dict)
    love_give = models.CharField(max_length=80, blank=True, default="")
    love_receive = models.CharField(max_length=80, blank=True, default="")
    photo_verified = models.BooleanField(default=False)
    profile_photo_url = models.URLField(blank=True, default="")
    availability = models.JSONField(default=dict)

    def __str__(self):
        return self.first_name
    
class User (models.Model):
    uuid = models.UUIDField(default=uuid4, editable=False, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  # In a real application, use Django's built-in User model and password hashing
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)

    def __str__(self):
        return self.email