import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUser,
  faPhone,
  faBuilding,
  faCity,
  faMapMarker,
  faLocationArrow,
  faChevronLeft,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import PathConstants from "../../../constants/pathConstants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSalaryTypes } from "../../../state/reducers/salaryTypes";

export default function AddEmployee() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { salaryTypes } = useSelector((state) => state.salaryType);
  useEffect(() => {
    dispatch(fetchSalaryTypes());
  }, [dispatch]);

  const initialValues = {
    title: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    job_role: "",
    salary_type: "",
    email: "",
    phone_number: "",
    address: "",
    city: "",
    district: "",
    postal_code: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    first_name: Yup.string().required("First Name is required"),
    middle_name: Yup.string(),
    last_name: Yup.string().required("Last Name is required"),
    job_role: Yup.string().required("Job Role is required"),
    salary_type: Yup.string().required("Salary Type is required"),
    email: Yup.string().email("Invalid email address"),
    phone_number: Yup.string().required("Phone Number is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    district: Yup.string().required("District is required"),
    postal_code: Yup.string().required("Postal Code is required"),
  });

  const handleSubmit = (values) => {
    console.log(values);
    // Add your logic to submit employee data here
    // After adding the employee, you can navigate to a success page or another route
    navigate("/success");
  };

  return (
    <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
      <Container>
        <Row className="justify-content-center form-bg-image">
          <Col xs={12} lg={7} className="d-flex align-items-center justify-content-center">
            <div className="bg-white shadow-lg border rounded border-light px-5 py-2 w-100">
              <div className="d-flex">
                <div className="text-start" onClick={() => navigate("/" + PathConstants.EMPLOYEE_LIST)}>
                  <button type="button" className="btn btn-outline-primary">
                    <FontAwesomeIcon icon={faChevronLeft} /> Back
                  </button>
                </div>
                <div className="text-center text-md-center mt-md-0 flex-grow-1">
                  <h3 className="mb-0">Add Employee</h3>
                </div>
              </div>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
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
                            <Form.Control as="select" name="title" onChange={handleChange} value={values.title} placeholder="Select Title">
                              <option value="">Select title</option>
                              <option value="MR">Mr.</option>
                              <option value="MRS">Mrs.</option>
                              <option value="MISS">Miss</option>
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
                            <Form.Control
                              type="text"
                              name="first_name"
                              onChange={handleChange}
                              value={values.first_name}
                              placeholder="Enter First Name"
                            />
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
                            <Form.Control
                              type="text"
                              name="middle_name"
                              onChange={handleChange}
                              value={values.middle_name}
                              placeholder="Enter Middle Name"
                            />
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
                            <Form.Control
                              type="text"
                              name="last_name"
                              onChange={handleChange}
                              value={values.last_name}
                              placeholder="Enter Last Name"
                            />
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
                            <Form.Control as="select" name="job_role" onChange={handleChange} value={values.job_role} placeholder="Select Job Role">
                              <option value="">Select job role</option>
                              <option value="CASHIER">CASHIER</option>
                              <option value="OWNER">OWNER</option>
                              <option value="MANAGER">MANAGER</option>
                              <option value="STORE_MANAGER">STORE_MANAGER</option>
                              <option value="SALES_ASSISTANT">SALES_ASSISTANT</option>
                              <option value="ADMIN">ADMIN</option>
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
                            <Form.Control
                              as="select"
                              name="salary_type"
                              onChange={handleChange}
                              value={values.salary_type}
                              placeholder="Select Salary Type"
                            >
                              <option value="">Select salary type</option>
                              {salaryTypes?.map((type) => (
                                <option key={type.id} value={type.id}>
                                  Rs. {type.basicSalary}
                                </option>
                              ))}
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
                            <Form.Control type="email" name="email" onChange={handleChange} value={values.email} placeholder="Enter Email" />
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
                            <Form.Control
                              type="text"
                              name="phone_number"
                              onChange={handleChange}
                              value={values.phone_number}
                              placeholder="Enter Phone Number"
                            />
                          </InputGroup>
                          {touched.phone_number && errors.phone_number && <div className="text-danger">{errors.phone_number}</div>}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12} lg={4}>
                        <Form.Group controlId="house_number" className="mb-4">
                          <Form.Label>House Number</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faHome} />
                            </InputGroup.Text>
                            <Form.Control
                              type="text"
                              name="house_number"
                              onChange={handleChange}
                              value={values.house_number}
                              placeholder="Enter House Number"
                            />
                          </InputGroup>
                          {touched.house_number && errors.house_number && <div className="text-danger">{errors.house_number}</div>}
                        </Form.Group>
                      </Col>
                      <Col xs={12} lg={8}>
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
                      <Col xs={12} lg={4}>
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

                      <Col xs={12} lg={4}>
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

                      <Col xs={12} lg={4}>
                        <Form.Group controlId="postal_code" className="mb-4">
                          <Form.Label>Postal Code</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faLocationArrow} />
                            </InputGroup.Text>
                            <Form.Control
                              type="text"
                              name="postal_code"
                              onChange={handleChange}
                              value={values.postal_code}
                              placeholder="Enter Postal Code"
                            />
                          </InputGroup>
                          {touched.postal_code && errors.postal_code && <div className="text-danger">{errors.postal_code}</div>}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Button variant="primary" type="submit" className="button w-100">
                      Add Employee
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
