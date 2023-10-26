import { configureStore } from "@reduxjs/toolkit";
import { fetchEmployees, addEmployee, initialState, employeeReducer } from "../reducers/employee";
import client from "../../utils/ApolloClient";

describe("employee slice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        employee: employeeReducer,
      },
    });
  });

  it("should add an employee", () => {
    const employee = { id: 1, name: "John Doe" };
    store.dispatch(addEmployee(employee));

    const state = store.getState().employee;
    expect(state.employees).toHaveLength(1);
    expect(state.employees[0]).toEqual(employee);
  });

  it("should fetch employees", async () => {
    // Mock the Apollo Client query function
    const mockQuery = jest.fn(() => ({
      data: {
        allEmployees: [
          { id: 1, name: "Employee 1" },
          { id: 2, name: "Employee 2" },
        ],
      },
    }));
    client.query = mockQuery;

    await store.dispatch(fetchEmployees());

    const state = store.getState().employee;
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.employees).toHaveLength(2);
  });

  it("should handle fetchEmployees rejection", async () => {
    // Mock the Apollo Client query function to simulate an error
    const mockQuery = jest.fn(() => {
      throw new Error("API Error");
    });
    client.query = mockQuery;

    try {
      await store.dispatch(fetchEmployees());
    } catch (error) {
      const state = store.getState().employee;
      expect(state.loading).toBe(false);
      expect(state.error).toBe("API Error");
      expect(state.employees).toHaveLength(0); // Ensure employees array is empty on rejection
    }
  });

  it("should have the initial state", () => {
    const state = store.getState().employee;
    expect(state).toEqual(initialState);
  });
});
