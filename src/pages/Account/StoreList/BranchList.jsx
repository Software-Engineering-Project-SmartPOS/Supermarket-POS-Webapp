import { Container, Card, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PathConstants from "../../../constants/pathConstants";

const BranchList = () => {
  const navigate = useNavigate();
  const branches = [
    {
      id: 1,
      name: "Branch 1",
      telephone: "0771234567",
      houseNumber: "123",
      street: "Street 1",
      city: "City 1",
      district: "District 1",
      postalCode: "12345",
    },
    {
      id: 2,
      name: "Branch 2",
      telephone: "0771234567",
      houseNumber: "123",
      street: "Street 2",
      city: "City 2",
      district: "District 2",
      postalCode: "12345",
    },
    {
      id: 3,
      name: "Branch 3",
      telephone: "0771234567",
      houseNumber: "123",
      street: "Street 3",
      city: "City 3",
      district: "District 3",
      postalCode: "12345",
    },
  ];

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
              {branches?.map((branch, index) => (
                <tr key={branch.id}>
                  <td>{index + 1}</td>
                  <td>{branch.name}</td>
                  <td>{branch.telephone}</td>
                  <td>
                    {branch.houseNumber}, {branch.street}
                  </td>
                  <td>{branch.city}</td>
                  <td>{branch.district}</td>
                  <td>{branch.postalCode}</td>
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
