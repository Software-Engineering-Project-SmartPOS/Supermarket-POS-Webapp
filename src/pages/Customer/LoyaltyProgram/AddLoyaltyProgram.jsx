import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const AddLoyaltyProgram = () => {
  const navigate = useNavigate();
  const [programDetails, setProgramDetails] = useState({
    name: "",
    description: "",
    rewardsStructure: "",
    eligibilityCriteria: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProgramDetails({
      ...programDetails,
      [name]: value,
    });
  };

  const handleAddProgram = async () => {
    // Implement logic to send programDetails to the server to create a new loyalty program
    try {
      const response = await fetch("/api/loyalty-programs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(programDetails),
      });

      if (response.ok) {
        // Redirect to Loyalty Program List Page after successful creation
        navigate("/loyalty-programs");
      } else {
        console.error("Failed to add loyalty program.");
      }
    } catch (error) {
      console.error("Error adding loyalty program:", error);
    }
  };

  return (
    <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
      <Container>
        <div className="bg-white shadow-lg border rounded border-light px-5 py-2 w-100">
          <div className="d-flex">
            <div className="text-start" onClick={() => navigate(-1)}>
              <button type="button" className="btn btn-outline-primary">
                <FontAwesomeIcon icon={faChevronLeft} /> Back
              </button>
            </div>
            <div className="text-center text-md-center mt-md-0 flex-grow-1">
              <h3 className="mb-0">Add Loyalty Program</h3>
            </div>
          </div>

          <Form>
            <Form.Group controlId="name" className="mb-4">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={programDetails.name} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="description" className="mb-4">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" name="description" value={programDetails.description} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="rewardsStructure" className="mb-4">
              <Form.Label>Rewards Structure</Form.Label>
              <Form.Control type="text" name="rewardsStructure" value={programDetails.rewardsStructure} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="eligibilityCriteria" className="mb-4">
              <Form.Label>Eligibility Criteria</Form.Label>
              <Form.Control type="text" name="eligibilityCriteria" value={programDetails.eligibilityCriteria} onChange={handleInputChange} />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="primary" onClick={handleAddProgram}>
                Add Program
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </section>
  );
};

export default AddLoyaltyProgram;
