import { GET_ALL_EMPLOYEES } from "../../graphql/employees";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../ApolloClient";

export const fetchEmployees = createAsyncThunk("employee/fetchEmployees", async () => {
  const { data } = await client.query({
    query: GET_ALL_EMPLOYEES,
  });
  console.log(data);
  return data.allEmployees;
});
const initialState = {
  employees: [],
  selectedEmployee: null,
  loading: false,
  error: null,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
