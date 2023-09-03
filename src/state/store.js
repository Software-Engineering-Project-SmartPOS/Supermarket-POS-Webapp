import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./reducers/sideBar";

export default configureStore({
  reducer: {
    sideBar: sidebarReducer,
  },
});
