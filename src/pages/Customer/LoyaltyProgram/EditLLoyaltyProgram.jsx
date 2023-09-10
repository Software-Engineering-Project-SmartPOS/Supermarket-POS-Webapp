import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Formik } from "formik"; // Import Formik
import * as Yup from "yup"; // Import Yup for validation
import PathConstants from "../../../constants/pathConstants";

const EditLoyaltyProgram = ({ loyaltyProgramId }) => {
  const navigate = useNavigate();
  const [programDetails, setProgramDetails] = useState({
    id: 1,
    name: "Gold Membership",
    description: "Exclusive rewards for loyal customers",
    rewardsStructure: "5% cashback on every purchase",
    eligibilityCriteria: "Minimum purchase amount of $1000",
  });

  // Fetch loyalty program details based on the loyaltyProgramId
  useEffect(() => {
    // Replace with actual API call to fetch loyalty program details by ID
    const fetchLoyaltyProgramDetails = async () => {
      try {
        const response = await fetch(`/api/loyalty-programs/${loyaltyProgramId}`);
        if (response.ok) {
          const data = await response.json();
          setProgramDetails(data);
        } else {
          console.error("Failed to fetch loyalty program details.");
        }
      } catch (error) {
        console.error("Error fetching loyalty program details:", error);
      }
    };

    fetchLoyaltyProgramDetails();
  }, [loyaltyProgramId]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    rewardsStructure: Yup.string().required("Rewards Structure is required"),
    eligibilityCriteria: Yup.string().required("Eligibility Criteria is required"),
  });

  const handleEditProgram = async (values) => {
    // Implement logic to send updated programDetails to the server to edit the loyalty program
    try {
      const response = await fetch(`/api/loyalty-programs/${loyaltyProgramId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // Redirect to Loyalty Program List Page after successful update
        navigate("/loyalty-programs");
      } else {
        console.error("Failed to edit loyalty program.");
      }
    } catch (error) {
      console.error("Error editing loyalty program:", error);
    }
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
              <h3 className="mb-0">Edit Loyalty Program</h3>
            </div>
          </div>

          {/* Wrap your form with Formik */}
          <Formik initialValues={programDetails} validationSchema={validationSchema} onSubmit={handleEditProgram}>
            {(formik) => (
              <Form>
                <Form.Group controlId="name" className="mb-4">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                  {formik.touched.name && formik.errors.name && <div className="text-danger">{formik.errors.name}</div>}
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
                <Form.Group controlId="rewardsStructure" className="mb-4">
                  <Form.Label>Rewards Structure</Form.Label>
                  <Form.Control
                    type="text"
                    name="rewardsStructure"
                    value={formik.values.rewardsStructure}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.rewardsStructure && formik.errors.rewardsStructure && (
                    <div className="text-danger">{formik.errors.rewardsStructure}</div>
                  )}
                </Form.Group>
                <Form.Group controlId="eligibilityCriteria" className="mb-4">
                  <Form.Label>Eligibility Criteria</Form.Label>
                  <Form.Control
                    type="text"
                    name="eligibilityCriteria"
                    value={formik.values.eligibilityCriteria}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.eligibilityCriteria && formik.errors.eligibilityCriteria && (
                    <div className="text-danger">{formik.errors.eligibilityCriteria}</div>
                  )}
                </Form.Group>
                <div className="d-flex justify-content-end">
                  <Button variant="primary" type="submit">
                    Save Changes
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </section>
  );
};

export default EditLoyaltyProgram;
