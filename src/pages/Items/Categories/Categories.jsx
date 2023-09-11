import { useNavigate } from "react-router";
import { Container, Table, Button, Card } from "react-bootstrap";
import PathConstants from "../../../constants/pathConstants";

const Categories = () => {
  const navigate = useNavigate();
  // Sample category data
  const categories = [
    { id: 1, description: "Category A" },
    { id: 2, description: "Category B" },
    { id: 3, description: "Category C" },
    // Add more category data as needed
  ];

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
                <th>Description</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category.id}>
                  <td>{index + 1}</td>
                  <td>{category.description}</td>
                  <td className="text-center">
                    <Button variant="info" size="sm" className="mx-1" onClick={() => navigate("/" + PathConstants.EDIT_CATEGORY)}>
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
