import { useNavigate } from "react-router";
import { Container, Table, Button, Card } from "react-bootstrap";
import PathConstants from "../../../constants/pathConstants";
import { useQuery } from "@apollo/client";
import { GET_ALL_CATEGORIES } from "../../../graphql/items";

const Categories = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_ALL_CATEGORIES);
  console.log(data);
  if (loading) return <div>Loading...</div>;
  return (
    <Container>
      <div className="title d-flex justify-content-between pe-2">
        <h3>Categories</h3>
        <Button variant="success" size="sm" onClick={() => navigate("/" + PathConstants.ADD_CATEGORY)}>
          Add Category
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
              {data.GetAllCategories.map((category, index) => (
                <tr key={category.id}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td className="text-center">
                    <Button
                      variant="info"
                      size="sm"
                      className="mx-1"
                      onClick={() => navigate(`/${PathConstants.EDIT_CATEGORY}/${category.id}`, { state: { category } })}
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

export default Categories;
