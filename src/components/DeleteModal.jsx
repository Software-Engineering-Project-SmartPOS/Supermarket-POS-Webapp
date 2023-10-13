import { Button } from "react-bootstrap";

const DeleteModal = ({ show, onClose, handleYes, message, loading }) => {
  return (
    <>
      <div className={`modal fade ${show ? "show" : ""}`} style={{ display: show ? "block" : "none" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              Delete {message}
              <button type="button" className="btn-close" onClick={onClose} />
            </div>
            <div className="modal-body">
              <h5 className="modal-title">Are you sure you want to delete {message.replace(/'/g, "&apos;")}? </h5>
            </div>
            <div className="modal-footer">
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleYes} disabled={loading}>
                {loading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default DeleteModal;
