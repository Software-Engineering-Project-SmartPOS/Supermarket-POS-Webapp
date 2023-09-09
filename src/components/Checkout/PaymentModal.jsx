import { useState } from "react";

const PaymentModal = ({ show, onHide, onCharge }) => {
  const [amountReceived, setAmountReceived] = useState("");

  const handleAmountReceivedChange = (event) => {
    setAmountReceived(event.target.value);
  };

  const handleChargeConfirm = () => {
    onCharge(amountReceived);
  };

  return (
    <>
      <div className={`modal fade ${show ? "show" : ""}`} style={{ display: show ? "block" : "none" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Enter Amount Received</h5>
              <button type="button" className="btn-close" onClick={onHide} />
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="amountReceived">Amount Received</label>
                <input
                  type="number"
                  className="form-control"
                  id="amountReceived"
                  placeholder="Enter amount"
                  value={amountReceived}
                  onChange={handleAmountReceivedChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onHide}>
                Cancel
              </button>
              <button type="button" className="btn btn-success" onClick={handleChargeConfirm}>
                Charge
              </button>
            </div>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default PaymentModal;
