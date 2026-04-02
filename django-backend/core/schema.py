import graphene
from graphene.types.generic import GenericScalar

from core.models import MatchRadius, Profile, User
from core.services.copy_service import get_copy_data


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

    def resolve_copy(self, info):
        return get_copy_data()

    def resolve_profile(self, info, id):
        return Profile.objects.filter(id=id).first()

    def resolve_profile_by_email(self, info, email):
        user = User.objects.filter(email=email).select_related("profile").first()
        return user.profile if user else None


class UpsertProfile(graphene.Mutation):
    class Arguments:
        input = UpsertProfileInput(required=True)

    profile = graphene.Field(ProfileType)

    @staticmethod
    def mutate(root, info, input):
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

        user = User.objects.filter(email=input["email"]).select_related("profile").first()
        if user:
            profile = user.profile
            for key, value in profile_defaults.items():
                setattr(profile, key, value)
            profile.save()
        else:
            profile = Profile.objects.create(**profile_defaults)
            user = User.objects.create(
                email=input["email"],
                password=input.get("password") or "change-me",
                profile=profile,
            )

        return UpsertProfile(profile=user.profile)


class Mutation(graphene.ObjectType):
    upsert_profile = UpsertProfile.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
