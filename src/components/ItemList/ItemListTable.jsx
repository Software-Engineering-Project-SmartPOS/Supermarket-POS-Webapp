import { Card, Container, Table, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import PathConstants from "../../constants/pathConstants";

const ItemListTable = ({ items, categories, onUpdateItem }) => {
  const navigate = useNavigate();

  // Function to calculate margin
  const calculateMargin = (price, cost) => {
    if (!cost || cost === 0) return "N/A";
    const margin = ((price - cost) / cost) * 100;
    return `${margin.toFixed(2)}%`;
  };

  // Handle category change for an item
  const handleCategoryChange = (itemId, event) => {
    const newCategory = event.target.value;
    // Call the onUpdateItem function to update the category for the specific item
    onUpdateItem(itemId, { category: newCategory });
  };

  // Handle price change for an item
  const handlePriceChange = (itemId, event) => {
    const newPrice = parseFloat(event.target.value);
    // Call the onUpdateItem function to update the price for the specific item
    onUpdateItem(itemId, { price: newPrice });
  };

  // Handle cost change for an item
  const handleCostChange = (itemId, event) => {
    const newCost = parseFloat(event.target.value);
    // Call the onUpdateItem function to update the cost for the specific item
    onUpdateItem(itemId, { cost: newCost });
  };

  return (
    <Container>
      <Card border="light" className="table-responsive shadow">
        <Card.Body className="pt-0">
          <Table hover responsive>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Cost</th>
                <th>Margin</th>
                <th>In Stock</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <Form.Control as="select" value={item.category} onChange={(e) => handleCategoryChange(item.id, e)}>
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </Form.Control>
                  </td>
                  <td>
                    <Form.Control type="number" value={item.price} onChange={(e) => handlePriceChange(item.id, e)} />
                  </td>
                  <td>
                    <Form.Control type="number" value={item.cost} onChange={(e) => handleCostChange(item.id, e)} />
                  </td>
                  <td>{calculateMargin(item.price, item.cost)}</td>
                  <td>{item.inStock}</td>
                  <td className="text-center">
                    <Button variant="info" size="sm" className="mx-1" onClick={() => navigate(`/${PathConstants.EDIT_ITEM}`)}>
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

export default ItemListTable;
