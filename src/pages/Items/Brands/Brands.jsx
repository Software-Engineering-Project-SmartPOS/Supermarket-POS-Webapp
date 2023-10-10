import { useNavigate } from "react-router";
import { Container, Table, Button, Card } from "react-bootstrap";
import PathConstants from "../../../constants/pathConstants";
import { useQuery } from "@apollo/client";
import { GET_ALL_BRANDS } from "../../../graphql/items";

const Brands = () => {
  const navigate = useNavigate();
  const { loading, data } = useQuery(GET_ALL_BRANDS);

  if (loading) return <div>Loading...</div>;

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
              {data.GetAllBrands.map((brand, index) => (
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

export default Brands;
