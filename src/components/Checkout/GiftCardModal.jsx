import { useState } from "react";

const GiftCardModal = ({ show, onHide, onCharge }) => {
  const [giftCardNumber, setGiftCardNumber] = useState("");

  const handleGiftCardNumberChange = (event) => {
    setGiftCardNumber(event.target.value);
  };

  const handleChargeConfirm = () => {
    onCharge(giftCardNumber);
  };

  return (
    <div className={`modal fade ${show ? "show" : ""}`} style={{ display: show ? "block" : "none" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Scan or Enter Gift Card Number</h5>
            <button type="button" className="btn-close" onClick={onHide} />
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="giftCardNumber"> Gift Card Number</label>
              <input
                type="number"
                className="form-control"
                id="giftCardNumber"
                placeholder="Enter Gift Card Number"
                value={giftCardNumber}
                onChange={handleGiftCardNumberChange}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onHide}>
              Cancel
            </button>
            <button type="button" className="btn btn-success" onClick={handleChargeConfirm}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCardModal;
