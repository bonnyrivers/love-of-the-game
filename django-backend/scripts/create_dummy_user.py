from django.contrib.auth import get_user_model

from core.models import MatchRadius, Profile


mr, _ = MatchRadius.objects.get_or_create(min_radius=1, max_radius=10, unit="MI")

profile_defaults = {
    "first_name": "Dummy",
    "last_name": "User",
    "age": 28,
    "sign": "Gemini",
    "gender": "O",
    "open_to": ["Everyone"],
    "profession": "WFH",
    "match_radius": mr,
    "bucket": ["Try a new restaurant", "Go to a concert"],
    "quick_answers": {"intent": "I want a real relationship"},
    "love_give": "Quality time, fully present",
    "love_receive": "Physical touch and closeness",
    "photo_verified": True,
    "profile_photo_url": "https://example.com/dummy.jpg",
    "availability": {"M-Eve": True, "Th-Night": True},
}

profile, created_profile = Profile.objects.get_or_create(
    first_name="Dummy",
    last_name="User",
    defaults=profile_defaults,
)

for key, value in profile_defaults.items():
    setattr(profile, key, value)
User = get_user_model()
user, created_user = User.objects.get_or_create(
    username="dummy@projectpilot.app",
    defaults={
        "email": "dummy@projectpilot.app",
        "first_name": profile.first_name,
        "last_name": profile.last_name,
    },
)
user.email = "dummy@projectpilot.app"
user.first_name = profile.first_name
user.last_name = profile.last_name
user.set_password("dummy1234")
user.save()

profile.user = user
profile.save()

print(
    {
        "email": user.email,
        "password": "dummy1234",
        "profile_id": profile.id,
        "created_user": created_user,
        "created_profile": created_profile,
    }
)
