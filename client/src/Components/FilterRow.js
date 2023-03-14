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
import { FaChevronDown } from "react-icons/fa";
import '../App.css'

import React, { useState } from "react";

function FilterRow(props) {
  let tempData = {
    name: "xyz",
    email: "xyz@gmail.com",
  };


  const [selectedPriceOption, setSelectedPriceOption] = useState(null);
  const handlePriceOptionSelect = (value) => {
    setSelectedPriceOption(value);
  };
  const [postalCode, setPostalCode] = React.useState("");
  const [rentPrice, setRentPrice] = React.useState("");
  const [rating, setRating] = React.useState("");
  const [beds, setBeds] = React.useState("");
  const [baths, setBaths] = React.useState("");
  const [petPref, setPetPref] = React.useState("");


  const handleInputChange = async (event) => {
    setPostalCode(event.target.value);
    props.search(event.target.value, rentPrice, rating, beds, baths, petPref);
  };

  return (
    <Flex minWidth='max-content' justifyContent='space-between' alignItems='center' gap='2' margin="2% 3% 2% 5%">
      <Input 
        placeholder='Search by postal code' 
        type="search"
        onChange={handleInputChange}
        size='lg'
        width={"50%"}
      />

      <Spacer />
    <Box my={5}>
      <Flex
        minH={'75px'}
        margin="auto">
        <HStack spacing="20px">
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} w={{ base: "600px", md: "700px", lg: "850px" }} h="75px" border="1px solid darkgray" borderRadius="15px">
              <Input
                id="search-input"
                type="search"
                placeholder="Location"
                h="100%"
                border="none"
                fontSize="27px"
                outline="none"
                px={4}
                onChange={handleInputChange}
              />
          </Flex>

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
          {/*rentPrice */}
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} w="100%" maxW="160px">
            <Select
              placeholder="Rent"
              h="75px"

              defaultValue={rentPrice}
              fontSize="25px"
              border="1px solid #eaebef"
              borderRadius="10px"
              onChange={(e) => {
                setRentPrice(e.target.value);

                props.search(postalCode, e.target.value, rating, beds, baths, petPref);

              }}
              bg="#eaebef"
            >
              <option value="<1000">&lt;1000</option>
              <option value="<2000">&lt;2000</option>
              <option value="<3000">&lt;3000</option>
              <option value="<4000">&lt;4000</option>
              <option value="<5000">&lt;5000</option>
            </Select>
          </Flex>

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
          {/*More*/}
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} w="100%" maxW="160px">
            <Select
              placeholder="Pet Preferences"
              h="75px"
              defaultValue={petPref}
              fontSize="25px"
              border="1px solid #eaebef"
              // w="max-content"
              borderRadius="10px"
              onChange={(e) => {
                setPetPref(e.target.value);

                props.search(postalCode, rentPrice, rating, beds, baths, e.target.value);
              }}
              bg="#eaebef"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </Flex>
        </HStack>
        {/* </Flex> */}
      </Flex>

    </Box>
  );
}
export default FilterRow;
