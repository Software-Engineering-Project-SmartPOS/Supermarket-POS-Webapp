import { useState } from "react";
import { Container, Card, Table, Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useQuery } from "@apollo/client";
import PathConstants from "../../../constants/pathConstants";
import { GET_ALL_ITEMS } from "../../../graphql/items";
import Skeleton from "react-loading-skeleton";
import DeleteModal from "../../../components/DeleteModal";

const ItemList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: itemData, loading, error } = useQuery(GET_ALL_ITEMS);
  const [filteredItems, setFilteredItems] = useState([]);
  const [show, setShow] = useState(false);

  // Function to handle search
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    // Filter items based on name, itemCode, or other criteria
    const filtered = itemData?.GetAllItems.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.itemCode.includes(searchTerm) ||
        item.barcodeNo.includes(searchTerm) ||
        item.category.name.toLowerCase().includes(searchTerm) ||
        item.brand.name.toLowerCase().includes(searchTerm)
    );
    setFilteredItems(filtered);
  };

  if (loading) return <Skeleton count={20} />;
  if (error) return <Alert variant="danger">Error fetching the data</Alert>;

  return (
    <Container>
      <div className="title d-flex justify-content-between pe-2">
        <h3>Item List</h3>
        <Button variant="success" size="sm" onClick={() => navigate("/" + PathConstants.ADD_ITEM)}>
          Add Item
        </Button>
      </div>
      <div className="search-box">
        <Form.Group>
          <Form.Control type="text" placeholder="Search by name, item code, barcode, category, or brand" value={searchTerm} onChange={handleSearch} />
        </Form.Group>
      </div>

      <Card border="light" className="table-responsive shadow">
        <Card.Body className="pt-0">
          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Item Code</th>
                <th>Barcode</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Active</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(searchTerm === "" ? itemData?.GetAllItems : filteredItems).length > 0 ? (
                (searchTerm === "" ? itemData?.GetAllItems : filteredItems).map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.itemCode}</td>
                    <td>{item.barcodeNo}</td>
                    <td>{item.category.name}</td>
                    <td>{item.brand.name}</td>
                    <td>{item.active ? "Yes" : "No"}</td>
                    <td className="text-center">
                      <Button
                        variant="info"
                        size="sm"
                        className="mx-1"
                        onClick={() => navigate(`/${PathConstants.EDIT_ITEM}/${item.id}`, { state: { item } })}
                      >
                        Edit
                      </Button>
                      <Button variant="danger" size="sm" className="mx-1" onClick={() => setShow(true)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    {searchTerm === "" ? "No items found" : "No results found"}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <DeleteModal show={show} onClose={() => setShow(false)} message={"Item"} />
    </Container>
  );
};

export default ItemList;
