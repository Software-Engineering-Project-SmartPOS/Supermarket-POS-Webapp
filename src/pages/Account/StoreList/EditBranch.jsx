import React from "react";
import { Container, Row, Col, Form, InputGroup, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faCity, faHome, faLocationArrow, faPhone, faMapMarker, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import PathConstants from "../../../constants/pathConstants";

export default function EditBranch() {
  const navigate = useNavigate();
  const location = useLocation();
  const branch = location.state.branch;

  const initialValues = branch;

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    telephone: Yup.string().required("Telephone is required"),
    houseNumber: Yup.string().required("House Number is required"),
    street: Yup.string().required("Street is required"),
    city: Yup.string().required("City is required"),
    district: Yup.string().required("District is required"),
    postalCode: Yup.string().required("Postal Code is required"),
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
      <Container>
        <Row className="justify-content-center form-bg-image">
          <Col xs={12} lg={7} className="d-flex align-items-center justify-content-center">
            <div className="bg-white shadow-lg border rounded border-light px-5 py-2 w-100">
              <div className="d-flex">
                <div className="text-start" onClick={() => navigate("/" + PathConstants.STORES)}>
                  <button type="button" className="btn btn-outline-primary">
                    <FontAwesomeIcon icon={faChevronLeft} /> Back
                  </button>
                </div>
                <div className="text-center text-md-center mt-md-0 flex-grow-1">
                  <h3 className="mb-0">Add Branch</h3>
                </div>
              </div>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ handleSubmit, handleChange, values, errors, touched }) => (
                  <Form className="mt-4" onSubmit={handleSubmit}>
                    <Form.Group controlId="name" className="mb-4">
                      <Form.Label>Name</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faBuilding} />
                        </InputGroup.Text>
                        <Form.Control type="text" name="name" onChange={handleChange} value={values.name} placeholder="Enter Name" />
                      </InputGroup>
                      {touched.name && errors.name && <div className="text-danger">{errors.name}</div>}
                    </Form.Group>

                    <Form.Group controlId="telephone" className="mb-4">
                      <Form.Label>Telephone</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faPhone} />
                        </InputGroup.Text>
                        <Form.Control type="text" name="telephone" onChange={handleChange} value={values.telephone} placeholder="Enter Telephone" />
                      </InputGroup>
                      {touched.telephone && errors.telephone && <div className="text-danger">{errors.telephone}</div>}
                    </Form.Group>

                    <Row>
                      <Col xs={12} lg={4}>
                        <Form.Group controlId="houseNumber" className="mb-4">
                          <Form.Label>House Number</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faHome} />
                            </InputGroup.Text>
                            <Form.Control
                              type="text"
                              name="houseNumber"
                              onChange={handleChange}
                              value={values.houseNumber}
                              placeholder="Enter House Number"
                            />
                          </InputGroup>
                          {touched.houseNumber && errors.houseNumber && <div className="text-danger">{errors.houseNumber}</div>}
                        </Form.Group>
                      </Col>

                      <Col xs={12} lg={8}>
                        <Form.Group controlId="street" className="mb-4">
                          <Form.Label>Street</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faMapMarker} />
                            </InputGroup.Text>
                            <Form.Control type="text" name="street" onChange={handleChange} value={values.street} placeholder="Enter Street" />
                          </InputGroup>
                          {touched.street && errors.street && <div className="text-danger">{errors.street}</div>}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12} lg={6}>
                        <Form.Group controlId="city" className="mb-4">
                          <Form.Label>City</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faCity} />
                            </InputGroup.Text>
                            <Form.Control type="text" name="city" onChange={handleChange} value={values.city} placeholder="Enter City" />
                          </InputGroup>
                          {touched.city && errors.city && <div className="text-danger">{errors.city}</div>}
                        </Form.Group>
                      </Col>
                      <Col xs={12} lg={6}>
                        <Form.Group controlId="district" className="mb-4">
                          <Form.Label>District</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faLocationArrow} />
                            </InputGroup.Text>
                            <Form.Control type="text" name="district" onChange={handleChange} value={values.district} placeholder="Enter District" />
                          </InputGroup>
                          {touched.district && errors.district && <div className="text-danger">{errors.district}</div>}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group controlId="postalCode" className="mb-4">
                      <Form.Label>Postal Code</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faLocationArrow} />
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="postalCode"
                          onChange={handleChange}
                          value={values.postalCode}
                          placeholder="Enter Postal Code"
                        />
                      </InputGroup>
                      {touched.postalCode && errors.postalCode && <div className="text-danger">{errors.postalCode}</div>}
                    </Form.Group>

                    {loading ? (
                      <Button variant="primary" type="submit" className="button w-100" disabled>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Loading...
                      </Button>
                    ) : (
                      <Button variant="primary" type="submit" className="button w-100">
                        Add Branch
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
