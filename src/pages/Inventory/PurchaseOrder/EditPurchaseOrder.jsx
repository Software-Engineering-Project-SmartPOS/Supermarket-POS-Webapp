import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendarAlt, faStickyNote, faPlus, faChevronLeft, faList } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, Container, InputGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import PathConstants from "../../../constants/pathConstants";

export default function EditPurchaseOrder() {
  const navigate = useNavigate();
  const { purchaseOrderId } = useParams();

  // Fetch purchase order data based on purchaseOrderId from your backend or API
  // const purchaseOrderData = ... // Fetch data here

  // Define a list of suppliers and items (sample data)
  const suppliers = ["Supplier A", "Supplier B", "Supplier C"];
  const items = [
    { id: 1, name: "Item 1", inStock: 100, incoming: 50, purchaseCost: 10 },
    { id: 2, name: "Item 2", inStock: 75, incoming: 25, purchaseCost: 15 },
    { id: 3, name: "Item 3", inStock: 120, incoming: 30, purchaseCost: 8 },
  ];

  // Initial values for the form based on fetched purchase order data
  const initialValues = {
    supplier: "Supplier A",
    purchaseDate: "2023-09-15",
    expectedDate: "2023-09-30",
    note: "Sample note for this purchase order",
    orderItems: [
      {
        itemId: 1,
        quantity: 10,
        purchaseCost: 12.5,
      },
      {
        itemId: 2,
        quantity: 5,
        purchaseCost: 9.0,
      },
    ],
  };

  // Validation schema
  const validationSchema = Yup.object({
    supplier: Yup.string().required("Required"),
    purchaseDate: Yup.date().required("Required"),
    expectedDate: Yup.date().required("Required"),
    note: Yup.string(),
    orderItems: Yup.array().of(
      Yup.object().shape({
        itemId: Yup.number().required("Required"),
        quantity: Yup.number().required("Required"),
        purchaseCost: Yup.number().required("Required"),
      })
    ),
  });

  // Calculate amount for each order item
  const calculateAmount = (quantity, purchaseCost) => {
    return quantity * purchaseCost;
  };

  return (
    <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
      <Container>
        <Row className="justify-content-center form-bg-image">
          <Col xs={12} lg={8} className="d-flex align-items-center justify-content-center">
            <div className="bg-white shadow-lg border rounded border-light p-4 p-lg-5 w-100">
              <div className="d-flex">
                <div className="text-start" onClick={() => navigate(`/${PathConstants.PURCHASE_ORDERS}`)}>
                  <button type="button" className="btn btn-outline-primary">
                    <FontAwesomeIcon icon={faChevronLeft} /> Back
                  </button>
                </div>
                <div className="text-center text-md-center mt-md-0 flex-grow-1">
                  <h3 className="mb-0">Edit Purchase Order</h3>
                </div>
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  console.log(values);
                  // Add your logic to update the purchase order data here
                  // After updating the purchase order, you can navigate to a success page or another route
                  navigate("/success");
                }}
              >
                {({ handleSubmit, handleChange, values, errors, touched }) => (
                  <Form className="mt-4" onSubmit={handleSubmit}>
                    <Row>
                      <Col xs={12} lg={6}>
                        <Form.Group controlId="supplier" className="mb-4">
                          <Form.Label>Select Supplier</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faUser} />
                            </InputGroup.Text>
                            <Form.Control as="select" name="supplier" onChange={handleChange} value={values.supplier}>
                              <option value="">Select supplier</option>
                              {suppliers.map((supplier, index) => (
                                <option key={index} value={supplier}>
                                  {supplier}
                                </option>
                              ))}
                            </Form.Control>
                          </InputGroup>
                          {touched.supplier && errors.supplier && <div className="text-danger">{errors.supplier}</div>}
                        </Form.Group>
                      </Col>

                      <Col xs={12} lg={6}>
                        <Form.Group controlId="purchaseDate" className="mb-4">
                          <Form.Label>Purchase Order Date</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faCalendarAlt} />
                            </InputGroup.Text>
                            <Form.Control type="date" name="purchaseDate" onChange={handleChange} value={values.purchaseDate} />
                          </InputGroup>
                          {touched.purchaseDate && errors.purchaseDate && <div className="text-danger">{errors.purchaseDate}</div>}
                        </Form.Group>
                      </Col>

                      <Col xs={12} lg={6}>
                        <Form.Group controlId="expectedDate" className="mb-4">
                          <Form.Label>Expected Delivery Date</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faCalendarAlt} />
                            </InputGroup.Text>
                            <Form.Control type="date" name="expectedDate" onChange={handleChange} value={values.expectedDate} />
                          </InputGroup>
                          {touched.expectedDate && errors.expectedDate && <div className="text-danger">{errors.expectedDate}</div>}
                        </Form.Group>
                      </Col>

                      <Col xs={12} lg={6}>
                        <Form.Group controlId="note" className="mb-4">
                          <Form.Label>Note</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faStickyNote} />
                            </InputGroup.Text>
                            <Form.Control type="text" placeholder="Enter note" name="note" onChange={handleChange} value={values.note} />
                          </InputGroup>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12}>
                        <Form.Label>Order Items</Form.Label>
                      </Col>
                    </Row>

                    <FieldArray name="orderItems">
                      {({ push, remove }) => (
                        <div>
                          {values.orderItems.map((item, index) => (
                            <Row key={index}>
                              <Col xs={12} lg={4}>
                                <Form.Group controlId={`orderItems[${index}].itemId`} className="mb-4">
                                  <Form.Label>Select Item</Form.Label>
                                  <InputGroup>
                                    <InputGroup.Text>
                                      <FontAwesomeIcon icon={faList} />
                                    </InputGroup.Text>
                                    <Form.Control as="select" name={`orderItems[${index}].itemId`} onChange={handleChange} value={item.itemId}>
                                      <option value="">Select item</option>
                                      {items.map((item, index) => (
                                        <option key={index} value={item.id}>
                                          {item.name}
                                        </option>
                                      ))}
                                    </Form.Control>
                                  </InputGroup>
                                  {touched.orderItems &&
                                    touched.orderItems[index] &&
                                    touched.orderItems[index].itemId &&
                                    errors.orderItems &&
                                    errors.orderItems[index] &&
                                    errors.orderItems[index].itemId && <div className="text-danger">{errors.orderItems[index].itemId}</div>}
                                </Form.Group>
                              </Col>

                              <Col xs={12} lg={2}>
                                <Form.Group className="mb-4">
                                  <Form.Label>Incoming</Form.Label>
                                  <InputGroup>
                                    <InputGroup.Text>{item.quantity}</InputGroup.Text>
                                  </InputGroup>
                                </Form.Group>
                              </Col>

                              <Col xs={12} lg={2}>
                                <Form.Group controlId={`orderItems[${index}].quantity`} className="mb-4">
                                  <Form.Label>Quantity</Form.Label>
                                  <InputGroup>
                                    <Form.Control
                                      type="number"
                                      placeholder="Enter quantity"
                                      name={`orderItems[${index}].quantity`}
                                      onChange={handleChange}
                                      value={item.quantity}
                                    />
                                  </InputGroup>
                                  {touched.orderItems &&
                                    touched.orderItems[index] &&
                                    touched.orderItems[index].quantity &&
                                    errors.orderItems &&
                                    errors.orderItems[index] &&
                                    errors.orderItems[index].quantity && <div className="text-danger">{errors.orderItems[index].quantity}</div>}
                                </Form.Group>
                              </Col>

                              <Col xs={12} lg={2}>
                                <Form.Group controlId={`orderItems[${index}].purchaseCost`} className="mb-4">
                                  <Form.Label>Purchase Cost</Form.Label>
                                  <InputGroup>
                                    <Form.Control
                                      type="number"
                                      placeholder="Enter cost"
                                      name={`orderItems[${index}].purchaseCost`}
                                      onChange={handleChange}
                                      value={item.purchaseCost}
                                    />
                                  </InputGroup>
                                  {touched.orderItems &&
                                    touched.orderItems[index] &&
                                    touched.orderItems[index].purchaseCost &&
                                    errors.orderItems &&
                                    errors.orderItems[index] &&
                                    errors.orderItems[index].purchaseCost && (
                                      <div className="text-danger">{errors.orderItems[index].purchaseCost}</div>
                                    )}
                                </Form.Group>
                              </Col>

                              <Col xs={12} lg={2}>
                                <Form.Group className="mb-4">
                                  <Form.Label>Amount</Form.Label>
                                  <InputGroup>
                                    <InputGroup.Text>${calculateAmount(item.quantity, item.purchaseCost)}</InputGroup.Text>
                                  </InputGroup>
                                </Form.Group>
                              </Col>

                              <Col xs={12} lg={2}>
                                <div className="mt-4">
                                  <Button type="button" variant="danger" onClick={() => remove(index)}>
                                    Remove
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                          ))}

                          <Row>
                            <Col xs={12}>
                              <div className="mt-4">
                                <Button type="button" variant="primary" onClick={() => push({ itemId: "", quantity: "", purchaseCost: "" })}>
                                  Add Item
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      )}
                    </FieldArray>

                    <Button variant="primary" type="submit" className="mt-2 button w-100">
                      Update Purchase Order
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
