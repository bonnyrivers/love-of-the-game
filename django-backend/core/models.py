from django.conf import settings
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
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True, related_name="profile")

    def __str__(self):
        return self.first_name
