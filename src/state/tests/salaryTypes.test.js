import { configureStore } from "@reduxjs/toolkit";
import { fetchSalaryTypes, initialState } from "../reducers/salaryTypes";
import salaryTypesReducer from "../reducers/salaryTypes";
import client from "../../ApolloClient";

describe("salaryTypes slice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        salaryTypes: salaryTypesReducer,
      },
    });
  });

  it("should fetch salary types", async () => {
    // Mock the Apollo Client query function
    const mockQuery = jest.fn(() => ({
      data: {
        allSalaryTypes: ["Type1", "Type2", "Type3"],
      },
    }));
    client.query = mockQuery;

    await store.dispatch(fetchSalaryTypes());

    const state = store.getState().salaryTypes;
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.salaryTypes).toHaveLength(3);
    expect(state.salaryTypes).toEqual(["Type1", "Type2", "Type3"]);
  });

  it("should handle fetchSalaryTypes rejection", async () => {
    // Mock the Apollo Client query function to simulate an error
    const mockQuery = jest.fn(() => {
      throw new Error("API Error");
    });
    client.query = mockQuery;

    try {
      await store.dispatch(fetchSalaryTypes());
    } catch (error) {
      const state = store.getState().salaryTypes;
      expect(state.loading).toBe(false);
      expect(state.error).toBe("API Error");
      expect(state.salaryTypes).toHaveLength(0); // Ensure salaryTypes array is empty on rejection
    }
  });

  it("should have the initial state", () => {
    const state = store.getState().salaryTypes;
    expect(state).toEqual(initialState);
  });
});
