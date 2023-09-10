import { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import PathConstants from "../../../constants/pathConstants";

const LoyaltyProgramList = () => {
  const navigate = useNavigate();

  const [loyaltyPrograms, setLoyaltyPrograms] = useState([
    {
      id: 1,
      name: "Gold Membership",
      description: "Exclusive rewards for loyal customers",
      rewardsStructure: "5% cashback on every purchase",
      eligibilityCriteria: "Minimum purchase amount of $1000",
    },
    {
      id: 2,
      name: "Platinum Membership",
      description: "Premium rewards and benefits",
      rewardsStructure: "10% cashback on every purchase",
      eligibilityCriteria: "Minimum purchase amount of $2000",
    },
    {
      id: 3,
      name: "Silver Membership",
      description: "Basic loyalty program",
      rewardsStructure: "2% cashback on every purchase",
      eligibilityCriteria: "Minimum purchase amount of $500",
    },
  ]);

  // Fetch loyalty programs from your backend API or database
  useEffect(() => {
    // Replace with actual API call to fetch loyalty programs
    const fetchLoyaltyPrograms = async () => {
      try {
        const response = await fetch("/api/loyalty-programs");
        if (response.ok) {
          const data = await response.json();
          setLoyaltyPrograms(data);
        } else {
          console.error("Failed to fetch loyalty programs.");
        }
      } catch (error) {
        console.error("Error fetching loyalty programs:", error);
      }
    };

    fetchLoyaltyPrograms();
  }, []);

  const handlEditLoyaltyProgram = () => {
    navigate("/" + PathConstants.EDIT_LOYALTY_PROGRAM);
  };
  const handlAddLoyaltyProgram = () => {
    navigate("/" + PathConstants.ADD_LOYALTY_PROGRAM);
  };
  return (
    <Container>
      <div className="title d-flex justify-content-between pe-2">
        <h3>Loyalty Programs</h3>
        <Button variant="success" size="sm" onClick={handlAddLoyaltyProgram}>
          Add Loyalty Program
        </Button>
      </div>

      <Table responsive hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Rewards Structure</th>
            <th>Eligibility Criteria</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loyaltyPrograms.map((program, index) => (
            <tr key={program.id}>
              <td>{index + 1}</td>
              <td>{program.name}</td>
              <td>{program.description}</td>
              <td>{program.rewardsStructure}</td>
              <td>{program.eligibilityCriteria}</td>
              <td>
                <Button variant="info" size="sm" className="mx-1" onClick={handlEditLoyaltyProgram}>
                  Edit
                </Button>
                <Button variant="danger" size="sm" className="mx-1">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default LoyaltyProgramList;
