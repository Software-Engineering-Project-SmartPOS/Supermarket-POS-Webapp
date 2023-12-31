import { createSlice } from "@reduxjs/toolkit";

// Define the initial state
export const initialState = {
  selectedCustomer: null,
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
      state.salesItemsInput.push(action.payload);
      state.total += action.payload.item.item.sellingPrice;
    },
    removeSalesItem: (state, action) => {
      const itemIndex = state.salesItemsInput.findIndex((item) => item.stockLevelId === action.payload.stockLevelId);
      if (itemIndex !== -1) {
        state.salesItemsInput.splice(itemIndex, 1);
      }
    },
    updateQuantity: (state, action) => {
      const { stockLevelId, quantity } = action.payload;
      const item = state.salesItemsInput.find((item) => item.stockLevelId === stockLevelId);
      if (item) {
        // Update the quantity of the item
        item.quantity = quantity;

        // Recalculate the total based on the updated quantities
        state.total = state.salesItemsInput.reduce((acc, curr) => acc + curr.item.item.sellingPrice * curr.quantity, 0);
      }
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setPaymentType: (state, action) => {
      state.paymentType = action.payload;
    },

    setSelectedCustomer: (state, action) => {
      state.selectedCustomer = action.payload;
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

export const { setCustomerId, addSalesItem, removeSalesItem, setTotal, setPaymentType, resetCheckout, updateQuantity, setSelectedCustomer } =
  checkoutSlice.actions;

export default checkoutSlice.reducer;
