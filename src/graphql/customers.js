//queries and mutation related with customers
import gql from "graphql-tag";

export const GET_ALL_CUSTOMERS = gql`
  query AllCustomer {
    allCustomer {
      id
      name
      telephone
      email
      customerType
      loyaltyId
      createdDate
      firstVisited
      lastVisited
    }
  }
`;

export const ADD_CUSTOMER = gql`
  mutation AddCustomer($customerInput: CustomerInput!) {
    addCustomer(customerInput: $customerInput) {
      id
      name
      telephone
      email
      customerType
      loyaltyId
      createdDate
      firstVisited
      lastVisited
    }
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer($customerUpdateInput: CustomerInput!) {
    updateCustomer(customerUpdateInput: $customerUpdateInput) {
      id
      name
      telephone
    }
  }
`;

export const GET_ALL_LOYALTY_PROGRAMS = gql`
  query GetAllLoyaltyPrograms {
    getAllLoyaltyPrograms {
      id
      loyaltyProgramName
      description
      pointsThreshold
      discountPercentage
    }
  }
`;

export const ADD_LOYALTY_PROGRAM = gql`
  mutation CreateLoyaltyProgram($newProgramInput: LoyaltyProgramInput!) {
    createLoyaltyProgram(newProgramInput: $newProgramInput) {
      id
      loyaltyProgramName
      description
      pointsThreshold
      discountPercentage
    }
  }
`;

export const UPDATE_LOYALTY_PROGRAM = gql`
  mutation UpdateLoyaltyProgram($updateDetail: LoyaltyProgramInput!) {
    updateLoyaltyProgram(updateDetail: $updateDetail) {
      id
      loyaltyProgramName
      description
      pointsThreshold
      discountPercentage
    }
  }
`;
