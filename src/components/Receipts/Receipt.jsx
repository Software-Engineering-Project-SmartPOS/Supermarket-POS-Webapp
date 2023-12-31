function Receipt({ selectedReceipt, handleRefund }) {
  return (
    <div className="card shadow-sm p-2">
      {/* Shop Details */}
      <div className="d-flex justify-content-between gap-2">
        <span>
          <h4>Shop Details</h4>
        </span>
        <button type="button" name="" id="" className="btn btn-success" onClick={handleRefund}>
          Refund
        </button>
      </div>
      <p>Supermarket Name: {selectedReceipt.shop.name}</p>
      <p>Store Address: {selectedReceipt.shop.address}</p>
      <p>Store Phone Number: {selectedReceipt.shop.phoneNumber}</p>

      <hr />

      {/* Cashier and Billing Timestamp */}
      <h4>Cashier: {selectedReceipt.cashier}</h4>
      <p>Billing Timestamp: {selectedReceipt.date}</p>

      <hr />

      {/* Items List */}
      <h4>Items:</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {selectedReceipt.items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total Amount */}
      <h3>Total Amount: ${selectedReceipt.totalAmount.toFixed(2)}</h3>
    </div>
  );
}

export default Receipt;
