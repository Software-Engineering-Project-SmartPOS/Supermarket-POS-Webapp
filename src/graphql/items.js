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

export const GET_ALL_BRANDS = gql`
  query GetAllBrands {
    GetAllBrands {
      id
      name
      description
      updateAt
      createAt
    }
  }
`;

export const CREATE_BRAND = gql`
  mutation CreateBrand($brandInput: BrandInput!) {
    CreateBrand(brandInput: $brandInput) {
      id
      name
      description
    }
  }
`;

export const UPDATE_BRAND = gql`
  mutation UpdateBrand($brandInput: BrandInput!) {
    UpdateBrand(brandInput: $brandInput) {
      id
      name
      description
    }
  }
`;
