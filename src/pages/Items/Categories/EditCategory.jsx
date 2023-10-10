import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, Container, InputGroup, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import PathConstants from "../../../constants/pathConstants";
import { useMutation } from "@apollo/client";
import { UPDATE_CATEGORY } from "../../../graphql/items";

export default function EditCategory() {
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.state.category;

  const [updateCategory, { loading, error }] = useMutation(UPDATE_CATEGORY);

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
                  <h3 className="mb-0">Edit Category</h3>
                </div>
              </div>
              <Formik
                initialValues={category}
                validationSchema={Yup.object({
                  name: Yup.string().required("Category name is required"),
                  description: Yup.string().required("Category description is required"),
                })}
                onSubmit={(values) => {
                  updateCategory({
                    variables: {
                      categoryInput: {
                        id: values.id,
                        name: values.name,
                        description: values.description,
                      },
                    },
                  }).then((response) => {
                    console.log(response.data.UpdateCategory);
                    navigate(`/${PathConstants.CATEGORIES}`);
                  });
                }}
              >
                {({ handleSubmit, handleChange, values, errors, touched }) => (
                  <Form className="mt-4" onSubmit={handleSubmit}>
                    <Row>
                      <Col xs={12}>
                        <Form.Group controlId="categoryName" className="mb-4">
                          <Form.Label>Category Name</Form.Label>
                          <InputGroup>
                            <Form.Control
                              type="text"
                              placeholder="Enter category name"
                              name="name"
                              value={values.name}
                              onChange={handleChange}
                              isInvalid={touched.name && errors.name}
                            />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Form.Group controlId="categoryDescription" className="mb-4">
                          <Form.Label>Category Description</Form.Label>
                          <InputGroup>
                            <Form.Control
                              type="text"
                              placeholder="Enter category description"
                              name="description"
                              value={values.description}
                              onChange={handleChange}
                              isInvalid={touched.description && errors.description}
                            />
                            <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>
                      </Col>
                    </Row>
                    {loading ? (
                      <Button variant="primary" type="submit" className="button w-100" disabled>
                        <Spinner animation="border" size="sm" /> Loading...
                      </Button>
                    ) : (
                      <Button variant="primary" type="submit" className="button w-100">
                        Update Category
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
