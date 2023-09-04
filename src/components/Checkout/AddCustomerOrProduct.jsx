import { BiUserCircle } from "react-icons/bi";
import { FaShoppingBasket } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { useState } from "react"; // Import React and useState
import ReactSearchBox from "react-search-box";
import ProfileImg from "../../assets/img/profile.jpg";

function AddCustomerOrProduct() {
  // State to keep track of the selected customer
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Function to handle customer selection
  const handleCustomerSelect = (record) => {
    // Set the selected customer when a customer is selected
    setSelectedCustomer(record);
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
          <span className="col-7 text-start">Kobinarth Panchalingam</span>
          <span className="col-2 customer-close" onClick={clearSelectedCustomer}>
            <GrClose />
          </span>
        </div>
      ) : (
        <>
          <div className="search-box">
            <ReactSearchBox
              placeholder="Search Customers"
              data={[
                {
                  key: "john",
                  value: "John Doe",
                },
                {
                  key: "jane",
                  value: "Jane Doe",
                },
                {
                  key: "mary",
                  value: "Mary Phillips",
                },
                {
                  key: "robert",
                  value: "Robert",
                },
                {
                  key: "karius",
                  value: "Karius",
                },
              ]}
              onSelect={handleCustomerSelect}
              onFocus={() => {
                console.log("This function is called when is focussed");
              }}
              onChange={(value) => console.log(value)}
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
          data={[
            {
              key: "john",
              value: "John Doe",
            },
            {
              key: "jane",
              value: "Jane Doe",
            },
            {
              key: "mary",
              value: "Mary Phillips",
            },
            {
              key: "robert",
              value: "Robert",
            },
            {
              key: "karius",
              value: "Karius",
            },
          ]}
          onSelect={(record) => console.log(record)}
          onFocus={() => {
            console.log("This function is called when is focussed");
          }}
          onChange={(value) => console.log(value)}
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
