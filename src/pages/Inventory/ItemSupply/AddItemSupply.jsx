import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faCubes, faBox } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, Container, InputGroup, Spinner } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import PathConstants from "../../../constants/pathConstants";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { CREATE_ITEM_SUPPLY, GET_ALL_SUPPLIERS } from "../../../graphql/inventory";
import { GET_ALL_ITEMS } from "../../../graphql/items";
import { toast } from "react-toastify";

export default function AddItemSupply() {
  const navigate = useNavigate();
  const { data: suppliersData } = useQuery(GET_ALL_SUPPLIERS);
  const { data: itemsData } = useQuery(GET_ALL_ITEMS);

  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  const [createItemSupply, { loading }] = useMutation(CREATE_ITEM_SUPPLY);

  return (
    <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
      <Container>
        <Row className="justify-content-center form-bg-image">
          <Col xs={12} lg={6} className="d-flex align-items-center justify-content-center">
            <div className="bg-white shadow-lg border rounded border-light p-4 p-lg-5 w-100">
              <div className="d-flex">
                <div className="text-start">
                  <button type="button" className="btn btn-outline-primary" onClick={() => navigate("/" + PathConstants.ITEM_SUPPLY)}>
                    <FontAwesomeIcon icon={faChevronLeft} /> Back
                  </button>
                </div>
                <div className="text-center text-md-center mt-md-0 flex-grow-1">
                  <h3 className="mb-0">Add Item Supply</h3>
                </div>
              </div>

              <Formik
                initialValues={{
                  supplier: "",
                  item: "",
                  unitCost: 0,
                  active: true,
                }}
                validationSchema={Yup.object({
                  supplier: Yup.string().required("Required"),
                  item: Yup.string().required("Required"),
                  unitCost: Yup.number().min(0, "Unit cost cannot be negative").required("Required"),
                  active: Yup.boolean().required("Required"),
                })}
                onSubmit={(values) => {
                  createItemSupply({
                    variables: {
                      itemSupplyInput: {
                        supplierId: Number(values.supplier),
                        itemId: Number(values.item),
                        unitCost: values.unitCost,
                        active: values.active,
                      },
                    },
                  }).then((res) => {
                    console.log(res);
                    toast.success("Item Supply added successfully");
                  });
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
                              value={selectedSupplier}
                              placeholder="Search by ID, name"
                              onChange={(e) => {
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
                        <Form.Group id="item" className="mb-4">
                          <Form.Label>Items</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faBox} />
                            </InputGroup.Text>
                            <Form.Control
                              list="items"
                              as="input"
                              name="item"
                              value={selectedItem}
                              placeholder="Search by ID, name"
                              onChange={(e) => {
                                setSelectedItem(e.target.value);
                                setFieldValue("item", e.target.value.split("-")[0]);
                              }}
                            ></Form.Control>
                            <datalist id="items">
                              {itemsData?.GetAllItems.map((item) => (
                                <option key={item.id} value={item.id + "-" + item.name}>
                                  {item.name}
                                </option>
                              ))}
                            </datalist>
                          </InputGroup>

                          {touched.item && errors.item && <div className="text-danger">{errors.item}</div>}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12}>
                        <Form.Group id="unitCost" className="mb-4">
                          <Form.Label>Unit Cost</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faCubes} /> &nbsp; Rs.
                            </InputGroup.Text>
                            <Form.Control
                              type="number"
                              placeholder="Enter unit cost"
                              name="unitCost"
                              value={values.unitCost}
                              onChange={handleChange}
                            />
                          </InputGroup>
                          {touched.unitCost && errors.unitCost && <div className="text-danger">{errors.unitCost}</div>}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12}>
                        <Form.Group id="active" className="mb-4">
                          <Form.Check
                            type="switch"
                            id="active-switch"
                            label="Is Active"
                            name="active"
                            checked={values.active}
                            onChange={handleChange}
                          />
                          {touched.active && errors.active && <div className="text-danger">{errors.active}</div>}
                        </Form.Group>
                      </Col>
                    </Row>

                    {loading ? (
                      <Button variant="primary" type="submit" className="button w-100" disabled>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Loading...
                      </Button>
                    ) : (
                      <Button variant="primary" type="submit" className="button w-100">
                        Add Item Supply
                      </Button>
                    )}
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
