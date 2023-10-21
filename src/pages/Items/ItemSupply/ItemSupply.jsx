import React, { useState } from "react";
import { Container, Table, Button, Card, Form } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_ACTIVE_ITEM_SUPPLIES_BY_ITEM_ID, GET_ACTIVE_ITEM_SUPPLIES_BY_SUPPLIER_ID, GET_ALL_SUPPLIERS } from "../../../graphql/inventory";
import { GET_ALL_ITEMS } from "../../../graphql/items";

const ItemSupply = () => {
  const [searchType, setSearchType] = useState("supplier");
  const [searchId, setSearchId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const { data: itemData, loading: itemLoading } = useQuery(GET_ALL_ITEMS);
  const { data: supplierData, loading: supplierLoading } = useQuery(GET_ALL_SUPPLIERS);

  const [loadData, { loading }] = useLazyQuery(
    searchType === "supplier" ? GET_ACTIVE_ITEM_SUPPLIES_BY_SUPPLIER_ID : GET_ACTIVE_ITEM_SUPPLIES_BY_ITEM_ID
  );

  const handleSearch = () => {
    loadData({
      variables: {
        supplierId: searchId ? searchId : null,
        itemId: searchId ? searchId : null,
      },
    })
      .then((res) => {
        console.log(res);
        if (!res.loading && res.data) {
          setSearchResults(res.data[searchType === "supplier" ? "GetActiveItemSuppliesBySupplierId" : "GetActiveItemSuppliesByItemId"]);
        }
      })
      .finally(() => {});
  };

  if (itemLoading || supplierLoading) return <Skeleton count={5} />;

  const suppliers = supplierData.GetAllSuppliers.map((supplier) => ({ name: supplier.name, id: supplier.id }));
  const items = itemData.GetAllItems.map((item) => ({ name: item.name, id: item.id }));

  return (
    <Container>
      <div className="title d-flex justify-content-between pe-2">
        <h3>Item Supply</h3>
        <Form.Select
          value={searchType}
          onChange={(e) => {
            setSearchType(e.target.value);
            setSearchId(null);
            setSearchResults([]);
          }}
          style={{ maxWidth: "200px" }}
        >
          <option value="supplier">Search by Supplier</option>
          <option value="item">Search by Item</option>
        </Form.Select>
        <input
          list={searchType === "supplier" ? "suppliers" : "items"}
          value={searchId ? searchId : ""}
          placeholder="Search by ID"
          onChange={(e) => {
            setSearchId(e.target.value);
          }}
        />
        <datalist id={searchType === "supplier" ? "suppliers" : "items"}>
          {searchType === "supplier"
            ? suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))
            : items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
        </datalist>
        <Button variant="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>
      <Card border="light" className="table-responsive shadow">
        <Card.Body className="pt-0">
          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Unit Cost</th>
                <th>Active</th>
                {searchType === "supplier" ? (
                  <>
                    <th>Supplier</th>
                    <th>Item Code</th>
                    <th>Item Name</th>
                  </>
                ) : (
                  <>
                    <th>Item Name</th>
                    <th>Supplier Name</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    <Skeleton count={5} />
                  </td>
                </tr>
              ) : searchResults.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No results to display
                  </td>
                </tr>
              ) : (
                searchResults.map((result, index) => (
                  <tr key={result.id}>
                    <td>{index + 1}</td>
                    <td>Rs. {result.unitCost}</td>
                    <td>{result.active ? "Yes" : "No"}</td>
                    {searchType === "supplier" ? (
                      <>
                        <td>{result.supplier.name}</td>
                        <td>{result.item.itemCode}</td>
                        <td>{result.item.name}</td>
                      </>
                    ) : (
                      <>
                        <td>{result.item.name}</td>
                        <td>{result.supplier.id}</td>
                        <td>{result.supplier.name}</td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ItemSupply;
