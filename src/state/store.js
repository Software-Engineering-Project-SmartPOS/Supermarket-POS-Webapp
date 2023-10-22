import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./reducers/sideBar";
import customerReducer from "./reducers/customer";
import emplloyeeReducer from "./reducers/employee";
import salaryTypesReducer from "./reducers/salaryTypes";
import checkoutReducer from "./reducers/checkout";

export default configureStore({
  reducer: {
    sideBar: sidebarReducer,
    customer: customerReducer,
    employee: emplloyeeReducer,
    salaryType: salaryTypesReducer,
    checkout: checkoutReducer,
  },
});
