import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Card, Button, Table, Dropdown, ButtonGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { removeSalesItem, updateQuantity } from "../../state/reducers/checkout";
export function TransactionsTable() {
  const transactions = useSelector((state) => state.checkout.salesItemsInput);
  const dispatch = useDispatch();

  const TableRow = (props) => {
    const [quantity, setQuantity] = useState(props.quantity);

    const handleQuantityChange = (e) => {
      const newQuantity = parseInt(e.target.value, 10);

      // Dispatch the updateQuantity action to update the quantity in the Redux store
      dispatch(updateQuantity({ stockLevelId: props.stockLevelId, quantity: newQuantity }));
      setQuantity(newQuantity);
    };

    const handleDeleteClick = () => {
      // Remove the item from the Redux store
      dispatch(removeSalesItem({ stockLevelId: props.stockLevelId }));
    };

    return (
      <tr>
        <td>
          <Card.Link className="fw-normal">{props.index}</Card.Link>
        </td>
        <td>
          <span className="fw-normal">{props.item.item.item.name}</span>
        </td>
        <td>
          <span className="fw-normal">Rs. {props.item.item.sellingPrice}</span>
        </td>
        <td>
          <input type="number" value={quantity} onChange={handleQuantityChange} className="fw-normal" />
        </td>
        <td>
          <span className="fw-normal">Rs. {props.item.item.sellingPrice * quantity}</span>
        </td>
        <td>
          <Button variant="danger" size="sm" className="mx-1" onClick={handleDeleteClick}>
            Delete
          </Button>
        </td>
      </tr>
    );
  };

  TableRow.propTypes = {
    productName: PropTypes.string.isRequired,
    unitPrice: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    subtotal: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
  };

  return (
    <>
      <div className="title">
        <h3>Items</h3>
      </div>
      <Card border="light" className="table-responsive shadow table-view">
        <Card.Body className="pt-0">
          <Table hover className="align-items-center">
            <thead className="table-head">
              <tr>
                <th className="border-bottom">#</th>
                <th className="border-bottom">Product Name</th>
                <th className="border-bottom">Unit Price</th>
                <th className="border-bottom">Quantity</th>
                <th className="border-bottom">Subtotal</th>
                <th className="border-bottom">Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, index) => (
                <TableRow key={`transaction-${index}`} {...t} index={index} />
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
}
