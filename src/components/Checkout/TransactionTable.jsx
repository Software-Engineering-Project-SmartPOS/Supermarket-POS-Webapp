import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEllipsisH, faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Card, Button, Table, Dropdown, ButtonGroup } from "react-bootstrap";
import PropTypes from "prop-types";

export function TransactionsTable() {
  const transactions = [
    {
      productName: "Product A",
      unitPrice: 10.99,
      quantity: 3,
      discount: 2.5,
      subtotal: 30.97,
      status: "Paid",
    },
    {
      productName: "Product B",
      unitPrice: 5.99,
      quantity: 2,
      discount: 1.0,
      subtotal: 9.98,
      status: "Due",
    },
    {
      productName: "Product C",
      unitPrice: 7.49,
      quantity: 4,
      discount: 1.25,
      subtotal: 28.96,
      status: "Canceled",
    },
    {
      productName: "Product C",
      unitPrice: 7.49,
      quantity: 4,
      discount: 1.25,
      subtotal: 28.96,
      status: "Canceled",
    },
    {
      productName: "Product C",
      unitPrice: 7.49,
      quantity: 4,
      discount: 1.25,
      subtotal: 28.96,
      status: "Canceled",
    },
    {
      productName: "Product C",
      unitPrice: 7.49,
      quantity: 4,
      discount: 1.25,
      subtotal: 28.96,
      status: "Canceled",
    },
    {
      productName: "Product C",
      unitPrice: 7.49,
      quantity: 4,
      discount: 1.25,
      subtotal: 28.96,
      status: "Canceled",
    },
    {
      productName: "Product C",
      unitPrice: 7.49,
      quantity: 4,
      discount: 1.25,
      subtotal: 28.96,
      status: "Canceled",
    },
    {
      productName: "Product C",
      unitPrice: 7.49,
      quantity: 4,
      discount: 1.25,
      subtotal: 28.96,
      status: "Canceled",
    },
    {
      productName: "Product C",
      unitPrice: 7.49,
      quantity: 4,
      discount: 1.25,
      subtotal: 28.96,
      status: "Canceled",
    },
    {
      productName: "Product C",
      unitPrice: 7.49,
      quantity: 4,
      discount: 1.25,
      subtotal: 28.96,
      status: "Canceled",
    },
    {
      productName: "Product C",
      unitPrice: 7.49,
      quantity: 4,
      discount: 1.25,
      subtotal: 28.96,
      status: "Canceled",
    },
    {
      productName: "Product C",
      unitPrice: 7.49,
      quantity: 4,
      discount: 1.25,
      subtotal: 28.96,
      status: "Canceled",
    },
    {
      productName: "Product C",
      unitPrice: 7.49,
      quantity: 4,
      discount: 1.25,
      subtotal: 28.96,
      status: "Canceled",
    },
    {
      productName: "Product C",
      unitPrice: 7.49,
      quantity: 4,
      discount: 1.25,
      subtotal: 28.96,
      status: "Canceled",
    },
    {
      productName: "Product C",
      unitPrice: 7.49,
      quantity: 4,
      discount: 1.25,
      subtotal: 28.96,
      status: "Canceled",
    },
    {
      productName: "Product C",
      unitPrice: 7.49,
      quantity: 4,
      discount: 1.25,
      subtotal: 28.96,
      status: "Canceled",
    },
    {
      productName: "Product C",
      unitPrice: 7.49,
      quantity: 4,
      discount: 1.25,
      subtotal: 28.96,
      status: "Canceled",
    },
    {
      productName: "Product C",
      unitPrice: 7.49,
      quantity: 4,
      discount: 1.25,
      subtotal: 28.96,
      status: "Canceled",
    },
    {
      productName: "Product C",
      unitPrice: 7.49,
      quantity: 4,
      discount: 1.25,
      subtotal: 28.96,
      status: "Canceled",
    },
    // Add more transactions as needed
  ];

  const TableRow = (props) => {
    const { productName, unitPrice, quantity, discount, subtotal, index } = props;

    return (
      <tr>
        <td>
          <Card.Link className="fw-normal">{index}</Card.Link>
        </td>
        <td>
          <span className="fw-normal">{productName}</span>
        </td>
        <td>
          <span className="fw-normal">{unitPrice}</span>
        </td>
        <td>
          <span className="fw-normal">{quantity}</span>
        </td>

        <td>
          <span className="fw-normal">{discount}</span>
        </td>
        <td>
          <span className="fw-normal">{subtotal}</span>
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
                <th className="border-bottom">Discount</th>
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
