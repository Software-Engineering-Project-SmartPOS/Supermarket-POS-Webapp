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

export const CREATE_ITEM = gql`
  mutation CreateItem($itemInput: ItemInput!) {
    CreateItem(itemInput: $itemInput) {
      id
      itemCode
      name
      barcodeNo
    }
  }
`;

export const UPDATE_ITEM = gql`
  mutation UpdateItem($itemDetail: ItemInput!) {
    UpdateItem(itemDetail: $itemDetail) {
      id
      itemCode
      name
      barcodeNo
      description
      unitOfMeasure
      createdAt
      updatedAt
      active
      reorderLevel
      returnable
    }
  }
`;

export const GET_ALL_ITEMS = gql`
  query GetAllItems {
    GetAllItems {
      id
      itemCode
      name
      barcodeNo
      unitOfMeasure
      active
      reorderLevel
      category {
        name
      }
      brand {
        name
      }
    }
  }
`;

export const CREATE_ITEM_SUPPLY = gql`
  mutation CreateItemSupply($itemSupplyInput: ItemSupplyInput!) {
    CreateItemSupply(itemSupplyInput: $itemSupplyInput) {
      id
      createdDate
      modifiedDate
      unitCost
      active
    }
  }
`;
