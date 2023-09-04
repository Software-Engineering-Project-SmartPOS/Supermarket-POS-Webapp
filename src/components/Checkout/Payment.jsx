import React, { useState } from "react";
import { Container, Row, Col, Table, Button, Form, Card } from "react-bootstrap";
import { BsCash } from "react-icons/bs";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState();
  const handlePaymentMethodClick = (method) => {
    // Handle the selected payment method (e.g., Cash, Card, Gift Card, Online Payment)

    if (paymentMethod === method) {
      setPaymentMethod("");
    } else {
      setPaymentMethod(method);
    }
  };

  return (
    <Col>
      <Row className="p-1">
        <span className={`pay-icon ${paymentMethod === "cash" ? "active" : ""}`} onClick={() => handlePaymentMethodClick("cash")}>
          <BsCash />
          <h5>Cash</h5>
        </span>
        <span className={`pay-icon ${paymentMethod === "card" ? "active" : ""}`} onClick={() => handlePaymentMethodClick("card")}>
          <BsCash />
          <h5>Credit/Debit Card</h5>
        </span>
        <span className={`pay-icon ${paymentMethod === "gift" ? "active" : ""}`} onClick={() => handlePaymentMethodClick("gift")}>
          <BsCash />
          <h5>Gift Card</h5>
        </span>
        <span className={`pay-icon ${paymentMethod === "online" ? "active" : ""}`} onClick={() => handlePaymentMethodClick("online")}>
          <BsCash />
          <h5>Online Payment</h5>
        </span>
      </Row>
    </Col>
  );
};

export default Payment;
