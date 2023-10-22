import { useState } from "react";
import { Container, Card, Table, Button, Form, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router";
import PathConstants from "../../../constants/pathConstants";
import { useQuery } from "@apollo/client";
import { GET_ALL_PURCHASE_ORDERS } from "../../../graphql/inventory";
import Skeleton from "react-loading-skeleton";
import ReceiveModal from "../../../components/PurchaseOrder/RecieveModal";
import { set } from "date-fns";

const PurchaseOrders = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPurchaseOrders, setFilteredPurchaseOrders] = useState([]);
  const { data, loading } = useQuery(GET_ALL_PURCHASE_ORDERS);
  const purchaseOrders = data?.AllPurchaseOrders || [];
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [orderId, setOrderId] = useState(null);

  if (loading) return <Skeleton count={10} />;

  // Function to handle search
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = purchaseOrders.filter(
      (order) =>
        order.id.toLowerCase().includes(searchTerm) ||
        order.supplier.name.toLowerCase().includes(searchTerm) ||
        order.branch.name.toLowerCase().includes(searchTerm) ||
        order.orderStatus.toLowerCase().includes(searchTerm)
    );
    setFilteredPurchaseOrders(filtered);
  };

  // Determine the purchase orders data to render based on search
  const displayPurchaseOrders = searchTerm.length === 0 ? purchaseOrders : filteredPurchaseOrders;
  const calculateReceivedProgress = (order) => {
    const receivedQuantity = order.purchaseOrderItemList.reduce((total, item) => total + item.receivedQuantity, 0);
    const totalQuantity = order.purchaseOrderItemList.reduce((total, item) => total + item.quantity, 0);
    return `${receivedQuantity}/${totalQuantity}`;
  };

  const openReceiveModal = () => {
    setShowReceiveModal(true);
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
                  <td>{order.id}</td>
                  <td>{order.orderedDate}</td>
                  <td>{order.supplier.name}</td>
                  <td>{order.branch.name}</td>
                  <td>{order.orderStatus}</td>
                  <td>{calculateReceivedProgress(order)}</td>
                  <td>{order.expectedDate}</td>
                  <td>Rs. {order.purchaseCost}</td>
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
                    <Button
                      variant="success"
                      size="sm"
                      className="mx-1"
                      onClick={() => {
                        setOrderId(order.id);
                        openReceiveModal(); // Open the receive modal for the selected order
                      }}
                    >
                      Receive
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {orderId && (
            <ReceiveModal
              show={showReceiveModal}
              handleClose={() => {
                setShowReceiveModal(false);
              }}
              orderId={orderId}
            />
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PurchaseOrders;
