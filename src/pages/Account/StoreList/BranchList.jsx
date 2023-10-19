import { Container, Card, Table, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PathConstants from "../../../constants/pathConstants";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_BRANCH, GET_ALL_BRANCHES } from "../../../graphql/branch";
import Skeleton from "react-loading-skeleton";
import DeleteModal from "../../../components/DeleteModal";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const BranchList = () => {
  const navigate = useNavigate();
  const { loading, data, error, refetch } = useQuery(GET_ALL_BRANCHES);
  useEffect(() => {
    refetch();
  }, [refetch]);
  const [deleteBranch, { loading: delLoading }] = useMutation(DELETE_BRANCH);
  const [show, setShow] = useState(false);

  if (error)
    return (
      <Alert className="mt-3" variant="danger">
        {error.message}
      </Alert>
    );

  if (loading) return <Skeleton count={20} />;

  // Function to handle edit branch
  const handleEditBranch = (branchId) => {
    navigate(`/edit-branch/${branchId}`);
  };

  const handleDeleteBranch = (branchId) => {
    deleteBranch({ variables: { branchId: branchId } }).then((res) => {
      setShow(false);
      if (res.data.deleteBranch == "branch deleted") {
        toast.success("Branch deleted successfully");
        refetch();
      } else toast.error("This branch cannot be deleted");
    });
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
              {data.getAllBranch?.length > 0 ? (
                data.getAllBranch.map((branch, index) => (
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
                      <Button variant="danger" size="sm" className="mx-1" onClick={() => setShow(true)}>
                        Delete
                      </Button>
                      <DeleteModal
                        show={show}
                        onClose={() => setShow(false)}
                        handleYes={() => handleDeleteBranch(branch.id)}
                        message={"branch"}
                        loading={delLoading}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No branches found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BranchList;
