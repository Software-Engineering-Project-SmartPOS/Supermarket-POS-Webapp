import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import "../styles/SignIn.css";
import { Formik } from "formik";
import PathConstants from "../constants/pathConstants";

export default function SignIn() {
  const navigate = useNavigate();
  return (
    <main className="main">
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center form-bg-image">
            <Col xs={12} md={6} lg={4} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-lg border rounded border-light p-4 p-lg-5 w-100">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to our platform</h3>
                </div>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  onSubmit={(values) => {
                    navigate(PathConstants.HOME);
                  }}
                >
                  {({ handleSubmit, handleChange }) => (
                    <Form onSubmit={handleSubmit} className="mt-4">
                      <Form.Group id="email" className="mb-4">
                        <Form.Label>Your Email</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faEnvelope} />
                          </InputGroup.Text>
                          <Form.Control autoFocus required type="email" id="email" placeholder="example@company.com" onChange={handleChange} />
                        </InputGroup>
                      </Form.Group>
                      <Form.Group>
                        <Form.Group id="password" className="mb-4">
                          <Form.Label>Your Password</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faUnlockAlt} />
                            </InputGroup.Text>
                            <Form.Control required type="password" id="password" placeholder="Password" onChange={handleChange} />
                          </InputGroup>
                        </Form.Group>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <Form.Check type="checkbox">
                            <FormCheck.Input id="defaultCheck5" className="me-2" />
                            <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">
                              Remember me
                            </FormCheck.Label>
                          </Form.Check>
                          <Card.Link className="small text-end">Lost password?</Card.Link>
                        </div>
                      </Form.Group>
                      <Button variant="primary" type="submit" className="btn w-100">
                        Sign in
                      </Button>
                    </Form>
                  )}
                </Formik>

                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Not registered?
                    <Card.Link as={Link} to={PathConstants.SIGN_UP} className="fw-bold">
                      Create account
                    </Card.Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}
