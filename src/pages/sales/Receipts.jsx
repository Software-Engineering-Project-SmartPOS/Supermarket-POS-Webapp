import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { FaReceipt } from "react-icons/fa";
import ReactSearchBox from "react-search-box";
import Receipt from "../../components/Receipts/Receipt";
import Refund from "../../components/Receipts/Refund";
const Receipts = () => {
  // Sample data for past receipts
  const [receipts, setReceipts] = useState([
    {
      id: 1,
      shop: { name: "Keels-Moratuws", address: "Moratuwa", phoneNumber: "011-2345678" },
      cashier: "Kobin",
      date: "2021-09-01",
      totalAmount: 45.67,
      items: [
        { name: "Milk", quantity: 2, price: 10.99 },
        { name: "Bread", quantity: 1, price: 5.99 },
        { name: "Eggs", quantity: 3, price: 7.49 },
      ],
    },
    {
      id: 2,
      shop: { name: "SuperMart", address: "Colombo", phoneNumber: "011-9876543" },
      cashier: "Sara",
      date: "2021-09-05",
      totalAmount: 32.18,
      items: [
        { name: "Cereal", quantity: 1, price: 8.99 },
        { name: "Bananas", quantity: 6, price: 2.49 },
        { name: "Orange Juice", quantity: 2, price: 4.49 },
      ],
    },
    {
      id: 3,
      shop: { name: "FreshGrocery", address: "Galle", phoneNumber: "091-1234567" },
      cashier: "David",
      date: "2021-09-10",
      totalAmount: 78.92,
      items: [
        { name: "Apples", quantity: 4, price: 1.99 },
        { name: "Carrots", quantity: 2, price: 3.49 },
        { name: "Potatoes", quantity: 5, price: 0.99 },
      ],
    },
  ]);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [selectedRefundReceipt, setSelectedRefundReceipt] = useState(null);
  const [searchText, setSearchText] = useState("");

  // Handle selecting a receipt
  const handleReceiptSelect = (receipt) => {
    setSelectedReceipt(receipt);
  };

  const handleRefund = () => {
    setSelectedRefundReceipt(selectedReceipt);
  };

  // Filter receipts based on search text
  const filteredReceipts = receipts.filter((receipt) => receipt.date.includes(searchText));

  return (
    <Container>
      <Row>
        {/* Col-8: Detailed Receipt */}
        <Col md={8}>
          {!selectedRefundReceipt ? (
            <>
              <div className="title">
                <h3>Receipt Details</h3>
              </div>
              {selectedReceipt ? <Receipt selectedReceipt={selectedReceipt} handleRefund={handleRefund} /> : <p>Please select a receipt</p>}
            </>
          ) : (
            <Refund selectedReceipt={selectedRefundReceipt} />
          )}
        </Col>
        {/* Col-4: Receipt List */}
        <Col md={4}>
          <div className="title">
            <h3>Receipts</h3>
          </div>
          <div className="search-box">
            <ReactSearchBox
              placeholder="Search Receipts"
              data={[]}
              onSelect={handleReceiptSelect}
              onFocus={() => {
                // console.log("This function is called when is focussed");
              }}
              onChange={(value) => console.log(value)}
              autoFocus
              leftIcon={<FaReceipt />}
              inputBorderColor="#002a54"
              iconBoxSize="48px"
              inputFontSize="16px"
              inputHeight="48px"
              dropdownBorderColor="#002a54"
              dropdownHoverColor="#c4dcf4"
            />
          </div>
          <ul className="list-group">
            {filteredReceipts.map((receipt) => (
              <li
                key={receipt.id}
                className={`list-group-item ${selectedReceipt && selectedReceipt.id === receipt.id ? "active" : ""}`}
                onClick={() => handleReceiptSelect(receipt)}
              >
                {receipt.date} - Total: ${receipt.totalAmount.toFixed(2)}
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Receipts;
