import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./reducers/sideBar";
import customerReducer from "./reducers/customer";

export default configureStore({
  reducer: {
    sideBar: sidebarReducer,
    customer: customerReducer,
  },
});
