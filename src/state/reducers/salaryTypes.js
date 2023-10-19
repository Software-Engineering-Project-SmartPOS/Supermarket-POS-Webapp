import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../ApolloClient";
import { GET_ALL_SALARY_TYPES } from "../../graphql/employees";

export const fetchSalaryTypes = createAsyncThunk("salaryTypes/fetchSalaryTypes", async () => {
  const { data } = await client.query({
    query: GET_ALL_SALARY_TYPES,
  });
  return data.allSalaryTypes;
});

export const initialState = {
  salaryTypes: [],
  loading: false,
  error: null,
};

const salaryTypesSlice = createSlice({
  name: "salaryTypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalaryTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalaryTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.salaryTypes = action.payload;
      })
      .addCase(fetchSalaryTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default salaryTypesSlice.reducer;
