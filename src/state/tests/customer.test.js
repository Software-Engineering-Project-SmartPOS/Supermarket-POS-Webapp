import { configureStore } from "@reduxjs/toolkit";
import { fetchCustomers, addCustomer, initialState } from "../reducers/customer";
import customerReducer from "../reducers/customer";
import client from "../../utils/ApolloClient";

describe("customer slice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        customer: customerReducer,
      },
    });
  });

  it("should add a customer", () => {
    const customer = { id: 1, name: "John Doe" };
    store.dispatch(addCustomer(customer));

    const state = store.getState().customer;
    expect(state.customers).toHaveLength(1);
    expect(state.customers[0]).toEqual(customer);
  });

  it("should fetch customers", async () => {
    // Mock the Apollo Client query function
    const mockQuery = jest.fn(() => ({
      data: {
        allCustomer: [
          { id: 1, name: "Customer 1" },
          { id: 2, name: "Customer 2" },
        ],
      },
    }));
    client.query = mockQuery;

    await store.dispatch(fetchCustomers());

    const state = store.getState().customer;
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.customers).toHaveLength(2);
  });

  it("should handle fetchCustomers rejection", async () => {
    // Mock the Apollo Client query function to simulate an error
    const mockQuery = jest.fn(() => {
      throw new Error("API Error");
    });
    client.query = mockQuery;

    try {
      await store.dispatch(fetchCustomers());
    } catch (error) {
      const state = store.getState().customer;
      expect(state.loading).toBe(false);
      expect(state.error).toBe("API Error");
      expect(state.customers).toHaveLength(0); // Ensure customers array is empty on rejection
    }
  });

  it("should have the initial state", () => {
    const state = store.getState().customer;
    expect(state).toEqual(initialState);
  });
});
