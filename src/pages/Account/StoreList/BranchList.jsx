import { useEffect, useState } from "react";
import { Container, Card, Table, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PathConstants from "../../../constants/pathConstants";
import { useDispatch, useSelector } from "react-redux";
// import { fetchBranches } from "../../../state/reducers/branch";

const BranchList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { branches } = useSelector((state) => state.branch);
  const [filteredBranches, setFilteredBranches] = useState([]);

  // useEffect(() => {
  //   dispatch(fetchBranches());
  // }, [dispatch]);

  // Function to handle search
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    // Filter branches based on name, telephone, or other criteria
    const filtered = branches.filter(
      (branch) =>
        branch.name.toLowerCase().includes(searchTerm) ||
        branch.telephone.includes(searchTerm) ||
        branch.city.toLowerCase().includes(searchTerm) ||
        branch.district.toLowerCase().includes(searchTerm) ||
        branch.postalCode.includes(searchTerm)
    );
    setFilteredBranches(filtered);
  };

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
      <div className="search-box">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Search by name, telephone, city, district, or postal code"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Form.Group>
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
              {(searchTerm === "" ? branches : filteredBranches).map((branch, index) => (
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
