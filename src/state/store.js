import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./reducers/sideBar";
import customerReducer from "./reducers/customer";
import emplloyeeReducer from "./reducers/employee";

export default configureStore({
  reducer: {
    sideBar: sidebarReducer,
    customer: customerReducer,
    employee: emplloyeeReducer,
  },
});
