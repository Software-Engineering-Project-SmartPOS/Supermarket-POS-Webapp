import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faBarcode, faCubes, faPen, faBox, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, Container, InputGroup } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import PathConstants from "../../../constants/pathConstants";

export default function AddItem() {
  const navigate = useNavigate();
  return (
    <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
      <Container>
        <Row className="justify-content-center form-bg-image">
          <Col xs={12} lg={6} className="d-flex align-items-center justify-content-center">
            <div className="bg-white shadow-lg border rounded border-light p-4 p-lg-5 w-100">
              <div className="d-flex">
                <div className="text-start">
                  <button type="button" className="btn btn-outline-primary" onClick={() => navigate("/" + PathConstants.ITEM_LIST)}>
                    <FontAwesomeIcon icon={faChevronLeft} /> Back
                  </button>
                </div>
                <div className="text-center text-md-center mt-md-0 flex-grow-1">
                  <h3 className="mb-0">Add Item</h3>
                </div>
              </div>

              <Formik
                initialValues={{
                  name: "",
                  category: "",
                  brand: "",
                  description: "",
                  unitType: "KILOGRAM", // Default to KILOGRAM
                  price: "",
                  cost: "",
                  barcode: "",
                  itemCode: "", // New itemCode field
                }}
                validationSchema={Yup.object({
                  name: Yup.string().required("Required"),
                  category: Yup.string().required("Required"),
                  brand: Yup.string().required("Required"),
                  description: Yup.string(),
                  unitType: Yup.string().required("Required"),
                  price: Yup.number().required("Required"),
                  cost: Yup.number().required("Required"),
                  barcode: Yup.string().required("Required"),
                  itemCode: Yup.string().required("Required"), // Validation for itemCode
                })}
                onSubmit={(values) => {
                  console.log(values);
                  // Add your logic to submit the item data here
                  // After adding the item, you can navigate to a success page or another route
                }}
              >
                {({ handleSubmit, handleChange, values, errors, touched }) => (
                  <Form className="mt-4" onSubmit={handleSubmit}>
                    <Row>
                      <Col xs={12}>
                        <Form.Group id="name" className="mb-4">
                          <Form.Label>Name</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faPen} />
                            </InputGroup.Text>
                            <Form.Control autoFocus required type="text" placeholder="Enter item name" name="name" onChange={handleChange} />
                          </InputGroup>
                          {touched.name && errors.name && <div className="text-danger">{errors.name}</div>}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12} lg={6}>
                        <Form.Group id="brand" className="mb-4">
                          <Form.Label>Brand</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faBox} />
                            </InputGroup.Text>
                            <Form.Control as="select" required name="brand" onChange={handleChange}>
                              <option value="">Select brand</option>
                              {/* Add brand options */}
                              <option value="coca cola">Coca Cola</option>
                            </Form.Control>
                          </InputGroup>
                          {touched.brand && errors.brand && <div className="text-danger">{errors.brand}</div>}
                        </Form.Group>
                      </Col>

                      <Col xs={12} lg={6}>
                        <Form.Group id="category" className="mb-4">
                          <Form.Label>Category</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faBox} />
                            </InputGroup.Text>
                            <Form.Control as="select" required name="category" onChange={handleChange}>
                              <option value="">Select category</option>
                              {/* Add category options */}
                            </Form.Control>
                          </InputGroup>
                          {touched.category && errors.category && <div className="text-danger">{errors.category}</div>}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12}>
                        <Form.Group id="description" className="mb-4">
                          <Form.Label>Description</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faFileAlt} />
                            </InputGroup.Text>
                            <Form.Control as="textarea" rows={3} placeholder="Enter description" name="description" onChange={handleChange} />
                          </InputGroup>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12} lg={6}>
                        <Form.Group id="unitType" className="mb-4">
                          <Form.Label>Unit Type</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faCubes} />
                            </InputGroup.Text>
                            <Form.Control as="select" name="unitType" onChange={handleChange}>
                              <option value="KILOGRAM">KILOGRAM</option>
                              <option value="GRAMS">GRAMS</option>
                              <option value="LITERS">LITERS</option>
                              <option value="MILLILITERS">MILLILITERS</option>
                              <option value="METERS">METERS</option>
                              <option value="MILLIMETERS">MILLIMETERS</option>
                              <option value="COUNT">COUNT</option>
                            </Form.Control>
                            {touched.unitType && errors.unitType && <div className="text-danger">{errors.unitType}</div>}
                          </InputGroup>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12} lg={6}>
                        <Form.Group id="price" className="mb-4">
                          <Form.Label>Price</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>Rs.</InputGroup.Text>
                            <Form.Control type="number" placeholder="Enter price" name="price" onChange={handleChange} />
                          </InputGroup>
                          {touched.price && errors.price && <div className="text-danger">{errors.price}</div>}
                        </Form.Group>
                      </Col>

                      <Col xs={12} lg={6}>
                        <Form.Group id="cost" className="mb-4">
                          <Form.Label>Cost</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>Rs.</InputGroup.Text>
                            <Form.Control type="number" placeholder="Enter cost" name="cost" onChange={handleChange} />
                          </InputGroup>
                          {touched.cost && errors.cost && <div className="text-danger">{errors.cost}</div>}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12} lg={6}>
                        <Form.Group id="barcode" className="mb-4">
                          <Form.Label>Barcode</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faBarcode} />
                            </InputGroup.Text>
                            <Form.Control required type="text" placeholder="Enter barcode" name="barcode" onChange={handleChange} />
                          </InputGroup>
                          {touched.barcode && errors.barcode && <div className="text-danger">{errors.barcode}</div>}
                        </Form.Group>
                      </Col>

                      <Col xs={12} lg={6}>
                        <Form.Group id="itemCode" className="mb-4">
                          <Form.Label>Item Code</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faBarcode} />
                            </InputGroup.Text>
                            <Form.Control required type="text" placeholder="Enter item code" name="itemCode" onChange={handleChange} />
                          </InputGroup>
                          {touched.itemCode && errors.itemCode && <div className="text-danger">{errors.itemCode}</div>}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Button variant="primary" type="submit" className="button w-100">
                      Add Item
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
