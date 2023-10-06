//queries and mutation related with customers
import gql from "graphql-tag";

export const GET_ALL_CUSTOMERS = gql`
  query {
    allCustomer {
      id
      name
      telephone
      email
      addressId
      houseNumber
      street
      city
      district
      postalCode
      customerType
      loyaltyId
      createdDate
      firstVisited
      lastVisited
    }
  }
`;
