import { Button, InputGroup, FormControl } from "react-bootstrap";

function AddCustomerOrProduct() {
  function handleAddCustomer() {
    // Handle adding a customer here
  }

  function handleAddProduct() {
    // Handle manually adding a product here
  }
  return (
    <InputGroup className="mb-3">
      <FormControl placeholder="Search..." aria-label="Search" aria-describedby="basic-addon2" />
      <InputGroup.Append>
        <Button variant="primary" onClick={() => handleAddCustomer()}>
          Add Customer
        </Button>
        <Button variant="success" onClick={() => handleAddProduct()}>
          Add Product
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
}

export default AddCustomerOrProduct;
