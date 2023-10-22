import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEllipsisH, faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Card, Button, Table, Dropdown, ButtonGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export function TransactionsTable() {
  const transactions = useSelector((state) => state.checkout.salesItemsInput);

  const TableRow = (props) => {
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
          <span className="fw-normal">{props.quantity}</span>
        </td>

        <td>
          <span className="fw-normal">Rs. {props.item.item.sellingPrice * props.quantity}</span>
        </td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
              <span>
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item className="text-danger">
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
