import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone, faUsers, faBuilding, faCity, faMapMarker, faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, Container, InputGroup } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import PathConstants from "../../constants/pathConstants";

export default function EditCustomer() {
  const { customerId } = useParams();
  const navigate = useNavigate();

  // Define a list of loyalty programs
  const loyaltyPrograms = ["Program A", "Program B", "Program C", "Program D"];

  // Sample customer data (replace with actual customer data retrieval logic)
  const [customerData, setCustomerData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    telephone: "123-456-7890",
    customer_type: "1",
    loyalty_program: "Program A",
    address: "123 Main St",
    city: "Cityville",
    district: "District A",
    postal_code: "12345",
  });

  // Effect to fetch customer data when the component mounts
  useEffect(() => {
    // Replace this with actual data retrieval logic based on customerId
    // Example API call: fetchCustomerData(customerId).then((data) => setCustomerData(data));
  }, [customerId]);

  return (
    <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
      <Container className="m">
        <Row className="justify-content-center form-bg-image">
          <Col xs={12} lg={6} className="d-flex align-items-center justify-content-center">
            <div className="bg-white shadow-lg border rounded border-light p-4 p-lg-5 w-100">
              <div className="text-center text-md-center mb-4 mt-md-0">
                <h3 className="mb-0">Edit Customer</h3>
              </div>
              <Formik
                initialValues={customerData}
                validationSchema={Yup.object({
                  name: Yup.string().required("Required"),
                  email: Yup.string().email("Invalid email address"),
                  telephone: Yup.string().required("Required"),
                  customer_type: Yup.string().required("Required"),
                  loyalty_program: Yup.string().required("Required"),
                  address: Yup.string().required("Required"),
                  city: Yup.string().required("Required"),
                  district: Yup.string().required("Required"),
                  postal_code: Yup.string().required("Required"),
                })}
                onSubmit={(values) => {
                  console.log(values);
                  // Add your logic to update customer data here
                  // After updating the customer, you can navigate to a success page or another route
                  navigate("/" + PathConstants.CUSTOMER_LIST);
                }}
              >
                {({ handleSubmit, handleChange, values, errors, touched }) => (
                  <Form className="mt-4" onSubmit={handleSubmit}>
                    <Row>
                      <Col xs={12} lg={6}>
                        <Form.Group id="name" className="mb-4">
                          <Form.Label>Name</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faUser} />
                            </InputGroup.Text>
                            <Form.Control
                              autoFocus
                              required
                              type="text"
                              placeholder="Enter customer name"
                              name="name"
                              onChange={handleChange}
                              value={values.name}
                            />
                          </InputGroup>
                          {touched.name && errors.name && <div className="text-danger">{errors.name}</div>}
                        </Form.Group>
                      </Col>

                      <Col xs={12} lg={6}>
                        <Form.Group id="email" className="mb-4">
                          <Form.Label>Email</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faEnvelope} />
                            </InputGroup.Text>
                            <Form.Control
                              required
                              type="email"
                              placeholder="example@company.com"
                              name="email"
                              onChange={handleChange}
                              value={values.email}
                            />
                          </InputGroup>
                          {touched.email && errors.email && <div className="text-danger">{errors.email}</div>}
                        </Form.Group>
                      </Col>

                      <Col xs={12} lg={6}>
                        <Form.Group id="telephone" className="mb-4">
                          <Form.Label>Telephone</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faPhone} />
                            </InputGroup.Text>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Enter customer telephone"
                              name="telephone"
                              onChange={handleChange}
                              value={values.telephone}
                            />
                          </InputGroup>
                          {touched.telephone && errors.telephone && <div className="text-danger">{errors.telephone}</div>}
                        </Form.Group>
                      </Col>

                      <Col xs={12} lg={6}>
                        <Form.Group id="customer_type" className="mb-4">
                          <Form.Label>Customer Type</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faUsers} />
                            </InputGroup.Text>
                            <Form.Control as="select" required name="customer_type" onChange={handleChange} value={values.customer_type}>
                              <option value="">Select customer type</option>
                              <option value="1">Type 1</option>
                              <option value="2">Type 2</option>
                              <option value="3">Type 3</option>
                            </Form.Control>
                          </InputGroup>
                          {touched.customer_type && errors.customer_type && <div className="text-danger">{errors.customer_type}</div>}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12} lg={6}>
                        <Form.Group id="loyalty_program" className="mb-4">
                          <Form.Label>Loyalty Program</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faBuilding} />
                            </InputGroup.Text>
                            <Form.Control as="select" required name="loyalty_program" onChange={handleChange} value={values.loyalty_program}>
                              <option value="">Select loyalty program</option>
                              {loyaltyPrograms.map((program, index) => (
                                <option key={index} value={program}>
                                  {program}
                                </option>
                              ))}
                            </Form.Control>
                          </InputGroup>
                          {touched.loyalty_program && errors.loyalty_program && <div className="text-danger">{errors.loyalty_program}</div>}
                        </Form.Group>
                      </Col>

                      <Col xs={12} lg={6}>
                        <Form.Group id="address" className="mb-4">
                          <Form.Label>Address</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faCity} />
                            </InputGroup.Text>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Enter customer address"
                              name="address"
                              onChange={handleChange}
                              value={values.address}
                            />
                          </InputGroup>
                          {touched.address && errors.address && <div className="text-danger">{errors.address}</div>}
                        </Form.Group>
                      </Col>

                      <Col xs={12} lg={6}>
                        <Form.Group id="city" className="mb-4">
                          <Form.Label>City</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faMapMarker} />
                            </InputGroup.Text>
                            <Form.Control required type="text" placeholder="Enter city" name="city" onChange={handleChange} value={values.city} />
                          </InputGroup>
                          {touched.city && errors.city && <div className="text-danger">{errors.city}</div>}
                        </Form.Group>
                      </Col>

                      <Col xs={12} lg={6}>
                        <Form.Group id="district" className="mb-4">
                          <Form.Label>District</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faLocationArrow} />
                            </InputGroup.Text>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Enter district"
                              name="district"
                              onChange={handleChange}
                              value={values.district}
                            />
                          </InputGroup>
                          {touched.district && errors.district && <div className="text-danger">{errors.district}</div>}
                        </Form.Group>
                      </Col>

                      <Col xs={12} lg={6}>
                        <Form.Group id="postal_code" className="mb-4">
                          <Form.Label>Postal Code</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faLocationArrow} />
                            </InputGroup.Text>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Enter postal code"
                              name="postal_code"
                              onChange={values.postal_code}
                              value={values.postal_code}
                            />
                          </InputGroup>
                          {touched.postal_code && errors.postal_code && <div className="text-danger">{errors.postal_code}</div>}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Button variant="primary" type="submit" className="button w-100">
                      Update Customer
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
