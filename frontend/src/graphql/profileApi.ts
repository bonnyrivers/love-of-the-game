// @ts-nocheck
import { GRAPHQL_URL } from '../graphqlUrl.ts';

const AUTH_TOKEN_KEY = 'pp_auth_token';

export function getStoredAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setStoredAuthToken(token) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearStoredAuthToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem('pp_email');
}

const GENDER_MAP = {
  Man: 'M',
  Woman: 'F',
  'Non-binary': 'NB',
  'Trans Female': 'TF',
  'Trans Male': 'TM',
  Other: 'O',
};

const PROFESSION_MAP = {
  'Self-employed': 'SE',
  WFH: 'WFH',
  'In-office': 'IO',
  Student: 'ST',
  'Remote / freelance': 'WFH',
  'Part-time': 'HY',
};

function mapProfileToState(profile, email) {
  return {
    email,
    name: profile.firstName,
    lastName: profile.lastName,
    age: profile.age,
    sign: profile.sign,
    gender: profile.gender,
    seeking: profile.openTo,
    profession: profile.profession,
    radius: profile.matchRadius?.maxRadius,
    bucket: profile.bucket,
    quickAnswers: profile.quickAnswers,
    loveGive: profile.loveGive,
    loveReceive: profile.loveReceive,
    photoVerified: profile.photoVerified,
    profilePhotoUrl: profile.profilePhotoUrl,
    avail: profile.availability,
  };
}

async function executeGraphQL(query, variables, options = {}) {
  const token = options.authToken ?? getStoredAuthToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const payload = await response.json();
  if (payload.errors?.length) {
    throw new Error(payload.errors[0].message || 'Request failed');
  }

  return payload.data;
}

function buildFallbackEmail(name) {
  const base = String(name || 'demo')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${base || 'demo'}@projectpilot.app`;
}

export async function registerUser({ name, email, password }) {
  const existingUser = await fetchProfileByEmail(email);
  if (existingUser) {
    throw new Error('An account with this email already exists.');
  }

  const mutation = `
    mutation RegisterUser($input: UpsertProfileInput!) {
      upsertProfile(input: $input) {
        authToken
        profile {
          id
          firstName
          lastName
        }
      }
    }
  `;

  const data = await executeGraphQL(mutation, {
    input: {
      email,
      password,
      firstName: name,
      lastName: '',
    },
  });

  const authToken = data?.upsertProfile?.authToken;
  const profile = data?.upsertProfile?.profile || null;
  if (!profile || !authToken) {
    throw new Error('Registration failed.');
  }

  setStoredAuthToken(authToken);

  return {
    authToken,
    profile: mapProfileToState(profile, email),
  };
}

export async function signInUser({ email, password }) {
  const mutation = `
    mutation SignIn($email: String!, $password: String!) {
      signIn(email: $email, password: $password) {
        authToken
        profile {
          id
          firstName
          lastName
          age
          sign
          gender
          openTo
          profession
          matchRadius {
            maxRadius
          }
          bucket
          quickAnswers
          loveGive
          loveReceive
          photoVerified
          profilePhotoUrl
          availability
        }
      }
    }
  `;

  const data = await executeGraphQL(mutation, { email, password });
  const authToken = data?.signIn?.authToken;
  const profile = data?.signIn?.profile;

  if (!profile || !authToken) {
    throw new Error('Invalid email or password.');
  }

  setStoredAuthToken(authToken);

  return {
    authToken,
    profile: mapProfileToState(profile, email),
  };
}

export async function fetchCurrentProfile() {
  const query = `
    query CurrentProfile {
      currentProfile {
        id
        firstName
        lastName
        age
        sign
        gender
        openTo
        profession
        matchRadius {
          maxRadius
        }
        bucket
        quickAnswers
        loveGive
        loveReceive
        photoVerified
        profilePhotoUrl
        availability
      }
    }
  `;

  let data;
  try {
    data = await executeGraphQL(query, {});
  } catch {
    return null;
  }

  const profile = data?.currentProfile;
  if (!profile) {
    clearStoredAuthToken();
    return null;
  }

  return mapProfileToState(profile, null);
}

export async function logoutUser() {
  const mutation = `
    mutation Logout {
      logout {
        ok
      }
    }
  `;

  try {
    await executeGraphQL(mutation, {});
  } finally {
    clearStoredAuthToken();
  }
}

export async function upsertOnboardingProfile(state, avail) {
  const input = {
    email: state.email || buildFallbackEmail(state.name),
    firstName: state.name || 'Unknown',
    lastName: state.lastName || '',
    age: state.age ? Number(state.age) : null,
    sign: state.sign || '',
    gender: GENDER_MAP[state.gender] || 'O',
    openTo: state.seeking || [],
    profession: PROFESSION_MAP[state.profession] || 'UE',
    radius: state.radius ? Number(state.radius) : 5,
    bucket: state.bucket || [],
    quickAnswers: state.quickAnswers || {},
    loveGive: state.loveGive || '',
    loveReceive: state.loveReceive || '',
    photoVerified: Boolean(state.photoVerified),
    profilePhotoUrl: state.profilePhotoUrl || '',
    availability: avail || {},
  };

  const mutation = `
    mutation UpsertProfile($input: UpsertProfileInput!) {
      upsertProfile(input: $input) {
        profile {
          id
          firstName
        }
      }
    }
  `;

  const data = await executeGraphQL(mutation, { input });
  const profile = data?.upsertProfile?.profile || null;
  return profile;
}

export async function fetchProfileByEmail(email) {
  const query = `
    query GetProfile($email: String!) {
      profileByEmail(email: $email) {
        id
        firstName
        lastName
        age
        sign
        gender
        openTo
        profession
        matchRadius {
          maxRadius
        }
        bucket
        quickAnswers
        loveGive
        loveReceive
        photoVerified
        profilePhotoUrl
        availability
      }
    }
  `;

  let data;
  try {
    data = await executeGraphQL(query, { email });
  } catch {
    return null;
  }

  const p = data?.profileByEmail;
  if (!p) return null;

  return mapProfileToState(p, email);
}
