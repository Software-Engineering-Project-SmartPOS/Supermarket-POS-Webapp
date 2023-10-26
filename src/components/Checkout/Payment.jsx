import { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { BsCash, BsFillCreditCardFill, BsGiftFill } from "react-icons/bs";
import { MdBookOnline } from "react-icons/md";
import PaymentModal from "./PaymentModal";
import GiftCardModal from "./GiftCardModal";
import DeleteModal from "./DeleteModal";
import { CREATE_SALE } from "../../graphql/sales";
import { useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { resetCheckout } from "../../state/reducers/checkout";
const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [showModal, setShowModal] = useState(false);
  const [amountReceived, setAmountReceived] = useState("");
  const { customerId, salesItemsInput, paymentType } = useSelector((state) => state.checkout);
  console.log(salesItemsInput);
  const dispatch = useDispatch();
  const [createSales, { loading }] = useMutation(CREATE_SALE);

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
    setShowModal(false);
    createSale();
  };

  const handleDelete = () => {
    setShowModal(true);
  };

  const createSale = () => {
    // Prepare the salesInput object for the mutation
    const salesInput = {
      customerId,
      salesItemsInput: salesItemsInput.map((item) => ({
        stockLevelId: item.stockLevelId,
        quantity: item.quantity,
      })),
      paymentType,
    };

    // Execute the mutation
    createSales({
      variables: { salesInput },
    })
      .then((result) => {
        toast.success("Sale created successfully");
        dispatch(resetCheckout());
      })
      .catch((error) => {
        toast.error("Error creating sale");
      });
  };

  return (
    <Col>
      {/* <Row className="p-1">
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
      </Row> */}
      {/* full width checkout button */}
      <Row className="p-2">
        <Button variant="danger" size="lg" onClick={handleDelete}>
          Delete
        </Button>
      </Row>
      <Row className="p-2">
        <Button variant="success" size="lg" disabled={salesItemsInput.length === 0} onClick={handleChargeClick}>
          {paymentMethod ? `Charge` : "Select Payment Method"}
        </Button>
      </Row>
      {paymentMethod === "cash" && <PaymentModal show={showModal} onHide={handleModalClose} onCharge={handleChargeConfirm} />}
      {paymentMethod === "gift" && <GiftCardModal show={showModal} onHide={handleModalClose} onCharge={handleChargeConfirm} />}
      {paymentMethod === "" && <DeleteModal show={showModal} onHide={handleModalClose} onCharge={handleChargeConfirm} />}
    </Col>
  );
};

export default Payment;
