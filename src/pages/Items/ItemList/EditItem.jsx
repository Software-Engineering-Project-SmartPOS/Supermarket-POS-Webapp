import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faBarcode, faCubes, faPen, faBox, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, Container, InputGroup } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import PathConstants from "../../../constants/pathConstants";

export default function EditItem() {
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
                  <h3 className="mb-0">Edit Item</h3>
                </div>
              </div>
              <Formik
                initialValues={{
                  name: "Sample Item",
                  category: "Electronics",
                  brand: "Sample Brand",
                  description: "This is a sample item description.",
                  isAvailableForSale: true,
                  isReturnable: false,
                  unitType: "each",
                  price: "99.99",
                  cost: "49.99",
                  barcode: "123456789",
                  sku: "SAMPLE123",
                  trackStock: false,
                  stockLevel: "100",
                  lowStockNumber: "10",
                }}
                validationSchema={Yup.object({
                  name: Yup.string().required("Required"),
                  category: Yup.string().required("Required"),
                  brand: Yup.string().required("Required"),
                  description: Yup.string(),
                  isAvailableForSale: Yup.boolean(),
                  isReturnable: Yup.boolean(),
                  unitType: Yup.string().required("Required"),
                  price: Yup.number().required("Required"),
                  cost: Yup.number().required("Required"),
                  barcode: Yup.string().required("Required"),
                  sku: Yup.string().required("Required"),
                  trackStock: Yup.boolean(),
                  stockLevel: Yup.number().when("trackStock", {
                    is: true,
                    then: Yup.number().required("Required when tracking stock"),
                    otherwise: Yup.number(),
                  }),
                  lowStockNumber: Yup.number().when("trackStock", {
                    is: true,
                    then: Yup.number().required("Required when tracking stock"),
                    otherwise: Yup.number(),
                  }),
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
                              {/* Add category options */}
                              <option value="coca cola">coca cola</option>
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
                        <Form.Group id="isAvailableForSale" className="mb-4">
                          <Form.Check type="checkbox" label="Item Available for Sale" name="isAvailableForSale" onChange={handleChange} />
                        </Form.Group>
                      </Col>

                      <Col xs={12} lg={6}>
                        <Form.Group id="isReturnable" className="mb-4">
                          <Form.Check type="checkbox" label="Returnable" name="isReturnable" onChange={handleChange} />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12} lg={6}>
                        <Form.Group id="unitType" className="mb-4">
                          <Form.Label>Unit Type</Form.Label>
                          <InputGroup>
                            <Form.Check
                              inline
                              type="radio"
                              label="Each"
                              name="unitType"
                              value="each"
                              onChange={handleChange}
                              checked={values.unitType === "each"}
                            />
                            <Form.Check
                              inline
                              type="radio"
                              label="Weight/Volume"
                              name="unitType"
                              value="weightVolume"
                              onChange={handleChange}
                              checked={values.unitType === "weightVolume"}
                            />
                          </InputGroup>
                          {touched.unitType && errors.unitType && <div className="text-danger">{errors.unitType}</div>}
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
                        <Form.Group id="sku" className="mb-4">
                          <Form.Label>SKU</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faBarcode} />
                            </InputGroup.Text>
                            <Form.Control required type="text" placeholder="Enter SKU" name="sku" onChange={handleChange} />
                          </InputGroup>
                          {touched.sku && errors.sku && <div className="text-danger">{errors.sku}</div>}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12}>
                        <Form.Group id="trackStock" className="mb-4">
                          <Form.Check type="switch" label="Track Stock" name="trackStock" onChange={handleChange} />
                        </Form.Group>
                      </Col>
                    </Row>

                    {values.trackStock && (
                      <Row>
                        <Col xs={12} lg={6}>
                          <Form.Group id="stockLevel" className="mb-4">
                            <Form.Label>Stock Level</Form.Label>
                            <InputGroup>
                              <InputGroup.Text>
                                <FontAwesomeIcon icon={faCubes} />
                              </InputGroup.Text>
                              <Form.Control type="number" placeholder="Enter stock level" name="stockLevel" onChange={handleChange} />
                            </InputGroup>
                            {touched.stockLevel && errors.stockLevel && <div className="text-danger">{errors.stockLevel}</div>}
                          </Form.Group>
                        </Col>

                        <Col xs={12} lg={6}>
                          <Form.Group id="lowStockNumber" className="mb-4">
                            <Form.Label>Low Stock Number</Form.Label>
                            <InputGroup>
                              <InputGroup.Text>
                                <FontAwesomeIcon icon={faCubes} />
                              </InputGroup.Text>
                              <Form.Control type="number" placeholder="Enter low stock number" name="lowStockNumber" onChange={handleChange} />
                            </InputGroup>
                            {touched.lowStockNumber && errors.lowStockNumber && <div className="text-danger">{errors.lowStockNumber}</div>}
                          </Form.Group>
                        </Col>
                      </Row>
                    )}

                    <Button variant="primary" type="submit" className="button w-100">
                      Update Item
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
