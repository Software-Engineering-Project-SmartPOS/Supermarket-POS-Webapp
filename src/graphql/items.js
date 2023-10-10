import gql from "graphql-tag";

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    GetAllCategories {
      id
      name
      description
      createAt
      updateAt
      updatedDate
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($categoryInput: CategoryInput!) {
    CreateCategory(categoryInput: $categoryInput) {
      id
      name
      description
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($categoryInput: CategoryInput!) {
    UpdateCategory(categoryInput: $categoryInput) {
      id
      name
      description
    }
  }
`;
