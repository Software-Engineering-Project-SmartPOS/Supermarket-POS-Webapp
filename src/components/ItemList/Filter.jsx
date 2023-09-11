import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import PathConstants from "../../constants/pathConstants";

const Filter = ({ categories, onFilter }) => {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState([...categories.map((category) => ({ label: category.name, value: category.name }))]);
  const [selectedStockAlert, setSelectedStockAlert] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleApplyFilters = () => {
    // Create an object with selected filters
    const filters = {
      selectedCategories,
      selectedStockAlert,
      searchTerm,
    };

    // Pass the filters to the parent component's filter function
    onFilter(filters);
  };

  const categoryOptions = [...categories.map((category) => ({ label: category.name, value: category.name }))];

  const stockAlertOptions = [
    { label: "All Stock", value: null },
    { label: "Low Stock", value: "lowStock" },
    { label: "Out of Stock", value: "outOfStock" },
  ];

  return (
    <div className="container my-3">
      <div className="row">
        <div className="col">
          <input
            type="text"
            className="form-control border rounded border-black"
            placeholder="Search by item name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="col" style={{ minWidth: "20%" }}>
          <MultiSelect
            options={categoryOptions}
            value={selectedCategories}
            onChange={setSelectedCategories}
            labelledBy="Select Categories"
            disableSearch={true}
            hasSelectAll={true}
            className="border rounded border-black"
          />
        </div>

        <div className="col">
          <select
            className="form-select border rounded border-black"
            value={selectedStockAlert}
            onChange={(e) => setSelectedStockAlert(e.target.value)}
          >
            <option value={null}>All Stocks</option>
            <option value="lowStock">Low Stock</option>
            <option value="outOfStock">Out of Stock</option>
          </select>
        </div>

        <div className="col">
          <button className="btn btn-primary" onClick={handleApplyFilters}>
            Apply Filters
          </button>
          &nbsp;
          <button
            className="btn btn-success"
            onClick={() => {
              navigate("/" + PathConstants.ADD_ITEM);
            }}
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
