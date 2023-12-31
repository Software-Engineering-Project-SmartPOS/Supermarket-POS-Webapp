import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  isSideBarOpen: false,
  selectedTab: {
    mainTab: "Sales",
    nestedTab: "Checkout",
  },
  activeTab: null,
};

const sidebarSlice = createSlice({
  name: "sideBar",
  initialState,
  reducers: {
    toggleSideBar: (state) => {
      state.isSideBarOpen = !state.isSideBarOpen;
      state.activeTab = null;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
  },
});

export const { toggleSideBar, setActiveTab, setSelectedTab } = sidebarSlice.actions;
export default sidebarSlice.reducer;
