import { Container, Table, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PathConstants from "../../../constants/pathConstants";
import { useQuery } from "@apollo/client";
import { GET_ALL_SUPPLIERS } from "../../../graphql/inventory";
import Skeleton from "react-loading-skeleton";
import { useEffect, useState } from "react";
import DeleteModal from "../../../components/DeleteModal";

const Suppliers = () => {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useQuery(GET_ALL_SUPPLIERS);
  const [show, setShow] = useState(false);
  useEffect(() => {
    refetch();
  }, [refetch]);
  if (loading) return <Skeleton count={20} />;
  if (error) return <Alert variant="danger">Error fetching data</Alert>;

  return (
    <Container>
      <div className="title d-flex justify-content-between pe-2">
        <h3>Suppliers</h3>
        <Button variant="success" size="sm" onClick={() => navigate("/" + PathConstants.ADD_SUPPLIER)}>
          Add Supplier
        </Button>
      </div>
      <Card border="light" className="table-responsive shadow">
        <Card.Body className="pt-0">
          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile Phone</th>
                <th>Land Phone</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.GetAllSuppliers?.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No suppliers found.
                  </td>
                </tr>
              ) : (
                data?.GetAllSuppliers?.map((supplier, index) => (
                  <tr key={supplier.id}>
                    <td>{index + 1}</td>
                    <td>{supplier.name}</td>
                    <td>{supplier.email}</td>
                    <td>{supplier.mobilePhone}</td>
                    <td>{supplier.landPhone}</td>
                    <td className="text-center">
                      <Button
                        variant="info"
                        size="sm"
                        className="mx-1"
                        onClick={() => navigate(`/${PathConstants.EDIT_SUPPLIER}/${supplier.id}`, { state: { supplier } })}
                      >
                        Edit
                      </Button>
                      <Button variant="danger" size="sm" className="mx-1" onClick={() => setShow(true)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <DeleteModal show={show} onClose={() => setShow(false)} message={"Supplier"} />
    </Container>
  );
};

export default Suppliers;
