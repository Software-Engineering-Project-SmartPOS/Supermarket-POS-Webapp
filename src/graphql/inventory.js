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

export const UPDATE_ITEM_SUPPLY = gql`
  mutation UpdateItemSupply($itemSupplyInput: ItemSupplyInput!) {
    UpdateItemSupply(itemSupplyInput: $itemSupplyInput) {
      id
      createdDate
      modifiedDate
      unitCost
      active
    }
  }
`;

export const GET_ACTIVE_ITEM_SUPPLIES_BY_SUPPLIER_ID = gql`
  query GetActiveItemSuppliesBySupplierId($supplierId: ID!) {
    GetActiveItemSuppliesBySupplierId(supplierId: $supplierId) {
      id
      unitCost
      active
      supplier {
        id
        name
      }
      item {
        id
        name
        itemCode
      }
    }
  }
`;

export const GET_ACTIVE_ITEM_SUPPLIES_BY_ITEM_ID = gql`
  query GetActiveItemSuppliesByItemId($itemId: ID!) {
    GetActiveItemSuppliesByItemId(itemId: $itemId) {
      id
      unitCost
      active
      supplier {
        id
        name
      }
      item {
        id
        itemCode
        name
      }
    }
  }
`;

export const CREATE_PURCHASE_ORDER = gql`
  mutation CreatePurchaseOrder($purchaseOrderInput: PurchaseOrderInput!) {
    CreatePurchaseOrder(purchaseOrderInput: $purchaseOrderInput) {
      id
      orderedDate
      expectedDate
      description
      purchaseCost
      orderStatus
    }
  }
`;

export const GET_ALL_PURCHASE_ORDERS = gql`
  query AllPurchaseOrders {
    AllPurchaseOrders {
      id
      orderedDate
      expectedDate
      description
      purchaseCost
      orderStatus
      purchaseOrderItemList {
        id
        quantity
        totalCost
        receivedQuantity
        purchaseOrderItemStatus
        item {
          name
          unitOfMeasure
        }
      }
      supplier {
        id
        name
      }
      branch {
        id
        name
      }
    }
  }
`;

export const GET_PURCHASE_ORDER_BY_ID = gql`
  query PurchaseOrderById($id: ID!) {
    PurchaseOrderById(id: $id) {
      id
      purchaseOrderItemList {
        id
        quantity
        purchaseItemUnitCost
        totalCost
        receivedQuantity
        purchaseOrderItemStatus
        item {
          id
          name
          unitOfMeasure
        }
      }
    }
  }
`;
export const ADD_PURCHASE_ORDER_ITEM_ARRIVAL = gql`
  mutation PurchaseOrderItemArrival($arrivalDetails: PurchaseOrderItemArrivalInput!) {
    PurchaseOrderItemArrival(arrivalDetails: $arrivalDetails) {
      id
      quantity
      purchaseItemUnitCost
      totalCost
      receivedQuantity
      purchaseOrderItemStatus
    }
  }
`;
