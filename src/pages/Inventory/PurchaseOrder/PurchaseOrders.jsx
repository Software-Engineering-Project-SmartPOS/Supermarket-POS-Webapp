import { useState } from "react";
import { Container, Card, Table, Button, Form, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router";
import PathConstants from "../../../constants/pathConstants";

const PurchaseOrders = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPurchaseOrders, setFilteredPurchaseOrders] = useState([]);

  // Sample purchase orders data
  const purchaseOrders = [
    {
      id: 1,
      orderNumber: "PO-001",
      date: "2023-09-10",
      supplier: "Supplier A",
      store: "Store X",
      status: "Pending",
      received: "No",
      expectedDate: "2023-09-15",
      total: 500.0,
    },
    {
      id: 2,
      orderNumber: "PO-002",
      date: "2023-09-12",
      supplier: "Supplier B",
      store: "Store Y",
      status: "Delivered",
      received: "Yes",
      expectedDate: "2023-09-20",
      total: 750.0,
    },
    // Add more purchase order data as needed
  ];

  // Function to handle search
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    // Filter purchase orders based on fields
    const filtered = purchaseOrders.filter(
      (order) =>
        order.orderNumber.toLowerCase().includes(searchTerm) ||
        order.supplier.toLowerCase().includes(searchTerm) ||
        order.store.toLowerCase().includes(searchTerm) ||
        order.status.toLowerCase().includes(searchTerm)
    );

    setFilteredPurchaseOrders(filtered);
  };

  // Determine the purchase orders data to render based on search
  const displayPurchaseOrders = searchTerm.length === 0 ? purchaseOrders : filteredPurchaseOrders;
  const calculateReceivedProgress = (order) => {
    // Calculate the received progress based on the number of items received and total items
    const receivedProgress = (order.itemsReceived / order.totalItems) * 100;
    return receivedProgress.toFixed(2); // You can adjust the number of decimal places as needed
  };

  return (
    <Container>
      <div className="title d-flex justify-content-between pe-2">
        <h3>Purchase Orders</h3>
        <Button variant="success" size="sm" onClick={() => navigate("/" + PathConstants.ADD_PURCHASE_ORDER)}>
          Add Purchase Order
        </Button>
      </div>
      <div className="search-box">
        <Form.Group>
          <Form.Control type="text" placeholder="Search by order number, supplier, store, or status" value={searchTerm} onChange={handleSearch} />
        </Form.Group>
      </div>

      <Card border="light" className="table-responsive shadow">
        <Card.Body className="pt-0">
          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Purchase Order #</th>
                <th>Date</th>
                <th>Supplier</th>
                <th>Store</th>
                <th>Status</th>
                <th>Received</th>
                <th>Expected on</th>
                <th>Total</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayPurchaseOrders.map((order, index) => (
                <tr key={order.id}>
                  <td>{index + 1}</td>
                  <td>{order.orderNumber}</td>
                  <td>{order.date}</td>
                  <td>{order.supplier}</td>
                  <td>{order.store}</td>
                  <td>{order.status}</td>
                  <td>
                    <ProgressBar now={calculateReceivedProgress(order)} label={`${calculateReceivedProgress(order)}%`} />
                  </td>
                  <td>{order.expectedDate}</td>
                  <td>${order.total.toFixed(2)}</td>
                  <td className="text-center">
                    <Button
                      variant="info"
                      size="sm"
                      className="mx-1"
                      onClick={() => {
                        navigate(`/${PathConstants.EDIT_PURCHASE_ORDER}`);
                      }}
                    >
                      Edit
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

export default PurchaseOrders;
