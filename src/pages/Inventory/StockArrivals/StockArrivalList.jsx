import React, { useState } from "react";
import { Container, Table, Button, Card, Alert } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router";
import { GET_ALL_STOCK_ARRIVALS } from "../../../graphql/inventory";
import TransferStockModal from "../../../components/StockArrivals/TransferStockModal";

const StockArrivals = () => {
  const { data: stockArrivalsData, loading, error, refetch } = useQuery(GET_ALL_STOCK_ARRIVALS, { variables: { transferred: false } });
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [stockArrival, setStockArrival] = useState(null);

  if (loading) return <Skeleton count={5} />;
  if (error) return <Alert variant="danger">Error fetching data</Alert>;

  const stockArrivals = stockArrivalsData.GetAllStockArrivals;

  return (
    <Container>
      <div className="title d-flex justify-content-between pe-2">
        <h3>Stock Arrivals</h3>
      </div>
      <div className="d-flex justify-content-between">
        <div></div>
      </div>
      <Card border="light" className="table-responsive shadow">
        <Card.Body className="pt-0">
          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Item Name</th>
                <th>Supplier</th>
                <th>Quantity</th>
                <th>Unit Item Cost</th>
                <th>Arrival Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stockArrivals.map((stockArrival, index) => (
                <tr key={stockArrival.id}>
                  <td>{index + 1}</td>
                  <td>{stockArrival.purchaseOrderItem.item.name}</td>
                  <td>{stockArrival.purchaseOrderItem.itemSupply.supplier.name}</td>
                  <td>{stockArrival.quantity}</td>
                  <td>Rs. {stockArrival.purchaseOrderItem.purchaseItemUnitCost}</td>
                  <td>{stockArrival.arrivedAt}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        setStockArrival(stockArrival);
                        setShowTransferModal(true);
                      }}
                    >
                      Transfer
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <TransferStockModal
        show={showTransferModal}
        onClose={() => {
          setShowTransferModal(false);
          setStockArrival(null);
          refetch();
        }}
        stockArrival={stockArrival}
      />
    </Container>
  );
};

export default StockArrivals;
