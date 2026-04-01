import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { HttpLink } from "@apollo/client/link/http";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:8000/graphql/" }),
  cache: new InMemoryCache(),
});

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);

export default App;