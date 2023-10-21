import { useState } from "react";
import ItemListTable from "../../../components/ItemList/ItemListTable";
import Filter from "../../../components/ItemList/Filter";

function ItemList() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Item 1",
      category: "Category A",
      price: 20.0,
      cost: 10.0,
      inStock: 50,
    },
    {
      id: 2,
      name: "Item 2",
      category: "Category B",
      price: 30.0,
      cost: 15.0,
      inStock: 30,
    },
    {
      id: 3,
      name: "Item 3",
      category: "Category A",
      price: 25.0,
      cost: 12.0,
      inStock: 20,
    },
    {
      id: 4,
      name: "Item 4",
      category: "Category C",
      price: 40.0,
      cost: 20.0,
      inStock: 15,
    },
  ]);

  // Define categories (you can fetch these from your API)
  const categories = [
    { id: 1, name: "Category A" },
    { id: 2, name: "Category B" },
    { id: 3, name: "Category C" },
  ];

  // Handle item updates, e.g., category, price, cost
  const handleUpdateItem = (itemId, updatedData) => {
    // Find the item by itemId
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, ...updatedData };
      }
      return item;
    });

    setItems(updatedItems);
  };

  // Implement filtering logic based on categories and stock alert
  const applyFilters = (filters) => {
    // Your filtering logic here
    // For example, you can filter items based on selected categories and stock alert

    // Example logic:
    const filteredItems = items.filter((item) => {
      const matchesCategory = !filters.selectedCategory || item.category === filters.selectedCategory;
      const isLowStock = filters.lowStock && item.inStock < 10; // Adjust the threshold as needed

      return matchesCategory && (!filters.lowStock || isLowStock);
    });

    setItems(filteredItems);
  };

  // Render the ItemListTable with items and categories
  return (
    <div className="App">
      <div className="title">
        <h3>Item List</h3>
      </div>
      {/* Add the Filter component with the applyFilters callback */}
      <Filter applyFilters={applyFilters} categories={categories} />
      <ItemListTable items={items} categories={categories} onUpdateItem={handleUpdateItem} />
    </div>
  );
}

export default ItemList;
