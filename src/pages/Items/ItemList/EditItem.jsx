import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarcode, faBox, faChevronLeft, faCubes, faFileAlt, faPen } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, Container, InputGroup, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_BRANDS, GET_ALL_CATEGORIES, UPDATE_ITEM } from "../../../graphql/items"; // Replace with your actual GraphQL mutation
import { toast } from "react-toastify";
import { useState } from "react";
import { GrClose } from "react-icons/gr";
import SearchBox from "react-search-box";
import PathConstants from "../../../constants/pathConstants";

export default function EditItem() {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state.item;
  console.log(item);

  const [updateItem, { loading, error }] = useMutation(UPDATE_ITEM);
  const { data: brandData } = useQuery(GET_ALL_BRANDS);
  const { data: categoryData } = useQuery(GET_ALL_CATEGORIES);

  const [selectedBrand, setSelectedBrand] = useState(item.brand.name);
  const [selectedCategory, setSelectedCategory] = useState(item.category.name);

  if (error) {
    console.log(error);
    toast.error("Error updating item");
  }

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
                  <h3 className="mb-0">Update Item</h3>
                </div>
              </div>

              <Formik
                initialValues={{
                  name: item.name,
                  category: String(item.category.id),
                  brand: String(item.brand.id),
                  description: item.description || "",
                  unitType: item.unitOfMeasure,
                  barcode: item.barcodeNo,
                  itemCode: item.itemCode,
                  returnable: item.returnable,
                  active: item.active,
                  reorderLevel: item.reorderLevel,
                }}
                validationSchema={Yup.object({
                  name: Yup.string().required("Required"),
                  category: Yup.string().required("Required"),
                  brand: Yup.string().required("Required"),
                  description: Yup.string(),
                  unitType: Yup.string().required("Required"),
                  barcode: Yup.string().required("Required"),
                  itemCode: Yup.string().required("Required"),
                  returnable: Yup.boolean().required("Required"),
                  active: Yup.boolean().required("Required"),
                  reorderLevel: Yup.number().required("Required"),
                })}
                onSubmit={(values) => {
                  console.log("values");
                  updateItem({
                    variables: {
                      itemInput: {
                        id: item.id,
                        name: values.name,
                        itemCode: values.itemCode,
                        barcodeNo: values.barcode,
                        description: values.description,
                        categoryId: Number(values.category),
                        brandId: Number(values.brand),
                        unitOfMeasure: values.unitType,
                        returnable: values.returnable,
                        active: values.active,
                        reorderLevel: values.reorderLevel,
                      },
                    },
                  }).then((res) => {
                    console.log(res);
                    toast.success("Item updated successfully");
                  });
                }}
              >
                {({ handleSubmit, handleChange, setFieldValue, values, errors, touched }) => (
                  <Form className="mt-4" onSubmit={handleSubmit}>
                    <Row>
                      <Col xs={12}>
                        <Form.Group id="name" className="mb-4">
                          <Form.Label>Name</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faPen} />
                            </InputGroup.Text>
                            <Form.Control
                              autoFocus
                              required
                              type="text"
                              value={values.name}
                              placeholder="Enter item name"
                              name="name"
                              onChange={handleChange}
                            />
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
                            {selectedBrand ? (
                              <>
                                <span className="row border border-dark">
                                  <span className="col-8 text-start">{selectedBrand}</span>
                                  <span className="col-2" onClick={() => setSelectedBrand("")}>
                                    <GrClose />
                                  </span>
                                </span>
                              </>
                            ) : (
                              <>
                                <SearchBox
                                  data={brandData?.GetAllBrands.map((brand) => ({
                                    key: brand.id,
                                    value: brand.name,
                                  }))}
                                  placeholder="Search brand"
                                  value={values.brand}
                                  onSelect={(item) => {
                                    setSelectedBrand(item.item.value);
                                    setFieldValue("brand", item.item.key);
                                  }}
                                  inputBoxBorderColor="gray"
                                />
                              </>
                            )}
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
                            {selectedCategory ? (
                              <>
                                <div className="row border border-dark">
                                  <span className="col-8 text-start">{selectedCategory}</span>
                                  <span className="col-2" onClick={() => setSelectedCategory("")}>
                                    <GrClose />
                                  </span>
                                </div>
                              </>
                            ) : (
                              <SearchBox
                                data={categoryData?.GetAllCategories.map((category) => ({
                                  key: category.id,
                                  value: category.name,
                                }))}
                                placeholder="Search category"
                                value={values.category}
                                onSelect={(category) => {
                                  setSelectedCategory(category.item.value);
                                  setFieldValue("category", category.item.key);
                                }}
                                inputBoxBorderColor="gray"
                              />
                            )}
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
                            <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Enter description"
                              name="description"
                              value={values.description}
                              onChange={handleChange}
                            />
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
                            <Form.Control as="select" name="unitType" value={values.unitType} onChange={handleChange}>
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

                      <Col xs={12} lg={6}>
                        <Form.Group id="reorderLevel" className="mb-4">
                          <Form.Label>Reorder Level</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>Level</InputGroup.Text>
                            <Form.Control
                              type="number"
                              placeholder="Enter reorder level"
                              name="reorderLevel"
                              value={values.reorderLevel}
                              onChange={handleChange}
                            />
                          </InputGroup>
                          {touched.reorderLevel && errors.reorderLevel && <div className="text-danger">{errors.reorderLevel}</div>}
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
                            <Form.Control
                              required
                              type="text"
                              placeholder="Enter barcode"
                              name="barcode"
                              value={values.barcode}
                              onChange={handleChange}
                            />
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
                            <Form.Control
                              required
                              type="text"
                              placeholder="Enter item code"
                              name="itemCode"
                              value={values.itemCode}
                              onChange={handleChange}
                            />
                          </InputGroup>
                          {touched.itemCode && errors.itemCode && <div className="text-danger">{errors.itemCode}</div>}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} lg={6}>
                        <Form.Group className="mb-4">
                          <Form.Label>Returnable</Form.Label>
                          <Form.Check
                            type="switch"
                            id="returnable-switch"
                            label="Is Returnable"
                            name="returnable"
                            value={values.returnable}
                            checked={values.returnable}
                            onChange={handleChange}
                          />
                          {touched.returnable && errors.returnable && <div className="text-danger">{errors.returnable}</div>}
                        </Form.Group>
                      </Col>

                      <Col xs={12} lg={6}>
                        <Form.Group className="mb-4">
                          <Form.Label>Active</Form.Label>
                          <Form.Check
                            type="switch"
                            id="returnable-switch"
                            label="Is Active"
                            name="active"
                            value={values.active}
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
                        Update Item
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
