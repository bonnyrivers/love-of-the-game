import graphene
from django.contrib.auth import get_user_model
from django.db.models import Q
from graphene.types.generic import GenericScalar
from rest_framework.authtoken.models import Token

from core.models import MatchRadius, Profile
from core.services.copy_service import get_copy_data


def get_user_by_email(email):
    user_model = get_user_model()
    normalized_email = email.strip().lower()
    return (
        user_model.objects.filter(Q(username=normalized_email) | Q(email__iexact=normalized_email))
        .select_related("profile")
        .order_by("id")
        .first()
    )


def password_matches(user, raw_password):
    if user.check_password(raw_password):
        return True

    if user.password == raw_password:
        user.set_password(raw_password)
        user.save(update_fields=["password"])
        return True

    return False


def issue_auth_token(user):
    token, _ = Token.objects.get_or_create(user=user)
    return token


def get_token_from_request(info):
    request = getattr(info, "context", None)
    if request is None:
        return None

    auth_header = request.META.get("HTTP_AUTHORIZATION", "")
    if not auth_header.startswith("Bearer "):
        return None

    token_key = auth_header.split(" ", 1)[1].strip()
    if not token_key:
        return None

    return Token.objects.filter(key=token_key).select_related("user__profile").first()


def get_authenticated_profile(info):
    token = get_token_from_request(info)
    if not token:
        return None

    return getattr(token.user, "profile", None)


class MatchRadiusType(graphene.ObjectType):
    id = graphene.ID()
    min_radius = graphene.Int()
    max_radius = graphene.Int()
    unit = graphene.String()


class ProfileType(graphene.ObjectType):
    id = graphene.ID()
    first_name = graphene.String()
    last_name = graphene.String()
    age = graphene.Int()
    sign = graphene.String()
    gender = graphene.String()
    open_to = GenericScalar()
    profession = graphene.String()
    match_radius = graphene.Field(MatchRadiusType)
    bucket = GenericScalar()
    quick_answers = GenericScalar()
    love_give = graphene.String()
    love_receive = graphene.String()
    photo_verified = graphene.Boolean()
    profile_photo_url = graphene.String()
    availability = GenericScalar()


class UpsertProfileInput(graphene.InputObjectType):
    email = graphene.String(required=True)
    password = graphene.String()
    first_name = graphene.String(required=True)
    last_name = graphene.String()
    age = graphene.Int()
    sign = graphene.String()
    gender = graphene.String()
    open_to = GenericScalar()
    profession = graphene.String()
    radius = graphene.Int()
    bucket = GenericScalar()
    quick_answers = GenericScalar()
    love_give = graphene.String()
    love_receive = graphene.String()
    photo_verified = graphene.Boolean()
    profile_photo_url = graphene.String()
    availability = GenericScalar()


class Query(graphene.ObjectType):
    hello = graphene.String(default_value="Hello, world!")
    copy = GenericScalar()
    profile = graphene.Field(ProfileType, id=graphene.ID(required=True))
    profile_by_email = graphene.Field(ProfileType, email=graphene.String(required=True))
    current_profile = graphene.Field(ProfileType)

    def resolve_copy(self, info):
        return get_copy_data()

    def resolve_profile(self, info, id):
        return Profile.objects.filter(id=id).first()

    def resolve_profile_by_email(self, info, email):
        user = get_user_by_email(email)
        return user.profile if user else None

    def resolve_current_profile(self, info):
        return get_authenticated_profile(info)


class UpsertProfile(graphene.Mutation):
    class Arguments:
        input = UpsertProfileInput(required=True)

    profile = graphene.Field(ProfileType)
    auth_token = graphene.String()

    @staticmethod
    def mutate(root, info, input):
        user_model = get_user_model()
        normalized_email = input["email"].strip().lower()
        match_radius = None
        radius = input.get("radius")
        if radius is not None:
            match_radius, _ = MatchRadius.objects.get_or_create(
                min_radius=1,
                max_radius=radius,
                unit="MI",
            )

        profile_defaults = {
            "first_name": input["first_name"],
            "last_name": input.get("last_name") or "",
            "age": input.get("age"),
            "sign": input.get("sign") or "",
            "gender": input.get("gender") or Profile._meta.get_field("gender").default,
            "open_to": input.get("open_to") or [],
            "profession": input.get("profession") or Profile._meta.get_field("profession").default,
            "match_radius": match_radius,
            "bucket": input.get("bucket") or [],
            "quick_answers": input.get("quick_answers") or {},
            "love_give": input.get("love_give") or "",
            "love_receive": input.get("love_receive") or "",
            "photo_verified": bool(input.get("photo_verified", False)),
            "profile_photo_url": input.get("profile_photo_url") or "",
            "availability": input.get("availability") or {},
        }

        user = get_user_by_email(normalized_email)
        if user:
            profile = getattr(user, "profile", None)
            if input.get("password"):
                user.set_password(input["password"])
            user.email = normalized_email
            user.username = normalized_email
            user.first_name = input["first_name"]
            user.last_name = input.get("last_name") or ""
            user.save(update_fields=["email", "username", "first_name", "last_name", "password"] if input.get("password") else ["email", "username", "first_name", "last_name"])

            if profile is None:
                profile = Profile.objects.create(user=user, **profile_defaults)
                return UpsertProfile(profile=profile)

            for key, value in profile_defaults.items():
                setattr(profile, key, value)
            profile.save()
        else:
            user = user_model.objects.create(
                username=normalized_email,
                email=normalized_email,
                first_name=input["first_name"],
                last_name=input.get("last_name") or "",
            )
            user.set_password(input.get("password") or "change-me")
            user.save(update_fields=["password"])
            profile = Profile.objects.create(user=user, **profile_defaults)

        token = issue_auth_token(user)

        return UpsertProfile(profile=profile, auth_token=token.key)


class SignIn(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    profile = graphene.Field(ProfileType)
    auth_token = graphene.String()

    @staticmethod
    def mutate(root, info, email, password):
        user = get_user_by_email(email)
        if not user or not password_matches(user, password):
            raise Exception("Invalid email or password.")

        token = issue_auth_token(user)
        return SignIn(profile=user.profile, auth_token=token.key)


class Logout(graphene.Mutation):
    ok = graphene.Boolean()

    @staticmethod
    def mutate(root, info):
        token = get_token_from_request(info)
        if token:
            token.delete()
        return Logout(ok=True)


class Mutation(graphene.ObjectType):
    upsert_profile = UpsertProfile.Field()
    sign_in = SignIn.Field()
    logout = Logout.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
