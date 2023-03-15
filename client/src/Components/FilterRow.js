/*
 * Filename: FilterRow.js
 *
 * This file defines the postal code input section and the dropdown menus on the search page
 * that give users the option to filter the search results. Users can filter their search
 * results by inputting a postal code, or by choosing ranges of rent price, rating, bedrooms,
 * bathrooms, and pet preference from the defined dropdowns.
 */

import {
  Input,
  Select,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import '../App.css'

import React from "react";

function FilterRow(props) {
  const [postalCode, setPostalCode] = React.useState("");
  const [rentPrice, setRentPrice] = React.useState("");
  const [rating, setRating] = React.useState("");
  const [beds, setBeds] = React.useState("");
  const [baths, setBaths] = React.useState("");
  const [petPref, setPetPref] = React.useState("");

  // Function to handle changes to the search input
  /**
   * handles postal code change, sets postal code and search the listing based on selected search param
   * @param {Object} event event object
   */
  const handlePostalCode = async (event) => {
      setPostalCode(event.target.value);
      props.search(event.target.value, rentPrice, rating, beds, baths, petPref);
  };

  const windowSize = React.useRef([window.innerWidth, window.innerHeight]);

  return (
    <Flex w={windowSize.current[0]} justifyContent='space-between' alignItems='center' gap='2' margin="auto">
      <Input 
        placeholder='Search by postal code' 
        type="search"
        onChange={handlePostalCode}
        size='lg'
        width={"50%"}
      />

      <Spacer />

      {/* Rent */}
      <Select 
        placeholder='Rent' 
        defaultValue={rentPrice}
        size='lg'
        border="1px solid #eaebef"
        outline="none"
        bg="#eaebef"
        color="black"
        className="search-filter"
        width={"10%"}
        onChange={(e) => {
          setRentPrice(e.target.value);
          props.search(postalCode, e.target.value, rating, beds, baths, petPref);
        }}
      >
        <option value="<1000">&lt;1000</option>
        <option value="<2000">&lt;2000</option>
        <option value="<3000">&lt;3000</option>
        <option value="<4000">&lt;4000</option>
        <option value="<5000">&lt;5000</option>
      </Select>

      <Spacer />

      {/* Rating */}
      <Select
        placeholder="Rating"
        defaultValue={rating}
        size='lg'
        border="1px solid #eaebef"
        outline="none"
        bg="#eaebef"
        color="black"
        className="search-filter"
        width={"10%"}
        onChange={(e) => {
          setRating(e.target.value);
          props.search(postalCode, rentPrice, e.target.value, beds, baths, petPref);
        }}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </Select>

      <Spacer />
      
      {/* Beds */}
      <Select
        placeholder="Beds"
        defaultValue={beds}
        size='lg'
        border="1px solid #eaebef"
        outline="none"
        bg="#eaebef"
        color="black"
        className="search-filter"
        width={"10%"}
        onChange={(e) => {
          setBeds(e.target.value);
          props.search(postalCode, rentPrice, rating, e.target.value, baths, petPref);

        }}
      >
        <option value="1">1 Bed</option>
        <option value="2">2 Bed</option>
        <option value="3">3 Bed</option>
      </Select>
          

      <Spacer />
      
      {/* Bathrooms */}
      <Select 
        placeholder='Bathrooms' 
        defaultValue={baths}
        size='lg'
        border="1px solid #eaebef"
        outline="none"
        bg="#eaebef"
        color="black"
        className="search-filter"
        width={"14%"}
        onChange={(e) => {
          setBaths(e.target.value);
          props.search(postalCode, rentPrice, rating, beds, e.target.value, petPref);
        }}
      >
        <option value="1">1 Bathroom</option>
        <option value="2">2 Bathroom</option>
        <option value="3">3 Bathroom</option>
      </Select>

      <Spacer />
      
      {/* Pets */}
      <Select 
        placeholder='Pet Preferences' 
        defaultValue={petPref}
        size='lg'
        border="1px solid #eaebef"
        outline="none"
        bg="#eaebef"
        color="black"
        className="search-filter"
        width={"17%"}
        onChange={(e) => {
          setPetPref(e.target.value);
          props.search(postalCode, rentPrice, rating, beds, baths, e.target.value);
        }}
      >
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </Select>

    </Flex>
  );
}
export default FilterRow;