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
    AddEmployee(employeeInput: $employeeInput) {
      ... on Employee {
        id
        title
        firstName
        middleName
        lastName
        email
        number
        jobRole
        active
        createdAt
        updatedAt
      }
      ... on FailedPayLoad {
        errorMessage
      }
    }
  }
`;

export const ADD_SALARY_TYPE = gql`
  mutation AddSalaryType($salaryTypeInput: SalaryTypeInput!) {
    AddSalaryType(inputSalaryTypeDetails: $salaryTypeInput) {
      id
      basicSalary
      halfDaySalary
      overTimeSalary
      bonus
    }
  }
`;

export const GET_ALL_SALARY_TYPES = gql`
  query AllSalaryTypes {
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
