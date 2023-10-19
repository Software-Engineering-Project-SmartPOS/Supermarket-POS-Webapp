import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_ALL_CUSTOMERS } from "../../graphql/customers";
import client from "../../ApolloClient";
// Define an async thunk to fetch customers
export const fetchCustomers = createAsyncThunk("customer/fetchCustomers", async () => {
  const { data } = await client.query({
    query: GET_ALL_CUSTOMERS,
  });
  return data.allCustomer;
});

// Define the initial state using that type
export const initialState = {
  customers: [],
  selectedCustomer: null,
  loading: false,
  error: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    // Define any synchronous actions here
    addCustomer: (state, action) => {
      // Handle adding a customer to the state
      state.customers.push(action.payload);
    },
    // Define any other actions you need
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addCustomer } = customerSlice.actions;
export default customerSlice.reducer;
