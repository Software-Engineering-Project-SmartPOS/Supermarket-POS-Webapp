import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEye, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Image, Button, Container, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProfileImg from "../assets/img/profile.jpg";
import BgImg from "../assets/img/signin.svg";
import { useState } from "react";
import "../styles/SignIn.css";

export default function Lock() {
  const [showPassword, setShowPassword] = useState(false);
  const passwordInputType = showPassword ? "text" : "password";
  const passwordIconColor = showPassword ? "#262B40" : "";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <section className="vh-lg-100 bg-soft d-flex align-items-center my-4">
        <Container>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImg})` }}>
            <Col xs={12} md={6} lg={4} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-lg border border-light rounded p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <div className="col-3 user-avatar large-avatar mx-auto mb-3 border-dark p-2">
                    <Image src={ProfileImg} className="rounded-circle profile-img" />
                  </div>
                  <h3 className="mb-3">Bonnie Green</h3>
                  <p className="text-gray">Better to be safe than sorry.</p>
                </div>
                <Form className="mt-5">
                  <Form.Group id="password" className="mb-4">
                    <Form.Label>Your Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control required type={passwordInputType} placeholder="Password" />
                      <InputGroup.Text onClick={togglePasswordVisibility}>
                        <FontAwesomeIcon color={passwordIconColor} icon={faEye} />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Unlock
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}
