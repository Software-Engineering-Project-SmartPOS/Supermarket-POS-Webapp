//queries and mutation related with customers
import gql from "graphql-tag";

export const GET_ALL_EMPLOYEES = gql`
  query GetAllEmployees {
    allEmployees {
      id
      title
      firstName
      middleName
      lastName
      email
      number
      jobRole
      active
    }
  }
`;

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee($employeeInput: EmployeeInput!) {
    addEmployee(employeeInput: $employeeInput) {
      id
      title
      firstName
      middleName
      lastName
      branch {
        id
        name
      }
      email
      address {
        id
        houseNumber
        street
        city
        district
        postalCode
      }
      number
      jobRole
      salaryType {
        id
        basicSalary
        halfDaySalary
        overTimeSalary
        bonus
        # Include other salary type fields you need
      }
      active
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_SALARY_TYPES = gql`
  query GetAllSalaryTypes {
    allSalaryTypes {
      id
      basicSalary
      halfDaySalary
      overTimeSalary
      bonus
    }
  }
`;

export const REGISTER_OWNER = gql`
  mutation RegisterOWner($employeeInput: EmployeeInput!) {
    registerOwner(ownerDetail: $employeeInput)
  }
`;
