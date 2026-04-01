import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const HELLO_QUERY = gql`
  query {
    hello
  }
`;

export default function HelloGraphQL() {
  const { data, loading, error } = useQuery(HELLO_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <div>GraphQL says: {data.hello}</div>;
}
