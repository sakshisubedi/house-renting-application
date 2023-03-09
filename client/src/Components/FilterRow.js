import {
  Box,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  Select,
  MenuList,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";

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
    <Box my={10}>
      <HStack spacing="20px" margin="auto" m={10}>
        <Box w="630px" h="75px" border="1px solid darkgray" borderRadius="15px">
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
        </Box>
        {/*Price*/}
        <Select
          placeholder="Price"
          h="75px"
          defaultValue={rentPrice}
          fontSize="25px"
          border="1px solid #eaebef"
          width="180px"
          borderRadius="10px"
          onChange={(e) => {
            setRentPrice(e.target.value);
            props.search(
              postalCode,
              e.target.value,
              rating,
              beds,
              baths,
              petPref
            );
          }}
          bg="#eaebef"
        >
          <option value="<1000">&lt;1000</option>
          <option value="<2000">&lt;2000</option>
          <option value="<3000">&lt;3000</option>
          <option value="<4000">&lt;4000</option>
          <option value="<5000">&lt;5000</option>
        </Select>

        {/*Ratings*/}
        <Select
          placeholder="Rating"
          h="75px"
          defaultValue={rating}
          fontSize="25px"
          border="1px solid #eaebef"
          // w="max-content"
          width="180px"
          borderRadius="10px"
          onChange={(e) => {
            setRating(e.target.value);
            props.search(
              postalCode,
              rentPrice,
              e.target.value,
              beds,
              baths,
              petPref
            );
          }}
          bg="#eaebef"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Select>

        {/*Beds*/}
        <Select
          placeholder="Beds"
          h="75px"
          defaultValue={beds}
          fontSize="25px"
          border="1px solid #eaebef"
          w="max-content"
          width="180px"
          borderRadius="10px"
          onChange={(e) => {
            setBeds(e.target.value);
            props.search(
              postalCode,
              rentPrice,
              rating,
              e.target.value,
              baths,
              petPref
            );
          }}
          bg="#eaebef"
        >
          <option value="1">1 Bed</option>
          <option value="2">2 Bed</option>
          <option value="3">3 Bed</option>
        </Select>

        {/*Baths*/}
        <Select
          placeholder="Bathrooms"
          h="75px"
          defaultValue={baths}
          fontSize="25px"
          border="1px solid #eaebef"
          // w="max-content"
          width="180px"
          borderRadius="10px"
          onChange={(e) => {
            setBaths(e.target.value);
            props.search(
              postalCode,
              rentPrice,
              rating,
              beds,
              e.target.value,
              petPref
            );
          }}
          bg="#eaebef"
        >
          <option value="1">1 Bathroom</option>
          <option value="2">2 Bathroom</option>
          <option value="3">3 Bathroom</option>
        </Select>

        {/*More*/}

        <Select
          placeholder="Pet Preferences"
          h="75px"
          defaultValue={petPref}
          fontSize="25px"
          width="180px"
          border="1px solid #eaebef"
          // w="max-content"
          borderRadius="10px"
          onChange={(e) => {
            setPetPref(e.target.value);
            props.search(
              postalCode,
              rentPrice,
              rating,
              beds,
              baths,
              e.target.value
            );
          }}
          bg="#eaebef"
        >
          <option value="yes">yes</option>
          <option value="no">no</option>
        </Select>

        {/* </Flex> */}
      </HStack>
    </Box>
  );
}
export default FilterRow;
