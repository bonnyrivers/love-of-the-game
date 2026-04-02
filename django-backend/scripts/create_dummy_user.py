from core.models import MatchRadius, Profile, User


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
profile.save()

user, created_user = User.objects.get_or_create(
    email="dummy@projectpilot.app",
    defaults={"password": "dummy1234", "profile": profile},
)
user.profile = profile
user.password = "dummy1234"
user.save()

print(
    {
        "email": user.email,
        "password": "dummy1234",
        "profile_id": profile.id,
        "created_user": created_user,
        "created_profile": created_profile,
    }
)
