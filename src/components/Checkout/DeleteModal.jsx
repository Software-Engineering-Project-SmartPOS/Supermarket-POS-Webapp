import { useState } from "react";
import { resetCheckout } from "../../state/reducers/checkout";
import { useDispatch } from "react-redux";

const DeleteModal = ({ show, onHide, onCharge }) => {
  const [amountReceived, setAmountReceived] = useState("");
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(resetCheckout());
    onHide();
  };

  return (
    <>
      <div className={`modal fade ${show ? "show" : ""}`} style={{ display: show ? "block" : "none" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              Delete All Orders
              <button type="button" className="btn-close" onClick={onHide} />
            </div>
            <div className="modal-body">
              <h5 className="modal-title">Are you sure you want to delete all orders? </h5>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onHide}>
                Cancel
              </button>
              <button type="button" className="btn btn-success" onClick={handleDelete}>
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default DeleteModal;
