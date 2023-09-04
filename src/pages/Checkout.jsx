import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import { TransactionsTable } from "../components/Checkout/TransactionTable";
import "../styles/Checkout.css";
import OrderSumary from "../components/Checkout/OrderSummary";
import Payment from "../components/Checkout/Payment";
import AddCustomerOrProduct from "../components/Checkout/AddCustomerOrProduct";

const Checkout = () => {
  return (
    <Container>
      <Row>
        <Col md={8}>
          <TransactionsTable />
        </Col>
        <Col md={4}>
          <OrderSumary />
          <AddCustomerOrProduct />
          <Payment />
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
