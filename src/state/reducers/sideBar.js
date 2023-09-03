import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSideBarOpen: false,
  activeTab: null,
};

const sidebarSlice = createSlice({
  name: "sideBar",
  initialState,
  reducers: {
    toggleSideBar: (state) => {
      state.isSideBarOpen = !state.isSideBarOpen;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const { toggleSideBar, setActiveTab } = sidebarSlice.actions;
export default sidebarSlice.reducer;
