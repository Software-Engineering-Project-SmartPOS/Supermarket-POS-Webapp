import React, { useState } from "react";
import { Container, Card, Table, Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import { GET_ALL_STOCK_LEVELS } from "../../../graphql/inventory";

const StockList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: stocksData, loading, error } = useQuery(GET_ALL_STOCK_LEVELS);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  // Function to handle search
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    // Filter stocks based on item name, itemCode, or other criteria
    const filtered = stocksData?.AllStockLevels.filter(
      (stock) =>
        stock.item.name.toLowerCase().includes(searchTerm) || stock.item.itemCode.includes(searchTerm) || stock.item.barcodeNo.includes(searchTerm)
    );
    setFilteredStocks(filtered);
  };

  // Function to handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      // If the same field is clicked again, toggle the sort order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If a different field is clicked, set it as the new sort field and default to ascending order
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Function to sort data based on the selected field
  const sortData = (data, field) => {
    return data.slice().sort((a, b) => {
      if (a[field] > b[field]) return sortOrder === "asc" ? 1 : -1;
      if (a[field] < b[field]) return sortOrder === "asc" ? -1 : 1;
      return 0;
    });
  };

  // Function to render sorting icons
  const renderSortIcons = (field) => {
    if (sortField === field) {
      if (sortOrder === "asc") {
        return <FontAwesomeIcon icon={faSortUp} />;
      } else {
        return <FontAwesomeIcon icon={faSortDown} />;
      }
    }
    return <FontAwesomeIcon icon={faSort} />;
  };

  // Sort the stocks data based on the selected field
  const sortedStocks = sortField
    ? sortData(searchTerm === "" ? stocksData?.AllStockLevels : filteredStocks, sortField)
    : searchTerm === ""
    ? stocksData?.AllStockLevels
    : filteredStocks;

  if (loading) return <Skeleton count={20} />;
  if (error) return <Alert variant="danger">Error fetching the data</Alert>;

  return (
    <Container>
      <div className="title d-flex justify-content-between pe-2">
        <h3>Stocks List</h3>
        <Button variant="success" size="sm" onClick={() => navigate("/add-stock")}>
          Add Stock
        </Button>
      </div>
      <div className="search-box">
        <Form.Group>
          <Form.Control type="text" placeholder="Search by item name, item code, barcode" value={searchTerm} onChange={handleSearch} />
        </Form.Group>
      </div>

      <Card border="light" className="table-responsive shadow">
        <Card.Body className="pt-0">
          <Table responsive hover>
            <thead>
              <tr>
                <th># </th>
                <th onClick={() => handleSort("item.name")}>Item {renderSortIcons("item.name")}</th>
                <th onClick={() => handleSort("item.itemCode")}>Item Code {renderSortIcons("item.itemCode")}</th>
                <th onClick={() => handleSort("item.barcodeNo")}>Barcode {renderSortIcons("item.barcodeNo")}</th>
                <th onClick={() => handleSort("expiryDate")}>Expiry Date {renderSortIcons("expiryDate")}</th>
                <th onClick={() => handleSort("inventoryQuantity")}>Inventory Quantity {renderSortIcons("inventoryQuantity")}</th>
                <th onClick={() => handleSort("stallQuantity")}>Stall Quantity {renderSortIcons("stallQuantity")}</th>
                <th onClick={() => handleSort("sellingPrice")}>Selling Price {renderSortIcons("sellingPrice")}</th>
                <th onClick={() => handleSort("branch.name")}>Branch {renderSortIcons("branch.name")}</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedStocks.length > 0 ? (
                sortedStocks.map((stock, index) => (
                  <tr key={stock.id}>
                    <td>{index + 1}</td>
                    <td>{stock.item.name}</td>
                    <td>{stock.item.itemCode}</td>
                    <td>{stock.item.barcodeNo}</td>
                    <td>{stock.expiryDate}</td>
                    <td>{stock.inventoryQuantity}</td>
                    <td>{stock.stallQuantity}</td>
                    <td>{stock.sellingPrice}</td>
                    <td>{stock.branch.name}</td>
                    <td className="text-center">
                      <Button variant="info" size="sm" className="mx-1" onClick={() => navigate(`/edit-stock/${stock.id}`)}>
                        Edit
                      </Button>
                      <Button variant="danger" size="sm" className="mx-1">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center">
                    {searchTerm === "" ? "No stocks found" : "No results found"}
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

export default StockList;
