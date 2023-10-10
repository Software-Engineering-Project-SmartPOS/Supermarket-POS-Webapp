import { Container, Card, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PathConstants from "../../../constants/pathConstants";
import { useQuery } from "@apollo/client";
import { GET_ALL_BRANCHES } from "../../../graphql/branch";

const BranchList = () => {
  const navigate = useNavigate();
  const { loading, data } = useQuery(GET_ALL_BRANCHES);

  if (loading) return <div>Loading...</div>;

  // Function to handle edit branch
  const handleEditBranch = (branchId) => {
    navigate(`/edit-branch/${branchId}`);
  };

  return (
    <Container>
      <div className="title d-flex justify-content-between pe-2">
        <h3>Branch List</h3>
        <Button variant="success" size="sm" onClick={() => navigate(`/${PathConstants.ADD_BRANCH}`)}>
          Add Branch
        </Button>
      </div>

      <Card border="light" className="table-responsive shadow">
        <Card.Body className="pt-0">
          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Telephone</th>
                <th>Address</th>
                <th>City</th>
                <th>District</th>
                <th>Postal Code</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.getAllBranches?.map((branch, index) => (
                <tr key={branch.id}>
                  <td>{index + 1}</td>
                  <td>{branch.name}</td>
                  <td>{branch.telephone}</td>
                  <td>
                    {branch.address.houseNumber}, {branch.street}
                  </td>
                  <td>{branch.address.city}</td>
                  <td>{branch.address.district}</td>
                  <td>{branch.address.postalCode}</td>
                  <td className="text-center">
                    <Button variant="info" size="sm" className="mx-1" onClick={() => handleEditBranch(branch.id)}>
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
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BranchList;
