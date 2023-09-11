import { Container, Table, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PathConstants from "../../../constants/pathConstants";

const Suppliers = () => {
  const navigate = useNavigate();

  // Sample supplier data
  const suppliers = [
    { id: 1, name: "Supplier A", contact: "John Doe", phoneNumber: "123-456-7890", email: "supplierA@example.com" },
    { id: 2, name: "Supplier B", contact: "Jane Smith", phoneNumber: "987-654-3210", email: "supplierB@example.com" },
    // Add more supplier data as needed
  ];

  return (
    <Container>
      <div className="title d-flex justify-content-between pe-2">
        <h3>Suppliers</h3>
        <Button variant="success" size="sm" onClick={() => navigate("/" + PathConstants.ADD_SUPPLIER)}>
          Add Supplier
        </Button>
      </div>
      <Card border="light" className="table-responsive shadow">
        <Card.Body className="pt-0">
          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier, index) => (
                <tr key={supplier.id}>
                  <td>{index + 1}</td>
                  <td>{supplier.name}</td>
                  <td>{supplier.contact}</td>
                  <td>{supplier.phoneNumber}</td>
                  <td>{supplier.email}</td>
                  <td className="text-center">
                    <Button variant="info" size="sm" className="mx-1" onClick={() => navigate("/" + PathConstants.EDIT_SUPPLIER)}>
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

export default Suppliers;
