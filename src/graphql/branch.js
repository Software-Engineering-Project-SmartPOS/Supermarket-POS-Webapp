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
