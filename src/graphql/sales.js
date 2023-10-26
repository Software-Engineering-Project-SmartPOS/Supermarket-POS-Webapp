import gql from "graphql-tag";

export const CREATE_SALE = gql`
  mutation CreateSales($salesInput: SaleInput!) {
    CreateSales(salesInput: $salesInput) {
      time
      total
      discount
      loyaltyPoints
      paymentType
    }
  }
`;
