import { gql } from "@apollo/client";

export const GET_ALL_SUPPLIERS = gql`
  query GetAllSuppliers {
    GetAllSuppliers {
      id
      name
      landPhone
      mobilePhone
      email
      createdAt
      updatedAt
      active
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

export const ADD_SUPPLIER = gql`
  mutation AddSupplier($supplierInput: SupplierInput!) {
    AddSupplier(supplierInput: $supplierInput) {
      id
      name
      landPhone
      mobilePhone
      email
      branchId
      createdAt
      updatedAt
      active
    }
  }
`;

export const UPDATE_SUPPLIER = gql`
  mutation UpdateSupplier($supplierDetail: SupplierInput!) {
    UpdateSupplier(supplierDetail: $supplierDetail) {
      id
      name
      landPhone
      mobilePhone
      email
      branchId
      createdAt
      updatedAt
      active
    }
  }
`;
