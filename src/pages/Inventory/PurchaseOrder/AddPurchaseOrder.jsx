import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendarAlt, faStickyNote, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, Container, InputGroup, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Formik, FieldArray, useFormik } from "formik";
import * as Yup from "yup";
import PathConstants from "../../../constants/pathConstants";
import ReactSearchBox from "react-search-box";
import { FaShoppingBasket } from "react-icons/fa";

export default function AddPurchaseOrder() {
  const navigate = useNavigate();

  // Define a list of suppliers and items (sample data)
  const suppliers = ["Supplier A", "Supplier B", "Supplier C"];
  const items = [
    { id: 1, name: "Item 1", inStock: 100, incoming: 50, purchaseCost: 10 },
    { id: 2, name: "Item 2", inStock: 75, incoming: 25, purchaseCost: 15 },
    { id: 3, name: "Item 3", inStock: 120, incoming: 30, purchaseCost: 8 },
  ];

  // Initial values for the form
  const initialValues = {
    supplier: "",
    purchaseDate: "",
    expectedDate: "",
    note: "",
    orderItems: [],
  };

  // Validation schema
  const validationSchema = Yup.object({
    supplier: Yup.string().required("Required"),
    purchaseDate: Yup.date().required("Required"),
    expectedDate: Yup.date().required("Required"),
    note: Yup.string(),
    orderItems: Yup.array().of(
      Yup.object().shape({
        itemId: Yup.string().required("Required"),
        quantity: Yup.number().required("Required"),
        purchaseCost: Yup.number().required("Required"),
      })
    ),
  });

  // Calculate amount for each order item
  const calculateAmount = (quantity, purchaseCost) => {
    return quantity * purchaseCost;
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

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
                  <h3 className="mb-0">Add Purchase Order</h3>
                </div>
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  console.log(values);
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

                    <Table responsive hover>
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>Quantity</th>
                          <th>Purchase Cost</th>
                          <th>Amount</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <FieldArray name="orderItems">
                          {({ push, remove }) => (
                            <>
                              {values.orderItems.map((item, index) => (
                                <tr key={index}>
                                  {!(item.itemId && items.find((i) => i.name === item.itemId)) ? (
                                    <td colSpan={4}>
                                      <Form.Group controlId={`orderItems[${index}].itemId`} className="mb-0">
                                        <ReactSearchBox
                                          placeholder="Search Products"
                                          data={items.map((item) => ({
                                            key: item.id.toString(),
                                            value: item.name,
                                          }))}
                                          onSelect={(selectedItem) => {
                                            const updatedValues = [...values.orderItems];
                                            updatedValues[index].itemId = selectedItem.value;
                                            formik.setFieldValue(`orderItems`, updatedValues);
                                          }}
                                          onChange={(value) => {
                                            const updatedValues = [...values.orderItems];
                                            updatedValues[index].itemId = value;
                                            formik.setFieldValue(`orderItems`, updatedValues);
                                          }}
                                          autoFocus
                                          leftIcon={<FaShoppingBasket />}
                                          // inputBorderColor="#002a54"
                                          iconBoxSize="48px"
                                          inputFontSize="16px"
                                          // inputHeight="48px"
                                          dropdownBorderColor="#002a54"
                                          dropdownHoverColor="#c4dcf4"
                                        />
                                      </Form.Group>
                                      {touched.orderItems && errors.orderItems && errors.orderItems[index] && errors.orderItems[index].itemId && (
                                        <div className="text-danger">{errors.orderItems[index].itemId}</div>
                                      )}
                                    </td>
                                  ) : (
                                    <td>{item.itemId}</td>
                                  )}

                                  {item.itemId && items.find((i) => i.name === item.itemId) && (
                                    <>
                                      <td>
                                        <Form.Group controlId={`orderItems[${index}].quantity`} className="mb-0">
                                          <Form.Control
                                            type="number"
                                            placeholder="Enter quantity"
                                            name={`orderItems[${index}].quantity`}
                                            onChange={handleChange}
                                            value={item.quantity}
                                          />
                                        </Form.Group>
                                        {touched.orderItems && errors.orderItems && errors.orderItems[index] && errors.orderItems[index].quantity && (
                                          <div className="text-danger">{errors.orderItems[index].quantity}</div>
                                        )}
                                      </td>
                                      <td>
                                        <Form.Group controlId={`orderItems[${index}].purchaseCost`} className="mb-0">
                                          <Form.Control
                                            type="number"
                                            placeholder="Enter cost"
                                            name={`orderItems[${index}].purchaseCost`}
                                            onChange={handleChange}
                                            value={item.purchaseCost}
                                          />
                                        </Form.Group>
                                        {touched.orderItems &&
                                          errors.orderItems &&
                                          errors.orderItems[index] &&
                                          errors.orderItems[index].purchaseCost && (
                                            <div className="text-danger">{errors.orderItems[index].purchaseCost}</div>
                                          )}
                                      </td>
                                      <td>Rs. {calculateAmount(item.quantity, item.purchaseCost)}</td>
                                    </>
                                  )}
                                  <td>
                                    <Button type="button" variant="danger" onClick={() => remove(index)}>
                                      Remove
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                              <tr>
                                <td colSpan={5}>
                                  <Button type="button" variant="primary" onClick={() => push({ itemId: "", quantity: "", purchaseCost: "" })}>
                                    Add Item
                                  </Button>
                                </td>
                              </tr>
                            </>
                          )}
                        </FieldArray>
                      </tbody>
                    </Table>

                    <Button variant="primary" type="submit" className="mt-2 button w-100">
                      Create Purchase Order
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
