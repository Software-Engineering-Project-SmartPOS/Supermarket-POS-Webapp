import { Container, Row, Col, Form, InputGroup, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faUser, faEnvelope, faPhone, faMapMarker, faCity, faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import PathConstants from "../../../constants/pathConstants";
import { toast } from "react-toastify";
import { ADD_SUPPLIER } from "../../../graphql/inventory";
import { useMutation } from "@apollo/client";

export default function AddSupplier() {
  const navigate = useNavigate();
  const [addSupplier, { loading, error }] = useMutation(ADD_SUPPLIER);
  if (error) {
    console.log(error);
    toast.error("Error in adding supplier");
  }

  const initialValues = {
    name: "",
    mobilePhone: "",
    landPhone: "",
    email: "",
    street: "",
    city: "",
    postalCode: "",
    district: "",
    houseNumber: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    mobilePhone: Yup.string().required("Mobile Phone is required"),
    landPhone: Yup.string(),
    email: Yup.string().email("Invalid email address"),
    street: Yup.string().required("Street is required"),
    city: Yup.string().required("City is required"),
    postalCode: Yup.string().required("Postal/zip code is required"),
    district: Yup.string().required("District is required"),
    houseNumber: Yup.string().required("House Number is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    addSupplier({ variables: { supplierInput: values } }).then((res) => {
      console.log(res);
      toast.success("Supplier Added Successfully!");
      resetForm();
    });
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
                        <Form.Group controlId="name" className="mb-4">
                          <Form.Label>Name</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faUser} />
                            </InputGroup.Text>
                            <Form.Control type="text" name="name" onChange={handleChange} value={values.name} placeholder="Enter Name" />
                          </InputGroup>
                          {touched.name && errors.name && <div className="text-danger">{errors.name}</div>}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12}>
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
                      <Col xs={12} lg={6}>
                        <Form.Group controlId="mobilePhone" className="mb-4">
                          <Form.Label>Mobile Phone</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faPhone} />
                            </InputGroup.Text>
                            <Form.Control
                              type="text"
                              name="mobilePhone"
                              onChange={handleChange}
                              value={values.mobilePhone}
                              placeholder="Enter Mobile Phone"
                            />
                          </InputGroup>
                          {touched.mobilePhone && errors.mobilePhone && <div className="text-danger">{errors.mobilePhone}</div>}
                        </Form.Group>
                      </Col>

                      <Col xs={12} lg={6}>
                        <Form.Group controlId="landPhone" className="mb-4">
                          <Form.Label>Land Phone</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faPhone} />
                            </InputGroup.Text>
                            <Form.Control
                              type="text"
                              name="landPhone"
                              onChange={handleChange}
                              value={values.landPhone}
                              placeholder="Enter Land Phone"
                            />
                          </InputGroup>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12} lg={6}>
                        <Form.Group controlId="houseNumber" className="mb-4">
                          <Form.Label>House Number</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faLocationArrow} />
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
                      <Col xs={12}>
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

                    {loading ? (
                      <Button variant="primary" type="submit" className="button w-100" disabled>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Loading...
                      </Button>
                    ) : (
                      <Button variant="primary" type="submit" className="button w-100">
                        Add Supplier
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
