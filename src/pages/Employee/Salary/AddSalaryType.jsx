import { Container, Row, Col, Form, InputGroup, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faMoneyBillAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import PathConstants from "../../../constants/pathConstants";
import { useMutation } from "@apollo/client";
import { ADD_SALARY_TYPE } from "../../../graphql/employees";
import { toast } from "react-toastify";

export default function AddSalaryType() {
  const navigate = useNavigate();

  const initialValues = {
    basicSalary: 0,
    halfDaySalary: 0,
    overTimeSalary: 0,
    bonus: 0,
  };

  const validationSchema = Yup.object({
    basicSalary: Yup.number().min(0, "Basic Salary must be greater than zero").required("Basic Salary is required"),
    halfDaySalary: Yup.number().min(0, "Half Day Salary must be greater than zero").required("Half Day Salary is required"),
    overTimeSalary: Yup.number().min(0, "Overtime Salary must be greater than zero").required("Overtime Salary is required"),
    bonus: Yup.number().min(0, "Bonus must be greater than zero").required("Bonus is required"),
  });

  const [addSlaryType, { loading, error }] = useMutation(ADD_SALARY_TYPE);

  if (error) {
    console.log(error);
    toast.error("Error creating salary type");
  }

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    addSlaryType({
      variables: {
        salaryTypeInput: {
          basicSalary: values.basicSalary,
          halfDaySalary: values.halfDaySalary,
          overTimeSalary: values.overTimeSalary,
          bonus: values.bonus,
        },
      },
    })
      .then((response) => {
        console.log(response.data);
        toast.success("Salary type created successfully");
        resetForm();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
      <Container>
        <Row className="justify-content-center form-bg-image">
          <Col xs={12} lg={7} className="d-flex align-items-center justify-content-center">
            <div className="bg-white shadow-lg border rounded border-light px-5 py-2 w-100">
              <div className="d-flex">
                <div className="text-start" onClick={() => navigate("/" + PathConstants.SALARY_TYPES)}>
                  <button type="button" className="btn btn-outline-primary">
                    <FontAwesomeIcon icon={faChevronLeft} /> Back
                  </button>
                </div>
                <div className="text-center text-md-center mt-md-0 flex-grow-1">
                  <h3 className="mb-0">Add Salary Type</h3>
                </div>
              </div>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ handleSubmit, handleChange, values, errors, touched }) => (
                  <Form className="mt-4" onSubmit={handleSubmit}>
                    <Row>
                      <Col xs={12} lg={6}>
                        <Form.Group controlId="basicSalary" className="mb-4">
                          <Form.Label>Basic Salary</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faMoneyBillAlt} />
                            </InputGroup.Text>
                            <Form.Control
                              type="number"
                              name="basicSalary"
                              onChange={handleChange}
                              value={values.basicSalary}
                              placeholder="Enter Basic Salary"
                            />
                          </InputGroup>
                          {touched.basicSalary && errors.basicSalary && <div className="text-danger">{errors.basicSalary}</div>}
                        </Form.Group>
                      </Col>

                      <Col xs={12} lg={6}>
                        <Form.Group controlId="halfDaySalary" className="mb-4">
                          <Form.Label>Half Day Salary</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faMoneyBillAlt} />
                            </InputGroup.Text>
                            <Form.Control
                              type="number"
                              name="halfDaySalary"
                              onChange={handleChange}
                              value={values.halfDaySalary}
                              placeholder="Enter Half Day Salary"
                            />
                          </InputGroup>
                          {touched.halfDaySalary && errors.halfDaySalary && <div className="text-danger">{errors.halfDaySalary}</div>}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12} lg={6}>
                        <Form.Group controlId="overTimeSalary" className="mb-4">
                          <Form.Label>Overtime Salary</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faMoneyBillAlt} />
                            </InputGroup.Text>
                            <Form.Control
                              type="number"
                              name="overTimeSalary"
                              onChange={handleChange}
                              value={values.overTimeSalary}
                              placeholder="Enter Overtime Salary"
                            />
                          </InputGroup>
                          {touched.overTimeSalary && errors.overTimeSalary && <div className="text-danger">{errors.overTimeSalary}</div>}
                        </Form.Group>
                      </Col>

                      <Col xs={12} lg={6}>
                        <Form.Group controlId="bonus" className="mb-4">
                          <Form.Label>Bonus</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faMoneyBillAlt} />
                            </InputGroup.Text>
                            <Form.Control type="number" name="bonus" onChange={handleChange} value={values.bonus} placeholder="Enter Bonus" />
                          </InputGroup>
                          {touched.bonus && errors.bonus && <div className="text-danger">{errors.bonus}</div>}
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
                        Add Salary Types
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
