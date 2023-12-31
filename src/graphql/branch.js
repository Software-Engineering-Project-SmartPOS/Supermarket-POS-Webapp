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
  query GetAllBranch {
    getAllBranch {
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

export const DELETE_BRANCH = gql`
  mutation DeleteBranch($branchId: ID!) {
    deleteBranch(id: $branchId)
  }
`;

export const UPDATE_BRANCH = gql`
  mutation UpdateBranch($branchDetails: BranchInput!) {
    updateBranch(branchDetails: $branchDetails) {
      id
      name
      telephone
    }
  }
`;
