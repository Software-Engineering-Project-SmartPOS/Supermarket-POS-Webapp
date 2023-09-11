import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay, faChevronLeft, faUser } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, Container, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

export default function AddTimeCard() {
  const navigate = useNavigate();

  return (
    <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
      <Container>
        <Row className="justify-content-center form-bg-image">
          <Col xs={12} lg={6} className="d-flex align-items-center justify-content-center">
            <div className="bg-white shadow-lg border rounded border-light p-4 p-lg-5 w-100">
              <div className="d-flex">
                <div className="text-start" onClick={() => navigate(-1)}>
                  <button type="button" className="btn btn-outline-primary">
                    <FontAwesomeIcon icon={faChevronLeft} /> Back
                  </button>
                </div>
                <div className="text-center text-md-center mt-md-0 flex-grow-1">
                  <h3 className="mb-0">Add Time Card</h3>
                </div>
              </div>
              <Formik
                initialValues={{
                  employee: "",
                  timeInDate: "",
                  timeOutDate: "",
                  timeIn: "",
                  timeOut: "",
                }}
                validationSchema={Yup.object({
                  employee: Yup.string().required("Required"),
                  timeInDate: Yup.date().required("Required"),
                  timeOutDate: Yup.date().required("Required"),
                  timeIn: Yup.string().required("Required"),
                  timeOut: Yup.string().required("Required"),
                })}
                onSubmit={(values) => {
                  console.log(values);
                  // Add your logic to submit the time card data here
                  // Calculate total hours and save the data
                  // After adding the time card, you can navigate to a success page or another route
                  // navigate(PathConstants.HOME);
                }}
              >
                {({ handleSubmit, handleChange, errors, touched }) => (
                  <Form className="mt-4" onSubmit={handleSubmit}>
                    <Row>
                      <Col xs={12} lg={6}>
                        <Form.Group id="employee" className="mb-4">
                          <Form.Label>Employee</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faUser} />
                            </InputGroup.Text>
                            <Form.Control as="select" required name="employee" onChange={handleChange}>
                              <option value="">Select employee</option>
                              <option value="John Doe">John Doe</option>
                              <option value="Jane Smith">Jane Smith</option>
                              {/* Add more employee options as needed */}
                            </Form.Control>
                          </InputGroup>
                          {touched.employee && errors.employee && <div className="text-danger">{errors.employee}</div>}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12} lg={6}>
                        <Form.Group id="timeInDate" className="mb-4">
                          <Form.Label>Time In Date</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faCalendarDay} />
                            </InputGroup.Text>
                            <Form.Control type="date" required name="timeInDate" onChange={handleChange} />
                          </InputGroup>
                          {touched.timeInDate && errors.timeInDate && <div className="text-danger">{errors.timeInDate}</div>}
                        </Form.Group>
                      </Col>

                      <Col xs={12} lg={6}>
                        <Form.Group id="timeOutDate" className="mb-4">
                          <Form.Label>Time Out Date</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faCalendarDay} />
                            </InputGroup.Text>
                            <Form.Control type="date" required name="timeOutDate" onChange={handleChange} />
                          </InputGroup>
                          {touched.timeOutDate && errors.timeOutDate && <div className="text-danger">{errors.timeOutDate}</div>}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12} lg={6}>
                        <Form.Group id="timeIn" className="mb-4">
                          <Form.Label>Time In</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faCalendarDay} />
                            </InputGroup.Text>
                            <Form.Control type="time" required name="timeIn" onChange={handleChange} />
                          </InputGroup>
                          {touched.timeIn && errors.timeIn && <div className="text-danger">{errors.timeIn}</div>}
                        </Form.Group>
                      </Col>

                      <Col xs={12} lg={6}>
                        <Form.Group id="timeOut" className="mb-4">
                          <Form.Label>Time Out</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faCalendarDay} />
                            </InputGroup.Text>
                            <Form.Control type="time" required name="timeOut" onChange={handleChange} />
                          </InputGroup>
                          {touched.timeOut && errors.timeOut && <div className="text-danger">{errors.timeOut}</div>}
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Calculate total hours here */}
                    {/* You can display the total hours in the next row */}

                    <Button variant="primary" type="submit" className="button w-100">
                      Add Time Card
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
