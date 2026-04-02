// @ts-nocheck
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const HELLO_QUERY = gql`
  query {
    hello
  }
`;

export default function HelloGraphQL() {
  const { data, loading, error } = useQuery(HELLO_QUERY);
  console.log("GraphQL query result:", { data, loading, error });
  return <></>;
}
