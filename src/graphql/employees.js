//queries and mutation related with customers
import gql from "graphql-tag";

export const GET_EMPLOYEES = gql`
  query AllEmployees {
    allEmployees {
      id
      title
      firstName
      middleName
      lastName
      email
      number
      jobRole
      active
    }
  }
`;
