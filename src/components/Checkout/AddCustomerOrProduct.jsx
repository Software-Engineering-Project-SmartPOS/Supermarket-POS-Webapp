import { BiUserCircle } from "react-icons/bi";
import { FaShoppingBasket } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { useState } from "react"; // Import React and useState
import ReactSearchBox from "react-search-box";
import ProfileImg from "../../assets/img/profile.png";
import { useQuery } from "@apollo/client";
import { GET_ALL_CUSTOMERS } from "../../graphql/customers";
import { useDispatch } from "react-redux";
import { GET_ALL_STOCK_LEVELS } from "../../graphql/inventory";
import { addSalesItem } from "../../state/reducers/checkout";

function AddCustomerOrProduct() {
  const dispatch = useDispatch();
  const { data: customers, loading: loadingCustomers, error: errorCustomers } = useQuery(GET_ALL_CUSTOMERS);
  const { data: items, loading: loadingItems, error: errorItems } = useQuery(GET_ALL_STOCK_LEVELS);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  if (loadingCustomers || loadingItems) return <p>Loading...</p>;
  if (errorCustomers || errorItems) return <p>Error :</p>;

  // Function to handle customer selection
  const handleCustomerSelect = (record) => {
    // Set the selected customer when a customer is selected
    setSelectedCustomer(record.item.name);
  };

  // Function to clear the selected customer
  const clearSelectedCustomer = () => {
    setSelectedCustomer(null);
  };

  return (
    <>
      {/* Render search box or selected customer */}
      {selectedCustomer ? (
        <div className="customer-row row">
          <span className="col-3">
            <img src={ProfileImg} className="rounded-circle customer-img" />
          </span>
          <span className="col-7 text-start">{selectedCustomer}</span>
          <span className="col-2 customer-close" onClick={clearSelectedCustomer}>
            <GrClose />
          </span>
        </div>
      ) : (
        <>
          <div className="search-box">
            <ReactSearchBox
              placeholder="Search Customers using name, email or phone number"
              data={customers.allCustomer.map((customer) => {
                return {
                  key: customer.id,
                  value: [customer.telephone, " | ", customer.email, " | ", customer.name],
                  name: customer.name + "-" + customer.email,
                };
              })}
              onSelect={handleCustomerSelect}
              autoFocus
              leftIcon={<BiUserCircle />}
              inputBorderColor="#002a54"
              iconBoxSize="48px"
              inputFontSize="16px"
              inputHeight="48px"
              dropdownBorderColor="#002a54"
              dropdownHoverColor="#c4dcf4"
            />
          </div>
        </>
      )}
      <div className="search-box mt-1">
        <ReactSearchBox
          placeholder="Search Products"
          data={items.AllStockLevels.map((item) => {
            return {
              key: item.id,
              value: [item.item.name, " | ", item.expiryDate, " | Rs.", item.sellingPrice, " | ", item.item.itemCode],
              item: item,
            };
          })}
          onSelect={(record) => {
            dispatch(
              addSalesItem({
                item: record.item,
                stockLevelId: record.item.id,
                quantity: 1,
              })
            );
          }}
          onFocus={() => {
            console.log("This function is called when is focussed");
          }}
          onChange={(value) => console.log(value)}
          clearOnSelect
          autoFocus
          value="Search Products"
          leftIcon={<FaShoppingBasket />}
          inputBorderColor="#002a54"
          iconBoxSize="48px"
          inputFontSize="16px"
          inputHeight="48px"
          dropdownBorderColor="#002a54"
          dropdownHoverColor="#c4dcf4"
        />
      </div>
    </>
  );
}

export default AddCustomerOrProduct;
