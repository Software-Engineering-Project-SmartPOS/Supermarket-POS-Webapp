import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";

const PurchaseHistory = ({ customerId }) => {
  const [purchaseHistory, setPurchaseHistory] = useState([
    {
      id: 1,
      customerId: 1,
      transactionDate: "2023-01-15",
      amountSpent: 100,
      receiptNumber: "R12345",
    },
    {
      id: 2,
      customerId: 1,
      transactionDate: "2023-02-20",
      amountSpent: 75,
      receiptNumber: "R12346",
    },
    {
      id: 3,
      customerId: 2,
      transactionDate: "2023-03-10",
      amountSpent: 50,
      receiptNumber: "R12347",
    },
    {
      id: 4,
      customerId: 3,
      transactionDate: "2023-04-05",
      amountSpent: 120,
      receiptNumber: "R12348",
    },
    // Add more sample purchase history items as needed
  ]);
  // Fetch the purchase history for the selected customer based on customerId
  useEffect(() => {
    // Replace this with your API call to fetch purchase history
    // Example: fetchPurchaseHistory(customerId).then((data) => setPurchaseHistory(data));
  }, [customerId]);

  const handleTransactionClcik = () => {};

  return (
    <Container>
      <div className="title">
        <h3>Purchase History</h3>
      </div>
      <Table responsive hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Transaction Date</th>
            <th>Amount Spent</th>
            <th>Receipt Number</th>
          </tr>
        </thead>
        <tbody>
          {purchaseHistory.map((transaction, index) => (
            <tr key={transaction.id} onClick={handleTransactionClcik}>
              <td>{index + 1}</td>
              <td>{transaction.transactionDate}</td>
              <td>{transaction.amountSpent}</td>
              <td>{transaction.receiptNumber}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default PurchaseHistory;
