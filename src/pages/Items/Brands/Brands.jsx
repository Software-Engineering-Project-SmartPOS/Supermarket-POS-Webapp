import { useNavigate } from "react-router";
import { Container, Table, Button, Card, Alert } from "react-bootstrap";
import PathConstants from "../../../constants/pathConstants";
import { useQuery } from "@apollo/client";
import { GET_ALL_BRANDS } from "../../../graphql/items";
import Skeleton from "react-loading-skeleton";
import { useEffect, useState } from "react";
import DeleteModal from "../../../components/DeleteModal";

const Brands = () => {
  const navigate = useNavigate();
  const { loading, data, error, refetch } = useQuery(GET_ALL_BRANDS);
  const [show, setShow] = useState(false);
  useEffect(() => {
    refetch();
  }, [refetch]);
  if (loading) return <Skeleton count={20} />;
  if (error) return <Alert variant="danger">Error fetching data</Alert>;

  return (
    <Container>
      <div className="title d-flex justify-content-between pe-2">
        <h3>Brands</h3>
        <Button variant="success" size="sm" onClick={() => navigate("/" + PathConstants.ADD_BRAND)}>
          Add Brand
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
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.GetAllBrands.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    No brands to display.
                  </td>
                </tr>
              ) : (
                data?.GetAllBrands.map((brand, index) => (
                  <tr key={brand.id}>
                    <td>{index + 1}</td>
                    <td>{brand.name}</td>
                    <td>{brand.description}</td>
                    <td className="text-center">
                      <Button
                        variant="info"
                        size="sm"
                        className="mx-1"
                        onClick={() =>
                          navigate(`/${PathConstants.EDIT_BRAND}/${brand.id}`, {
                            state: { brand },
                          })
                        }
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

      <DeleteModal show={show} onClose={() => setShow(false)} message={"Brand"} />
    </Container>
  );
};

export default Brands;
