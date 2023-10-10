import { gql } from "@apollo/client";

export const ADD_BRANCH = gql`
  mutation AddBranch($branchInputDetails: BranchInput!) {
    addBranch(branchInputDetails: $branchInputDetails) {
      id
      name
      telephone
    }
  }
`;

export const GET_ALL_BRANCHES = gql`
  query GetAllBranches {
    getAllBranches {
      id
      name
      telephone
      address {
        id
        houseNumber
        street
        city
        district
        postalCode
      }
    }
  }
`;
