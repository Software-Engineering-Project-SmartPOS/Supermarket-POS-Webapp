import { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { BsCash, BsFillCreditCardFill, BsGiftFill } from "react-icons/bs";
import { MdBookOnline } from "react-icons/md";
import PaymentModal from "./PaymentModal";
import GiftCardModal from "./GiftCardModal";
const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState();
  const [showModal, setShowModal] = useState(false);
  const [amountReceived, setAmountReceived] = useState("");

  const handlePaymentMethodClick = (method) => {
    if (paymentMethod === method) {
      setPaymentMethod("");
    } else {
      setPaymentMethod(method);
    }
  };

  const handleChargeClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleAmountReceivedChange = (event) => {
    setAmountReceived(event.target.value);
  };

  const handleChargeConfirm = (amount) => {
    // Perform the charge operation here and use the "amount" parameter
    // For now, just close the modal
    setShowModal(false);
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
        <Button variant="danger" size="lg">
          Delete
        </Button>
      </Row>
      <Row className="p-2">
        <Button variant="success" size="lg" disabled={!paymentMethod} onClick={handleChargeClick}>
          {paymentMethod ? `Charge` : "Select Payment Method"}
        </Button>
      </Row>
      <PaymentModal show={showModal} onHide={handleModalClose} onCharge={handleChargeConfirm} />
      <GiftCardModal show={showModal} onHide={handleModalClose} onCharge={handleChargeConfirm} />
    </Col>
  );
};

export default Payment;
