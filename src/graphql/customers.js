//queries and mutation related with customers
import gql from "graphql-tag";

export const GET_CUSTOMERS = gql`
  query {
    countries {
      name
      code
    }
  }
`;
