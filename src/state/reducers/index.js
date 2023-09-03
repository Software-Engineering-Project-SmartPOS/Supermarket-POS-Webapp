import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isAuth: false,
  user: {},
  error: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    loginPending: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = true;
      state.user = {
        email: payload.email,
        employee_no: payload.employee_no,
        first_name: payload.first_name,
        last_name: payload.last_name,
        mobile_number: payload.mobile_number,
        user_role: payload.user_role === "MANAGER" ? "Operation Manager" : "Distribution Officer",
        profile_picture: payload.profile_picture,
      };
      state.error = "";
    },
    loginFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { loginPending, loginSuccess, loginFail } = loginSlice.actions;

export default loginSlice.reducer;
