import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone, faBuilding, faCity, faMapMarker, faLocationArrow, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, Container, InputGroup } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import PathConstants from "../../constants/pathConstants";

export default function EditEmployee() {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState({
    title: "Mr.",
    first_name: "John",
    middle_name: "",
    last_name: "Doe",
    job_role: "Role 1",
    salary_type: "Type 1",
    email: "johndoe@example.com",
    phone_number: "123-456-7890",
    address: "123 Main St",
    city: "Cityville",
    district: "District A",
    postal_code: "12345",
  });

  useEffect(() => {
    // Replace this with actual data retrieval logic based on employeeId
    // Example API call: fetchEmployeeData(employeeId).then((data) => setEmployeeData(data));
  }, [employeeId]);

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    first_name: Yup.string().required("Required"),
    middle_name: Yup.string(),
    last_name: Yup.string().required("Required"),
    job_role: Yup.string().required("Required"),
    salary_type: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address"),
    phone_number: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    district: Yup.string().required("Required"),
    postal_code: Yup.string().required("Required"),
  });

  const handleSubmit = (values) => {
    console.log(values);
    // Add your logic to update employee data here
    // After updating the employee, you can navigate to a success page or another route
    navigate("/" + PathConstants.EMPLOYEE_LIST);
  };

  return (
    <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
      <Container>
        <Row className="justify-content-center form-bg-image">
          <Col xs={12} lg={6} className="d-flex align-items-center justify-content-center">
            <div className="bg-white shadow-lg border rounded border-light px-5 py-2 w-100">
              <div className="d-flex">
                <div className="text-start" onClick={() => navigate(-1)}>
                  <button type="button" className="btn btn-outline-primary">
                    <FontAwesomeIcon icon={faChevronLeft} /> Back
                  </button>
                </div>
                <div className="text-center text-md-center mt-md-0 flex-grow-1">
                  <h3 className="mb-0">Edit Employee</h3>
                </div>
              </div>
              <Formik initialValues={employeeData} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ handleSubmit, handleChange, values, errors, touched }) => (
                  <Form className="mt-4" onSubmit={handleSubmit}>
                    <Row>
                      <Col xs={12} lg={6}>
                        <Form.Group controlId="title" className="mb-4">
                          <Form.Label>Title</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faUser} />
                            </InputGroup.Text>
                            <Form.Control as="select" name="title" onChange={handleChange} value={values.title}>
                              <option value="">Select title</option>
                              <option value="Mr.">Mr.</option>
                              <option value="Mrs.">Mrs.</option>
                              <option value="Miss">Miss</option>
                              <option value="Dr.">Dr.</option>
                            </Form.Control>
                          </InputGroup>
                          {touched.title && errors.title && <div className="text-danger">{errors.title}</div>}
                        </Form.Group>
                      </Col>

                      <Col xs={12} lg={6}>
                        <Form.Group controlId="first_name" className="mb-4">
                          <Form.Label>First Name</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faUser} />
                            </InputGroup.Text>
                            <Form.Control type="text" name="first_name" onChange={handleChange} value={values.first_name} />
                          </InputGroup>
                          {touched.first_name && errors.first_name && <div className="text-danger">{errors.first_name}</div>}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12} lg={6}>
                        <Form.Group controlId="middle_name" className="mb-4">
                          <Form.Label>Middle Name</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faUser} />
                            </InputGroup.Text>
                            <Form.Control type="text" name="middle_name" onChange={handleChange} value={values.middle_name} />
                          </InputGroup>
                        </Form.Group>
                      </Col>

                      <Col xs={12} lg={6}>
                        <Form.Group controlId="last_name" className="mb-4">
                          <Form.Label>Last Name</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faUser} />
                            </InputGroup.Text>
                            <Form.Control type="text" name="last_name" onChange={handleChange} value={values.last_name} />
                          </InputGroup>
                          {touched.last_name && errors.last_name && <div className="text-danger">{errors.last_name}</div>}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12} lg={6}>
                        <Form.Group controlId="job_role" className="mb-4">
                          <Form.Label>Job Role</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faBuilding} />
                            </InputGroup.Text>
                            <Form.Control as="select" name="job_role" onChange={handleChange} value={values.job_role}>
                              <option value="">Select job role</option>
                              <option value="Role 1">Role 1</option>
                              <option value="Role 2">Role 2</option>
                              <option value="Role 3">Role 3</option>
                            </Form.Control>
                          </InputGroup>
                          {touched.job_role && errors.job_role && <div className="text-danger">{errors.job_role}</div>}
                        </Form.Group>
                      </Col>

                      <Col xs={12} lg={6}>
                        <Form.Group controlId="salary_type" className="mb-4">
                          <Form.Label>Salary Type</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faBuilding} />
                            </InputGroup.Text>
                            <Form.Control as="select" name="salary_type" onChange={handleChange} value={values.salary_type}>
                              <option value="">Select salary type</option>
                              <option value="Type 1">Type 1</option>
                              <option value="Type 2">Type 2</option>
                              <option value="Type 3">Type 3</option>
                            </Form.Control>
                          </InputGroup>
                          {touched.salary_type && errors.salary_type && <div className="text-danger">{errors.salary_type}</div>}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12} lg={6}>
                        <Form.Group controlId="email" className="mb-4">
                          <Form.Label>Email</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faEnvelope} />
                            </InputGroup.Text>
                            <Form.Control type="email" name="email" onChange={handleChange} value={values.email} />
                          </InputGroup>
                          {touched.email && errors.email && <div className="text-danger">{errors.email}</div>}
                        </Form.Group>
                      </Col>

                      <Col xs={12} lg={6}>
                        <Form.Group controlId="phone_number" className="mb-4">
                          <Form.Label>Phone Number</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faPhone} />
                            </InputGroup.Text>
                            <Form.Control type="text" name="phone_number" onChange={handleChange} value={values.phone_number} />
                          </InputGroup>
                          {touched.phone_number && errors.phone_number && <div className="text-danger">{errors.phone_number}</div>}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12} lg={6}>
                        <Form.Group controlId="address" className="mb-4">
                          <Form.Label>Address</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faMapMarker} />
                            </InputGroup.Text>
                            <Form.Control type="text" name="address" onChange={handleChange} value={values.address} />
                          </InputGroup>
                          {touched.address && errors.address && <div className="text-danger">{errors.address}</div>}
                        </Form.Group>
                      </Col>

                      <Col xs={12} lg={6}>
                        <Form.Group controlId="city" className="mb-4">
                          <Form.Label>City</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faCity} />
                            </InputGroup.Text>
                            <Form.Control type="text" name="city" onChange={handleChange} value={values.city} />
                          </InputGroup>
                          {touched.city && errors.city && <div className="text-danger">{errors.city}</div>}
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
                            <Form.Control type="text" name="district" onChange={handleChange} value={values.district} />
                          </InputGroup>
                          {touched.district && errors.district && <div className="text-danger">{errors.district}</div>}
                        </Form.Group>
                      </Col>

                      <Col xs={12} lg={6}>
                        <Form.Group controlId="postal_code" className="mb-4">
                          <Form.Label>Postal Code</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faLocationArrow} />
                            </InputGroup.Text>
                            <Form.Control type="text" name="postal_code" onChange={handleChange} value={values.postal_code} />
                          </InputGroup>
                          {touched.postal_code && errors.postal_code && <div className="text-danger">{errors.postal_code}</div>}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Button variant="primary" type="submit" className="button w-100">
                      Update Employee
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
