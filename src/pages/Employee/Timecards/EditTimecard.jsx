import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faUser } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, Container, InputGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

export default function EditTimeCard() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the time card ID from the URL parameter

  // Assuming you have a function to fetch the time card data by ID
  // You can replace this with your own data fetching logic
  const fetchTimeCardById = (timeCardId) => {
    // Replace this with your API call or data retrieval logic
    return {
      employee: "John Doe",
      timeInDate: "2023-09-09", // Sample date (replace with actual date)
      timeOutDate: "2023-09-09", // Sample date (replace with actual date)
      timeIn: "09:00", // Sample time (replace with actual time)
      timeOut: "17:00", // Sample time (replace with actual time)
    };
  };

  // Fetch the time card data based on the ID
  const initialTimeCardData = fetchTimeCardById(id);

  return (
    <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
      <Container className="m">
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
                  <h3 className="mb-0">Edit Time Card</h3>
                </div>
              </div>
              <Formik
                initialValues={{
                  employee: "John Doe",
                  timeInDate: "2023-09-09", // Sample date (replace with actual date)
                  timeOutDate: "2023-09-09", // Sample date (replace with actual date)
                  timeIn: "09:00", // Sample time (replace with actual time)
                  timeOut: "17:00", // Sample time (replace with actual time)
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
                  // Add your logic to update the time card data here
                  // After updating the time card, you can navigate to a success page or another route
                  // navigate(PathConstants.HOME);
                }}
              >
                {({ handleSubmit, handleChange, values, errors, touched }) => (
                  <Form className="mt-4" onSubmit={handleSubmit}>
                    <Row>
                      <Col xs={12} lg={6}>
                        <Form.Group id="employee" className="mb-4">
                          <Form.Label>Employee</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faUser} />
                            </InputGroup.Text>
                            <Form.Control as="select" required name="employee" value={values.employee} onChange={handleChange}>
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
                              <FontAwesomeIcon icon={faUser} />
                            </InputGroup.Text>
                            <Form.Control type="date" required value={values.timeInDate} name="timeInDate" onChange={handleChange} />
                          </InputGroup>
                          {touched.timeInDate && errors.timeInDate && <div className="text-danger">{errors.timeInDate}</div>}
                        </Form.Group>
                      </Col>

                      <Col xs={12} lg={6}>
                        <Form.Group id="timeOutDate" className="mb-4">
                          <Form.Label>Time Out Date</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faUser} />
                            </InputGroup.Text>
                            <Form.Control type="date" required value={values.timeOutDate} name="timeOutDate" onChange={handleChange} />
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
                              <FontAwesomeIcon icon={faUser} />
                            </InputGroup.Text>
                            <Form.Control type="time" required value={values.timeIn} name="timeIn" onChange={handleChange} />
                          </InputGroup>
                          {touched.timeIn && errors.timeIn && <div className="text-danger">{errors.timeIn}</div>}
                        </Form.Group>
                      </Col>

                      <Col xs={12} lg={6}>
                        <Form.Group id="timeOut" className="mb-4">
                          <Form.Label>Time Out</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faUser} />
                            </InputGroup.Text>
                            <Form.Control type="time" required name="timeOut" value={values.timeOut} onChange={handleChange} />
                          </InputGroup>
                          {touched.timeOut && errors.timeOut && <div className="text-danger">{errors.timeOut}</div>}
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Calculate total hours here */}
                    {/* You can display the total hours in the next row */}

                    <Button variant="primary" type="submit" className="button w-100">
                      Update Time Card
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
