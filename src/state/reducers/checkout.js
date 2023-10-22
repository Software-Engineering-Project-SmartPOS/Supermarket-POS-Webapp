import { createSlice } from "@reduxjs/toolkit";

// Define the initial state
export const initialState = {
  customerId: null,
  salesItemsInput: [],
  total: 0.0,
  paymentType: "CASH",
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
    addSalesItem: (state, action) => {
      console.log(action.payload.item.item.sellingPrice);
      state.salesItemsInput.push(action.payload);
      state.total += action.payload.item.item.sellingPrice;
    },
    removeSalesItem: (state, action) => {
      const itemIndex = state.salesItemsInput.findIndex((item) => item.stockLevelId === action.payload.stockLevelId);
      if (itemIndex !== -1) {
        state.salesItemsInput.splice(itemIndex, 1);
      }
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setPaymentType: (state, action) => {
      state.paymentType = action.payload;
    },
    resetCheckout: (state) => {
      state.barcodeNo = "";
      state.customerId = null;
      state.salesItemsInput = [];
      state.total = 0.0;
      state.paymentType = "CASH";
    },
  },
});

export const { setCustomerId, addSalesItem, removeSalesItem, setTotal, setPaymentType, resetCheckout } = checkoutSlice.actions;

export default checkoutSlice.reducer;
