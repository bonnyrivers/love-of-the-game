from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from django.test import RequestFactory, TestCase
from rest_framework.authtoken.models import Token

from core.models import Profile
from core.schema import schema


class AuthMutationTests(TestCase):
    def setUp(self):
        self.request_factory = RequestFactory()

    def test_upsert_profile_hashes_password_for_new_user(self):
        user_model = get_user_model()
        mutation = """
            mutation Register($input: UpsertProfileInput!) {
                upsertProfile(input: $input) {
                    authToken
                    profile {
                        id
                        firstName
                    }
                }
            }
        """

        result = schema.execute(
            mutation,
            variable_values={
                "input": {
                    "email": "new@example.com",
                    "password": "secret123",
                    "firstName": "Avery",
                }
            },
        )

        self.assertIsNone(result.errors)
        user = user_model.objects.get(username="new@example.com")
        self.assertNotEqual(user.password, "secret123")
        self.assertTrue(check_password("secret123", user.password))
        self.assertEqual(user.profile.first_name, "Avery")
        self.assertEqual(result.data["upsertProfile"]["authToken"], Token.objects.get(user=user).key)

    def test_sign_in_returns_profile_for_valid_credentials(self):
        user = get_user_model().objects.create_user(
            username="avery@example.com",
            email="avery@example.com",
            password="secret123",
            first_name="Avery",
        )
        Profile.objects.create(first_name="Avery", user=user)

        mutation = """
            mutation SignIn($email: String!, $password: String!) {
                signIn(email: $email, password: $password) {
                    authToken
                    profile {
                        id
                        firstName
                    }
                }
            }
        """

        result = schema.execute(
            mutation,
            variable_values={
                "email": "avery@example.com",
                "password": "secret123",
            },
        )

        self.assertIsNone(result.errors)
        self.assertEqual(result.data["signIn"]["profile"]["firstName"], "Avery")
        self.assertEqual(result.data["signIn"]["authToken"], Token.objects.get(user=user).key)

    def test_sign_in_rejects_invalid_credentials(self):
        user = get_user_model().objects.create(
            username="avery@example.com",
            email="avery@example.com",
            password="plaintext-password",
        )
        Profile.objects.create(first_name="Avery", user=user)

        mutation = """
            mutation SignIn($email: String!, $password: String!) {
                signIn(email: $email, password: $password) {
                    profile {
                        id
                    }
                }
            }
        """

        result = schema.execute(
            mutation,
            variable_values={
                "email": "avery@example.com",
                "password": "wrong-password",
            },
        )

        self.assertIsNotNone(result.errors)

    def test_sign_in_accepts_legacy_plaintext_password_and_rehashes(self):
        user = get_user_model().objects.create(
            username="legacy@example.com",
            email="legacy@example.com",
            password="legacy123",
        )
        Profile.objects.create(first_name="Avery", user=user)

        mutation = """
            mutation SignIn($email: String!, $password: String!) {
                signIn(email: $email, password: $password) {
                    profile {
                        id
                    }
                }
            }
        """

        result = schema.execute(
            mutation,
            variable_values={
                "email": "legacy@example.com",
                "password": "legacy123",
            },
        )

        self.assertIsNone(result.errors)
        user.refresh_from_db()
        self.assertNotEqual(user.password, "legacy123")
        self.assertTrue(check_password("legacy123", user.password))
        self.assertEqual(user.username, "legacy@example.com")

    def test_current_profile_uses_bearer_token(self):
        user = get_user_model().objects.create_user(
            username="token@example.com",
            email="token@example.com",
            password="secret123",
            first_name="Token",
        )
        Profile.objects.create(first_name="Token", user=user)
        token = Token.objects.create(user=user)
        request = self.request_factory.post("/graphql/", HTTP_AUTHORIZATION=f"Bearer {token.key}")

        query = """
            query CurrentProfile {
                currentProfile {
                    firstName
                }
            }
        """

        result = schema.execute(query, context_value=request)

        self.assertIsNone(result.errors)
        self.assertEqual(result.data["currentProfile"]["firstName"], "Token")

    def test_logout_deletes_token(self):
        user = get_user_model().objects.create_user(
            username="logout@example.com",
            email="logout@example.com",
            password="secret123",
        )
        Profile.objects.create(first_name="Logout", user=user)
        token = Token.objects.create(user=user)
        request = self.request_factory.post("/graphql/", HTTP_AUTHORIZATION=f"Bearer {token.key}")

        mutation = """
            mutation Logout {
                logout {
                    ok
                }
            }
        """

        result = schema.execute(mutation, context_value=request)

        self.assertIsNone(result.errors)
        self.assertTrue(result.data["logout"]["ok"])
        self.assertFalse(Token.objects.filter(key=token.key).exists())
