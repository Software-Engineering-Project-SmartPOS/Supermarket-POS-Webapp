import { useEffect, useState } from "react";
import { Container, Table, Button, Form, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router";
import PathConstants from "../../../constants/pathConstants";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../../state/reducers/customer";
import Skeleton from "react-loading-skeleton";

const CustomerList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const navigate = useNavigate();
  const { customers, loading, error } = useSelector((state) => state.customer);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  if (loading) return <Skeleton count={20} />;
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

  const handleCustomerClick = () => {
    navigate("/" + PathConstants.PURCHASE_HISTORY);
  };

  if (error) return <Alert variant="danger">Error fetching data</Alert>;
  return (
    <Container>
      <div className="title d-flex justify-content-between pe-2">
        <h3>Customer List</h3>
        <Button variant="success" size="sm" onClick={() => navigate("/" + PathConstants.ADD_CUSTOMER)}>
          Add Customer
        </Button>
      </div>
      <div className="search-box">
        <Form.Group>
          <Form.Control type="text" placeholder="Search by name or email" value={searchTerm} onChange={handleSearch} />
        </Form.Group>
      </div>
      <Card border="light" className="table-responsive shadow">
        <Card.Body className="pt-0">
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
              {displayCustomers?.map((customer, index) => (
                <tr key={customer.id}>
                  <td>{index + 1}</td>
                  <td onClick={handleCustomerClick} className="text-link">
                    <strong>{customer.name}</strong>
                    <br />
                    {customer.email}
                  </td>
                  <td>{customer.telephone}</td>
                  <td>{customer.firstVisited}</td>
                  <td>{customer.lastVisited}</td>
                  <td className="text-right">{customer.totalVisits}</td>
                  <td className="text-right">{customer.totalSpent}</td>
                  <td className="text-right">{customer.pointsBalance}</td>
                  <td className="text-center">
                    <Button
                      variant="info"
                      size="sm"
                      className="mx-1"
                      onClick={() => {
                        navigate(`/${PathConstants.EDIT_CUSTOMER}`, { state: { customer } });
                      }}
                    >
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

export default CustomerList;
