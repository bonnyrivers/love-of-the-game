// @ts-nocheck
const copy = {};

let loaded = false;

export async function loadCopy() {
  if (loaded) return copy;

  const response = await fetch("http://127.0.0.1:8000/graphql/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query CopyPayload { copy }`,
    }),
  });

  if (!response.ok) {
    throw new Error(`Copy request failed with status ${response.status}`);
  }

  const payload = await response.json();
  const data = payload?.data?.copy;

  if (!data || typeof data !== "object") {
    throw new Error("Copy payload missing from GraphQL response");
  }

  Object.assign(copy, data);
  loaded = true;
  return copy;
}

export default copy;
