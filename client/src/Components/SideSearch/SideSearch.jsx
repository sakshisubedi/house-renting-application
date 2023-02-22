import React, { useState } from "react";
import "./SideSearch.css";
export default function SideSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <>
      <div className="filter-row">
        <div className="search-container">
          <input
            id="search-input"
            type="search"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Location"
          />
        </div>
        <select id="price" name="price">
          <option value="apple">Price</option>
          <option value="banana">2000+</option>
          <option value="orange">1000-2000</option>
          <option value="strawberry">700-1000</option>
        </select>
        <select id="dropdown" name="dropdown">
          <option value="apple">Ratings</option>
          <option value="banana">top rated</option>
          <option value="orange">average</option>
          <option value="strawberry">below average</option>
        </select>
        <select id="dropdown" name="dropdown">
          <option value="apple">Beds</option>
          <option value="banana">1 Bed</option>
          <option value="orange">2 Bed</option>
          <option value="strawberry">3 Bed</option>
        </select>
        <select id="dropdown" name="dropdown">
          <option value="apple">Baths</option>
          <option value="banana">2bath</option>
          <option value="orange">1 bath</option>
          <option value="strawberry">3 Bath</option>
        </select>
        <select id="dropdown" name="dropdown">
          <option value="apple">More</option>
          <option value="banana">pet friendly</option>
          <option value="orange">With Gym</option>
          <option value="strawberry">With pool</option>
        </select>
      </div>
    </>
  );
}
