// @ts-nocheck
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { HttpLink } from "@apollo/client/link/http";
import { GRAPHQL_URL } from "./graphqlUrl.ts";
import { loadCopy } from "./copy.ts";

const client = new ApolloClient({
  link: new HttpLink({ uri: GRAPHQL_URL }),
  cache: new InMemoryCache(),
});

await loadCopy();
const { default: App } = await import("./App.tsx");

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
);

export default App;
