import { configureStore } from "@reduxjs/toolkit";
import { toggleSideBar, setActiveTab, setSelectedTab, initialState } from "../reducers/sideBar";
import sidebarReducer from "../reducers/sideBar";
describe("sidebar slice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        sidebar: sidebarReducer,
      },
    });
  });

  it("should toggle the sidebar", () => {
    store.dispatch(toggleSideBar());

    const state = store.getState().sidebar;
    expect(state.isSideBarOpen).toBe(true);

    // Toggle it again
    store.dispatch(toggleSideBar());

    const newState = store.getState().sidebar;
    expect(newState.isSideBarOpen).toBe(false);
  });

  it("should set the active tab", () => {
    const tabName = "NewTab";
    store.dispatch(setActiveTab(tabName));

    const state = store.getState().sidebar;
    expect(state.activeTab).toBe(tabName);
  });

  it("should set the selected tab", () => {
    const selectedTab = {
      mainTab: "Inventory",
      nestedTab: "Products",
    };

    store.dispatch(setSelectedTab(selectedTab));

    const state = store.getState().sidebar;
    expect(state.selectedTab).toEqual(selectedTab);
  });

  it("should have the initial state", () => {
    const state = store.getState().sidebar;
    expect(state).toEqual(initialState);
  });
});
