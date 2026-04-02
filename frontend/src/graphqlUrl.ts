// @ts-nocheck
const localGraphqlUrl = "http://127.0.0.1:8000/graphql/";

export const GRAPHQL_URL = import.meta.env.VITE_GRAPHQL_URL || localGraphqlUrl;
