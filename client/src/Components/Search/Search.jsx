import React, { useState } from "react";
// import { faCoffee } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Search.css";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // const handleSearchSubmit = (event) => {
  //   event.preventDefault();
  //   // Perform search and display results
  //   console.log(`Searching for "${searchQuery}"...`);
  //   // Perform search and display results
  // };
  return (
    <>
      <div className="textlabel">
        <h2 className="find-place">Find a place with....</h2>
      </div>
      <div className="searchbox">
        {/* <label htmlFor="search-input">Search:</label> */}
        <input
          id="search-input"
          type="search"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Enter address or zip code .."
        />
        {/* <button onClick={handleSearchSubmit}>
{/* <i class="fa fa-search" aria-hidden="true"></i>
 */}
        <i class="far fa-search"></i>
        {/* <FontAwesomeIcon icon="fas fa-search" /> */}
        {/* </button> */}
        {/* <input type="submit" value="Search" onClick={handleSearchSubmit} /> */}
      </div>
      <div className="separator"></div>
    </>
  );
}

// // export default Search;
// In this example, we use the useState hook to create a state variable searchQuery, which is initially set to an empty string. We also create two functions: handleInputChange to update the searchQuery variable as the user types, and handleSearchSubmit to perform the search when the user clicks the "Search" button.

// The search component is rendered inside a form element that has an onSubmit handler set to handleSearchSubmit. The input field has an onChange handler set to handleInputChange to update the searchQuery state variable as the user types. Finally, the button has a type="submit" attribute to trigger the handleSearchSubmit function when the user clicks it.

// In this example, the handleSearchSubmit function logs the search query to the console for demonstration purposes. In a real application, you would replace this with the logic to actually perform the search and display the results.
