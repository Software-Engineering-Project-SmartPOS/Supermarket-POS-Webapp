import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Formik } from "formik";
import * as Yup from "yup";
import PathConstants from "../../../constants/pathConstants";
import { useMutation } from "@apollo/client";
import { ADD_LOYALTY_PROGRAM } from "../../../graphql/customers";
import { toast } from "react-toastify";

const AddLoyaltyProgram = () => {
  const navigate = useNavigate();
  const [addLoyaltyProgram, { loading, error }] = useMutation(ADD_LOYALTY_PROGRAM);
  if (error) {
    console.log(error);
    toast.error("Error adding loyalty program");
  }
  const programDetails = {
    loyaltyProgramName: "",
    description: "",
    pointsThreshold: 0,
    discountPercentage: 0,
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    loyaltyProgramName: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    pointsThreshold: Yup.number().required("Rewards Structure is required").min(0),
    discountPercentage: Yup.number().required("Eligibility Criteria is required").min(0),
  });

  const handleAddProgram = (values, { resetForm }) => {
    addLoyaltyProgram({ variables: { newProgramInput: values } })
      .then((response) => {
        console.log(response.data.AddLoyaltyProgram);
        toast.success("Loyalty Program added successfully");
        resetForm();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error adding loyalty program");
      });
  };

  return (
    <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
      <Container>
        <div className="bg-white shadow-lg border rounded border-light px-5 py-2 w-100">
          <div className="d-flex">
            <div className="text-start" onClick={() => navigate("/" + PathConstants.LOYALTY_PROGRAMS)}>
              <button type="button" className="btn btn-outline-primary">
                <FontAwesomeIcon icon={faChevronLeft} /> Back
              </button>
            </div>
            <div className="text-center text-md-center mt-md-0 flex-grow-1">
              <h3 className="mb-0">Add Loyalty Program</h3>
            </div>
          </div>

          {/* Wrap your form with Formik */}
          <Formik initialValues={programDetails} validationSchema={validationSchema} onSubmit={handleAddProgram}>
            {(formik) => (
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group controlId="loyaltyProgramName" className="mb-4">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="loyaltyProgramName"
                    value={formik.values.loyaltyProgramName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.loyaltyProgramName && formik.errors.loyaltyProgramName && (
                    <div className="text-danger">{formik.errors.loyaltyProgramName}</div>
                  )}
                </Form.Group>
                <Form.Group controlId="description" className="mb-4">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.description && formik.errors.description && <div className="text-danger">{formik.errors.description}</div>}
                </Form.Group>
                <Form.Group controlId="pointsThreshold" className="mb-4">
                  <Form.Label>Points Threshold</Form.Label>
                  <Form.Control
                    type="number"
                    name="pointsThreshold"
                    value={formik.values.pointsThreshold}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.pointsThreshold && formik.errors.pointsThreshold && (
                    <div className="text-danger">{formik.errors.pointsThreshold}</div>
                  )}
                </Form.Group>
                <Form.Group controlId="discountPercentage" className="mb-4">
                  <Form.Label>Discount Percentage</Form.Label>
                  <Form.Control
                    type="number"
                    name="discountPercentage"
                    value={formik.values.discountPercentage}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.discountPercentage && formik.errors.discountPercentage && (
                    <div className="text-danger">{formik.errors.discountPercentage}</div>
                  )}
                </Form.Group>
                <div className="d-flex justify-content-end">
                  {loading ? (
                    <Button variant="primary" type="submit" className="button w-100" disabled>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Loading...
                    </Button>
                  ) : (
                    <Button variant="primary" type="submit" className="button w-100">
                      Add Program
                    </Button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </section>
  );
};

export default AddLoyaltyProgram;
