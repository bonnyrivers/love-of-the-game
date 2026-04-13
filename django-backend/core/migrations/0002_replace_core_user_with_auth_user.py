from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


def migrate_core_users_to_auth(apps, schema_editor):
    AuthUser = apps.get_model("auth", "User")
    LegacyUser = apps.get_model("core", "User")

    for legacy_user in LegacyUser.objects.select_related("profile").order_by("id"):
        normalized_email = legacy_user.email.strip().lower()
        auth_user, _ = AuthUser.objects.get_or_create(
            username=normalized_email,
            defaults={
                "email": normalized_email,
                "password": legacy_user.password,
                "first_name": legacy_user.profile.first_name,
                "last_name": legacy_user.profile.last_name,
            },
        )

        fields_to_update = []
        if auth_user.email != normalized_email:
            auth_user.email = normalized_email
            fields_to_update.append("email")
        if auth_user.password != legacy_user.password:
            auth_user.password = legacy_user.password
            fields_to_update.append("password")
        if auth_user.first_name != legacy_user.profile.first_name:
            auth_user.first_name = legacy_user.profile.first_name
            fields_to_update.append("first_name")
        if auth_user.last_name != legacy_user.profile.last_name:
            auth_user.last_name = legacy_user.profile.last_name
            fields_to_update.append("last_name")
        if fields_to_update:
            auth_user.save(update_fields=fields_to_update)

        legacy_user.profile.user_id = auth_user.id
        legacy_user.profile.save(update_fields=["user"])


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("core", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="profile",
            name="user",
            field=models.OneToOneField(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="profile",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.RunPython(migrate_core_users_to_auth, migrations.RunPython.noop),
        migrations.DeleteModel(
            name="User",
        ),
    ]