import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [], // You can initialize this array with your initial transactions data
  selectedTransaction: null,
  // Add other state variables you need for the checkout system
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      // Add a new transaction to the transactions array
      state.transactions.push(action.payload);
    },
    removeTransaction: (state, action) => {
      // Remove a transaction from the transactions array based on some criteria
      state.transactions = state.transactions.filter((transaction) => {
        // Return true to keep the transaction, false to remove it
        // You can use some criteria to identify the transaction you want to remove
        return transaction.id !== action.payload;
      });
    },
    selectTransaction: (state, action) => {
      // Set the selectedTransaction to the one specified in the action payload
      state.selectedTransaction = action.payload;
    },
    // Add other reducers for updating state as needed
  },
});

export const {
  addTransaction,
  removeTransaction,
  selectTransaction,
  // Export other actions as needed
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
