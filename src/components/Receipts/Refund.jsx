import React, { useState } from "react";
import { Container, Row, Col, Form, ListGroup, Button, Modal } from "react-bootstrap";

const Refund = ({ selectedReceipt }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantityToReturn, setQuantityToReturn] = useState(1);

  // Handle opening the modal to select quantity for return
  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setSelectedItem(null);
    setShowModal(false);
    setQuantityToReturn(1);
  };

  // Handle adding an item to the refund list with a selected quantity
  const handleAddToRefundList = () => {
    if (selectedItem) {
      const itemIndex = selectedItems.findIndex((item) => item.name === selectedItem.name);

      if (itemIndex === -1) {
        // Item not in the refund list, add it
        setSelectedItems((prevItems) => [...prevItems, { ...selectedItem, quantityToReturn }]);
      } else {
        // Item already in the refund list, update quantity
        const updatedItems = [...selectedItems];
        updatedItems[itemIndex].quantityToReturn = quantityToReturn;
        setSelectedItems(updatedItems);
      }

      // Close the modal
      handleCloseModal();
    }
  };

  // Handle removing an item from the refund list
  const handleRemoveFromRefundList = (item) => {
    const updatedItems = selectedItems.filter((selectedItem) => selectedItem.name !== item.name);
    setSelectedItems(updatedItems);
  };

  // Handle refunding selected items
  const handleRefund = () => {
    // Perform refund logic here, e.g., calculate refund amount, update database, etc.
    console.log("Refunding items:", selectedItems);

    // Clear selected items after refund
    setSelectedItems([]);
  };

  return (
    <>
      <div className="row">
        <div className="title">
          <h3>Refund</h3>
        </div>
        <h3>Receipt #{selectedReceipt.id}</h3>
        <p>Date: {selectedReceipt.date}</p>
        <hr />
        <div className="col-6">
          <h4>Items:</h4>
          <ListGroup>
            {selectedReceipt.items.map((item, index) => (
              <ListGroup.Item key={index} onClick={() => handleOpenModal(item)}>
                {item.name} - Quantity: {item.quantity} - Price: ${item.price.toFixed(2)}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        {/* Refund Section */}
        <div className="col-6">
          <div>
            <h3>Refund Items</h3>
            <ListGroup>
              {selectedItems.length > 0 &&
                selectedItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    {item.name} - Quantity: {item.quantityToReturn} - Price: ${(item.price * item.quantityToReturn).toFixed(2)}{" "}
                    <Button variant="danger" size="sm" onClick={() => handleRemoveFromRefundList(item)}>
                      Remove
                    </Button>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </div>
        </div>
        <hr />
        <Button variant="success" onClick={handleRefund}>
          Refund Selected Items
        </Button>
      </div>

      {/* Quantity Selection Modal */}
      <div key={selectedItem} className={`modal fade ${showModal ? "show" : ""}`} style={{ display: showModal ? "block" : "none" }}>
        <div className="modal-dialog  modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Select Quantity to Return</h5>
              <button type="button" className="btn-close" onClick={handleCloseModal}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="quantityToReturn" className="form-label">
                  Quantity (Max: {selectedItem ? selectedItem.quantity : 0})
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="quantityToReturn"
                  min="1"
                  max={selectedItem?.quantity}
                  value={quantityToReturn}
                  onChange={(e) => setQuantityToReturn(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleAddToRefundList}>
                Add to Refund List
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default Refund;
