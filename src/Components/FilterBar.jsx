import React, { useState, useEffect } from "react";
import { getCategories } from "../Service/eventService";

const FilterBar = ({ onFilter }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <div className="filterbar-container">
      <label htmlFor="category">Filter by Category:</label>
      <select
        id="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="filterbar-dropdown"
      >
        <option value="">All</option>
        {categories.map((cat) => (
          <option key={cat.category_id} value={cat.category_id}>
            {cat.category_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
