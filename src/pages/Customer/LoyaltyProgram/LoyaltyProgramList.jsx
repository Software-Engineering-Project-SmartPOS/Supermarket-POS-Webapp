import { Container, Table, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router";
import PathConstants from "../../../constants/pathConstants";
import { useQuery } from "@apollo/client";
import { GET_ALL_LOYALTY_PROGRAMS } from "../../../graphql/customers";
import Skeleton from "react-loading-skeleton";
import DeleteModal from "../../../components/DeleteModal";
import { useState } from "react";

const LoyaltyProgramList = () => {
  const navigate = useNavigate();
  const { loading, data, error } = useQuery(GET_ALL_LOYALTY_PROGRAMS);
  const [show, setShow] = useState(false);

  const handlEditLoyaltyProgram = (program) => {
    navigate("/" + PathConstants.EDIT_LOYALTY_PROGRAM, { state: { program } });
  };
  const handlAddLoyaltyProgram = () => {
    navigate("/" + PathConstants.ADD_LOYALTY_PROGRAM);
  };
  if (loading) return <Skeleton count={20} />;
  if (error) return <Alert variant="danger">{error.message}</Alert>;

  return (
    <Container>
      <div className="title d-flex justify-content-between pe-2">
        <h3>Loyalty Programs</h3>
        <Button variant="success" size="sm" onClick={handlAddLoyaltyProgram}>
          Add Loyalty Program
        </Button>
      </div>
      <Card border="light" className="table-responsive shadow">
        <Card.Body className="pt-0">
          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Points Threshold</th>
                <th>Discount Percentage</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.getAllLoyaltyPrograms.map((program, index) => (
                <tr key={program.id}>
                  <td>{index + 1}</td>
                  <td>{program.loyaltyProgramName}</td>
                  <td>{program.description}</td>
                  <td>{program.pointsThreshold}</td>
                  <td>{program.discountPercentage}%</td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      className="mx-1"
                      onClick={() => {
                        handlEditLoyaltyProgram(program);
                      }}
                    >
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" className="mx-1" onClick={() => setShow(true)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <DeleteModal show={show} onClose={() => setShow(false)} message={"loyalty program"} />
    </Container>
  );
};

export default LoyaltyProgramList;
