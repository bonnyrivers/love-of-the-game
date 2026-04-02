// @ts-nocheck
import { GRAPHQL_URL } from "../graphqlUrl.ts";

const GENDER_MAP = {
  Man: "M",
  Woman: "F",
  "Non-binary": "NB",
  "Trans Female": "TF",
  "Trans Male": "TM",
  Other: "O",
};

const PROFESSION_MAP = {
  "Self-employed": "SE",
  WFH: "WFH",
  "In-office": "IO",
  Student: "ST",
  "Remote / freelance": "WFH",
  "Part-time": "HY",
};

function buildFallbackEmail(name) {
  const base = String(name || "demo")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${base || "demo"}@projectpilot.app`;
}

export async function upsertOnboardingProfile(state, avail) {
  const input = {
    email: state.email || buildFallbackEmail(state.name),
    firstName: state.name || "Unknown",
    lastName: state.lastName || "",
    age: state.age ? Number(state.age) : null,
    sign: state.sign || "",
    gender: GENDER_MAP[state.gender] || "O",
    openTo: state.seeking || [],
    profession: PROFESSION_MAP[state.profession] || "UE",
    radius: state.radius ? Number(state.radius) : 5,
    bucket: state.bucket || [],
    quickAnswers: state.quickAnswers || {},
    loveGive: state.loveGive || "",
    loveReceive: state.loveReceive || "",
    photoVerified: Boolean(state.photoVerified),
    profilePhotoUrl: state.profilePhotoUrl || "",
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

  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: mutation, variables: { input } }),
  });

  if (!response.ok) {
    throw new Error(`Profile save failed with status ${response.status}`);
  }

  const payload = await response.json();
  if (payload.errors?.length) {
    throw new Error(payload.errors[0].message || "Profile save failed");
  }

  const profile = payload.data?.upsertProfile?.profile || null;
  if (profile) {
    localStorage.setItem("pp_email", input.email);
  }
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
        matchRadius { miles }
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

  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { email } }),
  });

  if (!response.ok) return null;

  const payload = await response.json();
  if (payload.errors?.length) return null;

  const p = payload.data?.profileByEmail;
  if (!p) return null;

  // Map backend field names → frontend state shape
  return {
    email,
    name: p.firstName,
    lastName: p.lastName,
    age: p.age,
    sign: p.sign,
    gender: p.gender,
    seeking: p.openTo,
    profession: p.profession,
    radius: p.matchRadius?.miles,
    bucket: p.bucket,
    quickAnswers: p.quickAnswers,
    loveGive: p.loveGive,
    loveReceive: p.loveReceive,
    photoVerified: p.photoVerified,
    profilePhotoUrl: p.profilePhotoUrl,
    avail: p.availability,
  };
}
