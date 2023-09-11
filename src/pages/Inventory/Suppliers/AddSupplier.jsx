import React from "react";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faUser, faEnvelope, faPhone, faMapMarker, faCity, faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import PathConstants from "../../../constants/pathConstants";

export default function AddSupplier() {
  const navigate = useNavigate();

  const initialValues = {
    supplierName: "",
    contact: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    district: "",
    note: "",
  };

  const validationSchema = Yup.object({
    supplierName: Yup.string().required("Supplier name is required"),
    contact: Yup.string().required("Contact is required"),
    email: Yup.string().email("Invalid email address"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    postalCode: Yup.string().required("Postal/zip code is required"),
    district: Yup.string().required("District is required"),
    note: Yup.string(),
  });

  const handleSubmit = (values) => {
    console.log(values);
    // Add your logic to submit supplier data here
    // After adding the supplier, you can navigate to a success page or another route
    navigate("/success");
  };

  return (
    <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
      <Container>
        <Row className="justify-content-center form-bg-image">
          <Col xs={12} lg={6} className="d-flex align-items-center justify-content-center">
            <div className="bg-white shadow-lg border rounded border-light px-5 py-2 w-100">
              <div className="d-flex">
                <div className="text-start" onClick={() => navigate("/" + PathConstants.SUPPLIERS)}>
                  <button type="button" className="btn btn-outline-primary">
                    <FontAwesomeIcon icon={faChevronLeft} /> Back
                  </button>
                </div>
                <div className="text-center text-md-center mt-md-0 flex-grow-1">
                  <h3 className="mb-0">Add Supplier</h3>
                </div>
              </div>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ handleSubmit, handleChange, values, errors, touched }) => (
                  <Form className="mt-4" onSubmit={handleSubmit}>
                    <Row>
                      <Col xs={12}>
                        <Form.Group controlId="supplierName" className="mb-4">
                          <Form.Label>Supplier Name</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faUser} />
                            </InputGroup.Text>
                            <Form.Control
                              type="text"
                              name="supplierName"
                              onChange={handleChange}
                              value={values.supplierName}
                              placeholder="Enter Supplier Name"
                            />
                          </InputGroup>
                          {touched.supplierName && errors.supplierName && <div className="text-danger">{errors.supplierName}</div>}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12} lg={6}>
                        <Form.Group controlId="contact" className="mb-4">
                          <Form.Label>Contact</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faUser} />
                            </InputGroup.Text>
                            <Form.Control type="text" name="contact" onChange={handleChange} value={values.contact} placeholder="Enter Contact" />
                          </InputGroup>
                          {touched.contact && errors.contact && <div className="text-danger">{errors.contact}</div>}
                        </Form.Group>
                      </Col>

                      <Col xs={12} lg={6}>
                        <Form.Group controlId="email" className="mb-4">
                          <Form.Label>Email</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faEnvelope} />
                            </InputGroup.Text>
                            <Form.Control type="email" name="email" onChange={handleChange} value={values.email} placeholder="Enter Email" />
                          </InputGroup>
                          {touched.email && errors.email && <div className="text-danger">{errors.email}</div>}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12}>
                        <Form.Group controlId="address" className="mb-4">
                          <Form.Label>Address</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faMapMarker} />
                            </InputGroup.Text>
                            <Form.Control type="text" name="address" onChange={handleChange} value={values.address} placeholder="Enter Address" />
                          </InputGroup>
                          {touched.address && errors.address && <div className="text-danger">{errors.address}</div>}
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
                        <Form.Group controlId="postalCode" className="mb-4">
                          <Form.Label>Postal/Zip Code</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faLocationArrow} />
                            </InputGroup.Text>
                            <Form.Control
                              type="text"
                              name="postalCode"
                              onChange={handleChange}
                              value={values.postalCode}
                              placeholder="Enter Postal/Zip Code"
                            />
                          </InputGroup>
                          {touched.postalCode && errors.postalCode && <div className="text-danger">{errors.postalCode}</div>}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
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

                      <Col xs={12} lg={6}>
                        <Form.Group controlId="note" className="mb-4">
                          <Form.Label>Note</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faUser} />
                            </InputGroup.Text>
                            <Form.Control as="textarea" rows={3} name="note" onChange={handleChange} value={values.note} placeholder="Enter Note" />
                          </InputGroup>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Button variant="primary" type="submit" className="button w-100">
                      Add Supplier
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
