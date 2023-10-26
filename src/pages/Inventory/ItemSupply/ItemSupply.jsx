import React, { useState } from "react";
import { Container, Table, Button, Card, Form, Alert } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import {
  DELETE_ITEM_SUPPLY,
  GET_ACTIVE_ITEM_SUPPLIES_BY_ITEM_ID,
  GET_ACTIVE_ITEM_SUPPLIES_BY_SUPPLIER_ID,
  GET_ALL_SUPPLIERS,
} from "../../../graphql/inventory";
import { GET_ALL_ITEMS } from "../../../graphql/items";
import { useNavigate } from "react-router";
import PathConstants from "../../../constants/pathConstants";
import DeleteModal from "../../../components/DeleteModal";
import { toast } from "react-toastify";

const ItemSupply = () => {
  const [searchType, setSearchType] = useState("supplier");
  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const { data: itemData, loading: itemLoading, error: itemError } = useQuery(GET_ALL_ITEMS);
  const { data: supplierData, loading: supplierLoading, error: supplierError } = useQuery(GET_ALL_SUPPLIERS);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [deleteItemSupply, { loading: delLoading }] = useMutation(DELETE_ITEM_SUPPLY);
  const [itemSupplyId, setItemSupplyId] = useState(null);

  const [loadData, { loading, refetch }] = useLazyQuery(
    searchType === "supplier" ? GET_ACTIVE_ITEM_SUPPLIES_BY_SUPPLIER_ID : GET_ACTIVE_ITEM_SUPPLIES_BY_ITEM_ID
  );

  const handleSearch = () => {
    if (!searchId) {
      setSearchResults([]);
      return;
    }
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

  const handleDeleteItemSupply = (itemSupplyId) => {
    deleteItemSupply({ variables: { itemSupplyId: itemSupplyId } }).then((res) => {
      setShow(false);
      if (res.data.DeleteItemSupply) {
        toast.success("Item supply deleted successfully");
        refetch();
      } else toast.error("This item supply cannot be deleted");
    });
  };

  if (itemLoading || supplierLoading) return <Skeleton count={5} />;

  if (itemError || supplierError) return <Alert variant="danger">Error fetching data</Alert>;

  const suppliers = supplierData.GetAllSuppliers.map((supplier) => ({ name: supplier.name, id: supplier.id }));
  const items = itemData.GetAllItems.map((item) => ({ name: item.name, id: item.id }));

  return (
    <Container>
      <div className="title d-flex justify-content-between pe-2">
        <h3>Item Supply</h3>
        <div className="d-flex ">
          <Form.Select
            value={searchType}
            onChange={(e) => {
              setSearchType(e.target.value);
              setSearchId(null);
              setSearchName("");
              setSearchResults([]);
            }}
            style={{ maxWidth: "200px" }}
          >
            <option value="supplier">Search by Supplier</option>
            <option value="item">Search by Item</option>
          </Form.Select>
          <input
            list={searchType === "supplier" ? "suppliers" : "items"}
            placeholder="Search by ID, name"
            value={searchName}
            onChange={(e) => {
              setSearchId(e.target.value.split("-", 1)[0]);
              setSearchName(e.target.value);
            }}
          />
          <datalist id={searchType === "supplier" ? "suppliers" : "items"}>
            {searchType === "supplier"
              ? suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id + "-" + supplier.name}>
                    {supplier.name}
                  </option>
                ))
              : items.map((item) => (
                  <option key={item.id} value={item.id + "-" + item.name}>
                    {item.name}
                  </option>
                ))}
          </datalist>
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </div>
        <Button variant="success" size="sm" onClick={() => navigate("/" + PathConstants.ADD_ITEM_SUPPLY)}>
          Add Item
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
                    <th>Supplier</th>
                    <th>Item Code</th>
                    <th>Item Name</th>
                  </>
                )}
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    <Skeleton count={6} />
                  </td>
                </tr>
              ) : searchResults.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
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
                        <td>{result.supplier.name}</td>
                        <td>{result.item.name}</td>
                        <td>{result.item.itemCode}</td>
                      </>
                    )}
                    <td className="text-center">
                      <Button
                        variant="info"
                        size="sm"
                        className="mx-1"
                        onClick={() => navigate(`/${PathConstants.EDIT_ITEM_SUPPLY}/${result.id}`, { state: { itemSupply: result } })}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="mx-1"
                        onClick={() => {
                          setShow(true);
                          setItemSupplyId(result.id);
                        }}
                      >
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
      <DeleteModal
        show={show}
        onClose={() => setShow(false)}
        handleYes={() => handleDeleteItemSupply(searchId)}
        message={"itemsupply"}
        loading={delLoading}
      />
    </Container>
  );
};

export default ItemSupply;
