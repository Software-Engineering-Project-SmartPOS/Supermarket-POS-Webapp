import { Container, Row, Col, Form, InputGroup, Button, Spinner } from "react-bootstrap";
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
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import PathConstants from "../../../constants/pathConstants";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_EMPLOYEE, GET_ALL_SALARY_TYPES } from "../../../graphql/employees";
import { GET_ALL_BRANCHES } from "../../../graphql/branch";
import { toast } from "react-toastify";

export default function AddEmployee() {
  const navigate = useNavigate();
  const { data } = useQuery(GET_ALL_SALARY_TYPES);
  const [addEmployee, { loading, error }] = useMutation(ADD_EMPLOYEE);
  if (error) {
    console.log(error);
    toast.error("Error adding employee");
  }
  const { data: branchData } = useQuery(GET_ALL_BRANCHES);

  const initialValues = {
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    houseNumber: "",
    jobRole: "",
    salaryType: "",
    phoneNumber: "",
    street: "",
    city: "",
    district: "",
    postalCode: "",
    branchId: 0,
    password: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    firstName: Yup.string().required("First Name is required"),
    middleName: Yup.string(),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email address"),
    houseNumber: Yup.string().required("House Number is required"),
    jobRole: Yup.string().required("Job Role is required"),
    salaryType: Yup.number().required("Salary Type is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    street: Yup.string().required("Street is required"),
    city: Yup.string().required("City is required"),
    district: Yup.string().required("District is required"),
    postalCode: Yup.string().required("Postal Code is required"),
    branchId: Yup.number().required("Branch is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    addEmployee({
      variables: {
        employeeInput: {
          title: values.title,
          firstName: values.firstName,
          middleName: values.middleName,
          lastName: values.lastName,
          email: values.email,
          jobRole: values.jobRole,
          salaryTypeId: Number(values.salaryType),
          phoneNumber: values.phoneNumber,
          address: values.address,
          city: values.city,
          district: values.district,
          postalCode: values.postalCode,
          branchId: Number(values.branchId),
          password: values.password,
        },
      },
    }).then((res) => {
      console.log(res);
      toast.success("Employee added successfully");
      // resetForm();
    });
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
                        <Form.Group controlId="firstName" className="mb-4">
                          <Form.Label>First Name</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faUser} />
                            </InputGroup.Text>
                            <Form.Control
                              type="text"
                              name="firstName"
                              onChange={handleChange}
                              value={values.firstName}
                              placeholder="Enter First Name"
                            />
                          </InputGroup>
                          {touched.firstName && errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12} lg={6}>
                        <Form.Group controlId="middleName" className="mb-4">
                          <Form.Label>Middle Name</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faUser} />
                            </InputGroup.Text>
                            <Form.Control
                              type="text"
                              name="middleName"
                              onChange={handleChange}
                              value={values.middleName}
                              placeholder="Enter Middle Name"
                            />
                          </InputGroup>
                        </Form.Group>
                      </Col>

                      <Col xs={12} lg={6}>
                        <Form.Group controlId="lastName" className="mb-4">
                          <Form.Label>Last Name</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faUser} />
                            </InputGroup.Text>
                            <Form.Control type="text" name="lastName" onChange={handleChange} value={values.lastName} placeholder="Enter Last Name" />
                          </InputGroup>
                          {touched.lastName && errors.lastName && <div className="text-danger">{errors.lastName}</div>}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12} lg={6}>
                        <Form.Group controlId="jobRole" className="mb-4">
                          <Form.Label>Job Role</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faBuilding} />
                            </InputGroup.Text>
                            <Form.Control as="select" name="jobRole" onChange={handleChange} value={values.jobRole} placeholder="Select Job Role">
                              <option value="">Select job role</option>
                              <option value="CASHIER">CASHIER</option>
                              <option value="MANAGER">MANAGER</option>
                              <option value="STORE_MANAGER">STORE_MANAGER</option>
                              <option value="SALES_ASSISTANT">SALES_ASSISTANT</option>
                              <option value="ADMIN">ADMIN</option>
                            </Form.Control>
                          </InputGroup>
                          {touched.jobRole && errors.jobRole && <div className="text-danger">{errors.jobRole}</div>}
                        </Form.Group>
                      </Col>

                      <Col xs={12} lg={6}>
                        <Form.Group controlId="salaryType" className="mb-4">
                          <Form.Label>Salary Type</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faBuilding} />
                            </InputGroup.Text>
                            <Form.Control
                              as="select"
                              name="salaryType"
                              onChange={handleChange}
                              value={values.salaryType}
                              placeholder="Select Salary Type"
                            >
                              <option value="">Select salary type</option>
                              {data?.allSalaryTypes?.map((type) => (
                                <option key={type.id} value={type.id}>
                                  Rs. {type.basicSalary}
                                </option>
                              ))}
                            </Form.Control>
                          </InputGroup>
                          {touched.salaryType && errors.salaryType && <div className="text-danger">{errors.salaryType}</div>}
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
                        <Form.Group controlId="phoneNumber" className="mb-4">
                          <Form.Label>Phone Number</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faPhone} />
                            </InputGroup.Text>
                            <Form.Control
                              type="text"
                              name="phoneNumber"
                              onChange={handleChange}
                              value={values.phoneNumber}
                              placeholder="Enter Phone Number"
                            />
                          </InputGroup>
                          {touched.phoneNumber && errors.phoneNumber && <div className="text-danger">{errors.phoneNumber}</div>}
                        </Form.Group>
                      </Col>
                    </Row>

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
                        <Form.Group controlId="address" className="mb-4">
                          <Form.Label>street</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faMapMarker} />
                            </InputGroup.Text>
                            <Form.Control type="text" name="street" onChange={handleChange} value={values.street} placeholder="Enter street" />
                          </InputGroup>
                          {touched.street && errors.street && <div className="text-danger">{errors.street}</div>}
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
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} lg={6}>
                        <Form.Group controlId="branchId" className="mb-4">
                          <Form.Label>Branch</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faBuilding} />
                            </InputGroup.Text>
                            <Form.Control as="select" name="branchId" onChange={handleChange} value={values.branchId} placeholder="Select Branch">
                              <option value="">Select branch</option>
                              {branchData?.getAllBranch?.map((branch) => (
                                <option key={branch.id} value={branch.id}>
                                  {branch.name}
                                </option>
                              ))}
                            </Form.Control>
                          </InputGroup>
                          {touched.branchId && errors.branchId && <div className="text-danger">{errors.branchId}</div>}
                        </Form.Group>
                      </Col>

                      <Col xs={12} lg={6}>
                        <Form.Group controlId="password" className="mb-4">
                          <Form.Label>Password</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faLock} />
                            </InputGroup.Text>
                            <Form.Control
                              type="password"
                              name="password"
                              onChange={handleChange}
                              value={values.password}
                              placeholder="Enter Password"
                            />
                          </InputGroup>
                          {touched.password && errors.password && <div className="text-danger">{errors.password}</div>}
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
                        Add Employee
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
