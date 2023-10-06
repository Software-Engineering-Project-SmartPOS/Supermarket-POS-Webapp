import { useEffect, useState } from "react";
import { Container, Card, Table, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import PathConstants from "../../../constants/pathConstants";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../../state/reducers/employee";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { employees } = useSelector((state) => state.employee);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  // Function to handle search
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    // Filter employees based on name, email, or role
    const filtered = employees.filter(
      (employee) =>
        employee.firstName.toLowerCase().includes(searchTerm) ||
        employee.email.toLowerCase().includes(searchTerm) ||
        employee.number.includes(searchTerm) ||
        employee.jobRole.toLowerCase().includes(searchTerm)
    );

    setFilteredEmployees(filtered);
  };

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
          <Form.Control type="text" placeholder="Search by firstname, email, phone, or role" value={searchTerm} onChange={handleSearch} />
        </Form.Group>
      </div>

      <Card border="light" className="table-responsive shadow">
        <Card.Body className="pt-0">
          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>FirstName</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(searchTerm === "" ? employees : filteredEmployees).map((employee, index) => (
                <tr key={employee.id}>
                  <td>{index + 1}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.number}</td>
                  <td>{employee.jobRole}</td>
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
