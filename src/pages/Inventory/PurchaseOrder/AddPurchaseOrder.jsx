import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faStickyNote, faChevronLeft, faBox } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, Container, InputGroup, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import PathConstants from "../../../constants/pathConstants";
import ReactSearchBox from "react-search-box";
import { FaShoppingBasket } from "react-icons/fa";
import { CREATE_PURCHASE_ORDER, GET_ACTIVE_ITEM_SUPPLIES_BY_SUPPLIER_ID, GET_ALL_SUPPLIERS } from "../../../graphql/inventory";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Skeleton from "react-loading-skeleton";

export default function AddPurchaseOrder() {
  const navigate = useNavigate();
  const { data: suppliersData, loading: suppliersLoading } = useQuery(GET_ALL_SUPPLIERS);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [searchSupplier, setSearchSupplier] = useState("");

  const { data: itemSupplies, loading: itemsLoading } = useQuery(GET_ACTIVE_ITEM_SUPPLIES_BY_SUPPLIER_ID, {
    variables: {
      supplierId: Number(selectedSupplier.split("-")[0]),
    },
    skip: !selectedSupplier,
  });

  const items = itemSupplies?.GetActiveItemSuppliesBySupplierId.map((item) => ({
    key: item.id.toString(),
    itemSupplyId: Number(item.id),
    itemId: item.item.id,
    unitCost: item.unitCost,
    name: item.item.name,
    value: item.item.name,
  }));

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
        quantity: Yup.number().min(1, "minimum number is 1").required("Required"),
        purchaseCost: Yup.number().min(0).required("Required"),
      })
    ),
  });

  // Calculate amount for each order item
  const calculateAmount = (quantity, purchaseCost) => {
    return quantity * purchaseCost;
  };

  const [createPurchaseOrder, { loading: createPurchaseOrderLoading }] = useMutation(CREATE_PURCHASE_ORDER);

  if (suppliersLoading) return <Skeleton count={6} />;

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
                {({ handleSubmit, handleChange, setFieldValue, values, errors, touched }) => (
                  <Form className="mt-4" onSubmit={handleSubmit}>
                    <Row>
                      <Col xs={12} lg={6}>
                        <Form.Group id="supplier" className="mb-4">
                          <Form.Label>Supplier</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faBox} />
                            </InputGroup.Text>
                            <Form.Control
                              list="suppliers"
                              as="input"
                              name="supplier"
                              value={searchSupplier}
                              placeholder="Search by ID, name"
                              onChange={(e) => {
                                setSearchSupplier(e.target.value);
                                setFieldValue("orderItems", []);
                              }}
                              onSelect={(e) => {
                                setSelectedSupplier(e.target.value);
                                setFieldValue("supplier", e.target.value.split("-")[0]);
                              }}
                            ></Form.Control>
                            <datalist id="suppliers">
                              {suppliersData?.GetAllSuppliers.map((supplier) => (
                                <option key={supplier.id} value={supplier.id + "-" + supplier.name}>
                                  {supplier.name}
                                </option>
                              ))}
                            </datalist>
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
                          <th>Unit Cost</th>
                          <th>Purchase Cost</th>
                          <th>Amount</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <FieldArray name="orderItems">
                          {({ push, remove }) => (
                            <>
                              {values?.orderItems.map((item, index) => (
                                <tr key={index}>
                                  {!(item.itemId && items.find((i) => i.itemId === item.itemId)) ? (
                                    <td colSpan={4}>
                                      <Form.Group controlId={`orderItems[${index}].itemId`} className="mb-0">
                                        <ReactSearchBox
                                          placeholder="Search Products"
                                          data={items}
                                          onSelect={(selectedItem) => {
                                            console.log(selectedItem);
                                            const updatedValues = [...values.orderItems];
                                            updatedValues[index].itemId = selectedItem.item.itemId;
                                            updatedValues[index].name = selectedItem.item.value;
                                            updatedValues[index].unitCost = selectedItem.item.unitCost;
                                            updatedValues[index].itemSupplyId = selectedItem.item.itemSupplyId;
                                            setFieldValue(`orderItems`, updatedValues);
                                          }}
                                          autoFocus
                                          leftIcon={<FaShoppingBasket />}
                                          iconBoxSize="48px"
                                          inputFontSize="16px"
                                          dropdownBorderColor="#002a54"
                                          dropdownHoverColor="#c4dcf4"
                                        />
                                      </Form.Group>
                                      {touched.orderItems && errors.orderItems && errors.orderItems[index] && errors.orderItems[index].itemId && (
                                        <div className="text-danger">{errors.orderItems[index].itemId}</div>
                                      )}
                                    </td>
                                  ) : (
                                    <td>{item.name}</td>
                                  )}

                                  {item.itemId && items.find((i) => i.itemId === item.itemId) && (
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
                                      <td>{item.unitCost}</td>
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
                                  <Button
                                    disabled={!itemSupplies}
                                    type="button"
                                    variant="primary"
                                    onClick={() => push({ itemId: "", quantity: "", purchaseCost: "" })}
                                  >
                                    {itemsLoading ? "Loading..." : "Add Item"}
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
