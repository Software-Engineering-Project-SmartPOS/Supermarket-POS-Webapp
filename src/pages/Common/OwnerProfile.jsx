import { Container, Row, Col, Form, InputGroup, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPhone, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import PathConstants from "../../constants/pathConstants";
import { useMutation } from "@apollo/client";
import { REGISTER_OWNER } from "../../graphql/employees";
import { toast } from "react-toastify";

export default function OwnerProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = location.state;
  const [registerOwner, { loading }] = useMutation(REGISTER_OWNER);

  const initialValues = {
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    jobRole: "OWNER",
    salaryType: "",
    email: email,
    password: password,
    phoneNumber: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    firstName: Yup.string().required("First Name is required"),
    middleName: Yup.string(),
    lastName: Yup.string().required("Last Name is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
  });

  const handleSubmit = (values) => {
    const employeeInput = {
      title: values.title,
      firstName: values.firstName,
      middleName: values.middleName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      password: password,
      email: email,
      jobRole: "OWNER",
      branchId: 0,
    };
    registerOwner({ variables: { employeeInput } }).then((response) => {
      console.log(response);
      if (response.data.registerOwner) {
        navigate(PathConstants.SIGN_IN);
      } else {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
      <Container>
        <Row className="justify-content-center form-bg-image">
          <Col xs={12} lg={6} className="d-flex align-items-center justify-content-center">
            <div className="bg-white shadow-lg border rounded border-light px-5 py-2 w-100">
              <div className="d-flex">
                <div className="text-start" onClick={() => navigate(PathConstants.SIGN_UP)}>
                  <button type="button" className="btn btn-outline-primary">
                    <FontAwesomeIcon icon={faChevronLeft} /> Back
                  </button>
                </div>
                <div className="text-center text-md-center mt-md-0 flex-grow-1">
                  <h3 className="mb-0">Profile</h3>
                </div>
              </div>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ handleSubmit, handleChange, values, errors, touched }) => (
                  <Form className="mt-4" onSubmit={handleSubmit}>
                    <Row>
                      <Col xs={12} lg={12}>
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

                      <Col xs={12} lg={12}>
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

                      <Col xs={12} lg={12}>
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

                      <Col xs={12} lg={12}>
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

                      <Col xs={12} lg={12}>
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

                    {loading ? (
                      <Button variant="primary" type="submit" className="button w-100" disabled>
                        <Spinner animation="border" size="sm" /> Loading...
                      </Button>
                    ) : (
                      <Button variant="primary" type="submit" className="button w-100">
                        Create Account
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
