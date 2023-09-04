import { BiUserCircle } from "react-icons/bi";
import { FaShoppingBasket } from "react-icons/fa";
import ReactSearchBox from "react-search-box";

function AddCustomerOrProduct() {
  return (
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
          onSelect={(record) => console.log(record)}
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
