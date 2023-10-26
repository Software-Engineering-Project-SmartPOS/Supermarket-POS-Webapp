import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone, faUsers, faCity, faMapMarker, faLocationArrow, faHome, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, Container, InputGroup, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { UPDATE_CUSTOMER } from "../../../graphql/customers";
import PathConstants from "../../../constants/pathConstants";

export default function EditCustomer() {
  const navigate = useNavigate();
  const location = useLocation();
  const customer = location.state.customer;
  const [updateCustomer, { loading }] = useMutation(UPDATE_CUSTOMER);

  const [initialData, setInitialData] = useState({
    name: "",
    email: "",
    telephone: "",
    customer_type: "",
    house_number: "",
    address: "",
    city: "",
    district: "",
    postal_code: "",
  });

  return (
    <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
      <Container className="m">
        <Row className="justify-content-center form-bg-image">
          <Col xs={12} lg={6} className="d-flex align-items-center justify-content-center">
            <div className="bg-white shadow-lg border rounded border-light p-4 p-lg-5 w-100">
              <div className="d-flex">
                <div className="text-start" onClick={() => navigate(`/${PathConstants.CUSTOMER_LIST}`)}>
                  <button type="button" className="btn btn-outline-primary">
                    <FontAwesomeIcon icon={faChevronLeft} /> Back
                  </button>
                </div>
                <div className="text-center text-md-center mt-md-0 flex-grow-1">
                  <h3 className="mb-0">Edit Customer</h3>
                </div>
              </div>
              <Formik
                initialValues={{
                  name: customer.name,
                  email: customer.email,
                  telephone: customer.telephone,
                  customer_type: customer.customerType,
                  house_number: customer.houseNumber,
                  address: customer.street,
                  city: customer.city,
                  district: customer.district,
                  postal_code: customer.postalCode,
                }}
                validationSchema={Yup.object({
                  // Define your validation schema
                  name: Yup.string().required("Required"),
                  email: Yup.string().email("Invalid email address"),
                  telephone: Yup.string().required("Required"),
                  customer_type: Yup.string().required("Required"),
                  house_number: Yup.string(),
                  address: Yup.string().required("Required"),
                  city: Yup.string().required("Required"),
                  district: Yup.string().required("Required"),
                  postal_code: Yup.string().required("Required"),
                })}
                onSubmit={(values) => {
                  updateCustomer({
                    variables: {
                      customerUpdateInput: {
                        id: customer.id,
                        name: values.name,
                        email: values.email,
                        telephone: values.telephone,
                        customerType: values.customer_type,
                        houseNumber: values.house_number,
                        street: values.address,
                        city: values.city,
                        district: values.district,
                        postalCode: values.postal_code,
                      },
                    },
                  }).then((res) => {
                    console.log(res);
                    toast.success("Customer updated successfully!");
                  });
                }}
              >
                {({ handleSubmit, handleChange, errors, touched, values }) => (
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
                              value={values.name}
                              name="name"
                              onChange={handleChange}
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
                              value={values.email}
                              name="email"
                              onChange={handleChange}
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
                              value={values.telephone}
                              name="telephone"
                              onChange={handleChange}
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
                            <Form.Control as="select" required value={values.customer_type} name="customer_type" onChange={handleChange}>
                              <option value="">Select customer type</option>
                              <option value="GRADE_A">GRADE_A</option>
                              <option value="GRADE_B">GRADE_B</option>
                              <option value="GRADE_C">GRADE_C</option>
                            </Form.Control>
                          </InputGroup>
                          {touched.customer_type && errors.customer_type && <div className="text-danger">{errors.customer_type}</div>}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      {/* <Col xs={12} lg={6}>
                       <Form.Group id="loyalty_program" className="mb-4">
                         <Form.Label>Loyalty Program</Form.Label>
                         <InputGroup>
                           <InputGroup.Text>
                             <FontAwesomeIcon icon={faBuilding} />
                           </InputGroup.Text>
                           <Form.Control as="select" required name="loyalty_program" onChange={handleChange}>
                             <option value="">Select loyalty program</option>
                             {data?.getAllLoyaltyPrograms.map((program, index) => (
                               <option key={index} value={program.loyaltyProgramName}>
                                 {program.loyaltyProgramName}
                               </option>
                             ))}
                           </Form.Control>
                         </InputGroup>
                         {touched.loyalty_program && errors.loyalty_program && <div className="text-danger">{errors.loyalty_program}</div>}
                       </Form.Group>
                     </Col> */}

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
                              placeholder="Enter House Number"
                              value={values.house_number}
                              onChange={handleChange}
                            />
                          </InputGroup>
                          {touched.houseNumber && errors.houseNumber && <div className="text-danger">{errors.houseNumber}</div>}
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
                              value={values.address}
                              name="address"
                              onChange={handleChange}
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
                            <Form.Control required type="text" placeholder="Enter city" value={values.city} name="city" onChange={handleChange} />
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
                              value={values.district}
                              name="district"
                              onChange={handleChange}
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
                              value={values.postal_code}
                              name="postal_code"
                              onChange={handleChange}
                            />
                          </InputGroup>
                          {touched.postal_code && errors.postal_code && <div className="text-danger">{errors.postal_code}</div>}
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
                        Update Customer
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
