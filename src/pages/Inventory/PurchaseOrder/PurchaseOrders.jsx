import React, { useState } from "react";
import { Container, Card, Table, Button, Form, ProgressBar, Alert } from "react-bootstrap";
import { useNavigate } from "react-router";
import PathConstants from "../../../constants/pathConstants";
import { useQuery } from "@apollo/client";
import { GET_ALL_PURCHASE_ORDERS } from "../../../graphql/inventory";
import Skeleton from "react-loading-skeleton";
import ReceiveModal from "../../../components/PurchaseOrder/RecieveModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

const PurchaseOrders = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPurchaseOrders, setFilteredPurchaseOrders] = useState([]);
  const { data, loading, error } = useQuery(GET_ALL_PURCHASE_ORDERS);
  const purchaseOrders = data?.AllPurchaseOrders || [];
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  if (loading) return <Skeleton count={10} />;
  if (error) return <Alert variant="danger">Error fetching data</Alert>;

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

  // Function to handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      // If the same field is clicked again, toggle the sort order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If a different field is clicked, set it as the new sort field and default to ascending order
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Function to sort data based on the selected field
  const sortData = (data, field) => {
    return data.slice().sort((a, b) => {
      if (field === "orderedDate" || field === "expectedDate") {
        // Convert date strings to Date objects for sorting
        const dateA = new Date(a[field]);
        const dateB = new Date(b[field]);

        if (dateA > dateB) return sortOrder === "asc" ? 1 : -1;
        if (dateA < dateB) return sortOrder === "asc" ? -1 : 1;
        return 0;
      } else {
        // Sort non-date fields
        const aValue = isNaN(a[field]) ? a[field] : parseFloat(a[field]);
        const bValue = isNaN(b[field]) ? b[field] : parseFloat(b[field]);

        if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
        if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
        return 0;
      }
    });
  };

  // Function to render sorting icons
  const renderSortIcons = (field) => {
    if (sortField === field) {
      if (sortOrder === "asc") {
        return <FontAwesomeIcon icon={faSortUp} />;
      } else {
        return <FontAwesomeIcon icon={faSortDown} />;
      }
    }
    return <FontAwesomeIcon icon={faSort} />;
  };

  // Sort the purchase orders based on the selected field
  const sortedPurchaseOrders = sortField
    ? sortData(searchTerm.length === 0 ? purchaseOrders : filteredPurchaseOrders, sortField)
    : searchTerm.length === 0
    ? purchaseOrders
    : filteredPurchaseOrders;

  const calculateReceivedProgress = (order) => {
    const receivedQuantity = order.purchaseOrderItemList.reduce((total, item) => total + item.receivedQuantity, 0);
    const totalQuantity = order.purchaseOrderItemList.reduce((total, item) => total + item.quantity, 0);
    return `${receivedQuantity}/${totalQuantity}`;
  };

  const openReceiveModal = (orderId) => {
    setOrderId(orderId);
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
                <th onClick={() => handleSort("id")}>Purchase Order # {renderSortIcons("id")}</th>
                <th onClick={() => handleSort("orderedDate")}>Ordered Date {renderSortIcons("orderedDate")}</th>
                <th onClick={() => handleSort("supplier.name")}>Supplier {renderSortIcons("supplier.name")}</th>
                <th onClick={() => handleSort("branch.name")}>Store {renderSortIcons("branch.name")}</th>
                <th onClick={() => handleSort("orderStatus")}>Status {renderSortIcons("orderStatus")}</th>
                <th>Received</th>
                <th onClick={() => handleSort("expectedDate")}>Expected on {renderSortIcons("expectedDate")}</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedPurchaseOrders.map((order, index) => (
                <tr key={order.id}>
                  <td>{index + 1}</td>
                  <td>{order.id}</td>
                  <td>{format(new Date(order.orderedDate), "MM/dd/yyyy")}</td>
                  <td>{order.supplier.name}</td>
                  <td>{order.branch.name}</td>
                  <td>{order.orderStatus}</td>
                  <td>{calculateReceivedProgress(order)}</td>
                  <td>{format(new Date(order.expectedDate), "MM/dd/yyyy")}</td>
                  <td className="text-center">
                    <Button variant="success" size="sm" className="mx-1" onClick={() => openReceiveModal(order.id)}>
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
