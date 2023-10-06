//queries and mutation related with customers
import gql from "graphql-tag";

export const GET_EMPLOYEES = gql`
  query AllEmployees {
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
