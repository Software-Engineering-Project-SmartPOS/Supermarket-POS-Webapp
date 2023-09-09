import React, { useState } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import PathConstants from "../../constants/pathConstants";

const CustomerList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  // Sample customer data
  const customers = [
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      firstVisitDate: "2023-01-10",
      lastVisitDate: "2023-09-05",
      totalVisits: 10,
      totalSpent: 500,
      pointsBalance: 100,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      firstVisitDate: "2023-02-15",
      lastVisitDate: "2023-08-28",
      totalVisits: 8,
      totalSpent: 400,
      pointsBalance: 80,
    },
    {
      id: 3,
      name: "Jane Smith",
      email: "janesmith@example.com",
      firstVisitDate: "2023-02-15",
      lastVisitDate: "2023-08-28",
      totalVisits: 8,
      totalSpent: 400,
      pointsBalance: 80,
    },
    // Add more customer data as needed
  ];

  // Function to handle search
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    // Filter customers based on name or email
    const filtered = customers.filter(
      (customer) => customer.name.toLowerCase().includes(searchTerm) || customer.email.toLowerCase().includes(searchTerm)
    );

    setFilteredCustomers(filtered);
  };

  // Determine the customer data to render based on search
  const displayCustomers = searchTerm.length === 0 ? customers : filteredCustomers;
  const handleEditCusomer = () => {
    navigate("/" + PathConstants.EDIT_CUSTOMER);
  };
  return (
    <Container>
      <div className="title">
        <h3>Customer List</h3>
      </div>
      <div className="search-box">
        <Form.Group>
          <Form.Control type="text" placeholder="Search by name or email" value={searchTerm} onChange={handleSearch} />
        </Form.Group>
      </div>

      <Table responsive hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Contacts</th>
            <th>First Visit</th>
            <th>Last Visit</th>
            <th className="text-right">Total Visits</th>
            <th className="text-right">Total Spent</th>
            <th className="text-right">Points Balance</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayCustomers.map((customer, index) => (
            <tr key={customer.id}>
              <td>{index + 1}</td>
              <td>
                <strong>{customer.name}</strong>
                <br />
                {customer.email}
              </td>
              <td>{customer.telephone}</td>
              <td>{customer.firstVisitDate}</td>
              <td>{customer.lastVisitDate}</td>
              <td className="text-right">{customer.totalVisits}</td>
              <td className="text-right">{customer.totalSpent}</td>
              <td className="text-right">{customer.pointsBalance}</td>
              <td className="text-center">
                <Button variant="info" size="sm" className="mx-1" onClick={handleEditCusomer}>
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
    </Container>
  );
};

export default CustomerList;
