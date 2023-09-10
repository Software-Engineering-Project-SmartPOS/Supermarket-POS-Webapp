import { useState } from "react";
import { Container, Card, Table, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import PathConstants from "../../constants/pathConstants";

const EmployeeList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  // Sample employee data
  const employees = [
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "123-456-7890",
      role: "Manager",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      phone: "987-654-3210",
      role: "Developer",
    },
    // Add more employee data as needed
  ];

  // Function to handle search
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    // Filter employees based on name, email, or role
    const filtered = employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(searchTerm) ||
        employee.email.toLowerCase().includes(searchTerm) ||
        employee.phone.includes(searchTerm) ||
        employee.role.toLowerCase().includes(searchTerm)
    );

    setFilteredEmployees(filtered);
  };

  // Determine the employee data to render based on search
  const displayEmployees = searchTerm.length === 0 ? employees : filteredEmployees;

  // Function to handle edit employee
  const handleEditEmployee = () => {
    navigate("/" + PathConstants.EDIT_EMPLOYEE);
  };

  return (
    <Container>
      <div className="title d-flex justify-content-between pe-2">
        <h3>Employee List</h3>
        <Button variant="success" size="sm" onClick={() => navigate("/" + PathConstants.ADD_EMPLOYEE)}>
          Add Employee
        </Button>
      </div>
      <div className="search-box">
        <Form.Group>
          <Form.Control type="text" placeholder="Search by name, email, phone, or role" value={searchTerm} onChange={handleSearch} />
        </Form.Group>
      </div>

      <Card border="light" className="table-responsive shadow">
        <Card.Body className="pt-0">
          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayEmployees.map((employee, index) => (
                <tr key={employee.id}>
                  <td>{index + 1}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.role}</td>
                  <td className="text-center">
                    <Button variant="info" size="sm" className="mx-1" onClick={handleEditEmployee}>
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" className="mx-1">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EmployeeList;
