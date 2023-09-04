import { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { BsCash, BsFillCreditCardFill, BsGiftFill } from "react-icons/bs";
import { MdBookOnline } from "react-icons/md";

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
          <BsFillCreditCardFill />
          <h5>Credit/Debit Card</h5>
        </span>
        <span className={`pay-icon ${paymentMethod === "gift" ? "active" : ""}`} onClick={() => handlePaymentMethodClick("gift")}>
          <BsGiftFill />
          <h5>Gift Card</h5>
        </span>
        <span className={`pay-icon ${paymentMethod === "online" ? "active" : ""}`} onClick={() => handlePaymentMethodClick("online")}>
          <MdBookOnline />
          <h5>Online Payment</h5>
        </span>
      </Row>
      {/* full width checkout button */}
      <Row className="p-2">
        <Button variant="success" size="lg" disabled={!paymentMethod}>
          {paymentMethod ? `Checkout` : "Select Payment Method"}
        </Button>
      </Row>
    </Col>
  );
};

export default Payment;
