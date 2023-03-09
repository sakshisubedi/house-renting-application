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
  // const [pronouns, setPronouns] = React.useState(tempData.pronouns ?? null);

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
      {/* <Flex pl={10} pt={5}> */}
      <HStack spacing="20px" margin="auto" m={10}>
        <Box
          w="630px"
          h="83px"
          border="1px solid darkgray"
          borderRadius="15px"
          // ml={10}
          m={0}
        >
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
        {/*rentPrice */}
        {/* <Menu>
          <MenuButton
            as={Box}
            w="150px"
            h="83px"
            borderRadius="10px"
            bg="#eaebef"
            border="1px solid #eaebef"
            fontSize="27px"
          >
            <HStack
              justifyContent="space-evenly"
              textAlign="center"
              lineHeight="83px"
            >
              <Box>rentPrice</Box>
              <Icon as={FaChevronDown} fontSize="sm" />
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem value="apple" fontSize="27px">
              2000+
            </MenuItem>
            <MenuItem value="banana">1000-2000</MenuItem>
            <MenuItem value="orange">700-1000</MenuItem>
          </MenuList>
        </Menu> */}
        <Select
          placeholder="Rent"
          h="83px"
          defaultValue={rentPrice}
          fontSize="25px"
          border="1px solid #eaebef"
          w="max-content"
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

        {/*Ratings*/}
        <Select
          placeholder="Rating"
          h="83px"
          defaultValue={rating}
          fontSize="25px"
          border="1px solid #eaebef"
          w="max-content"
          // width="150px"
          borderRadius="10px"
          onChange={(e) => {
            setRating(e.target.value);
            props.search(postalCode, rentPrice, e.target.value, beds, baths, petPref);
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
          h="83px"
          defaultValue={beds}
          fontSize="25px"
          border="1px solid #eaebef"
          w="max-content"
          width="180px"
          borderRadius="10px"
          onChange={(e) => {
            setBeds(e.target.value);
            props.search(postalCode, rentPrice, rating, e.target.value, baths, petPref);

          }}
          bg="#eaebef"
        >
          <option value="1">1 Bed</option>
          <option value="2">2 Bed</option>
          <option value="3">3 Bed</option>
        </Select>
        {/* <Menu>
          <MenuButton
            as={Box}
            w="150px"
            h="83px"
            borderRadius="10px"
            bg="#eaebef"
            border="1px solid #eaebef"
            fontSize="27px"
            px={10}
          >
            <HStack
              justifyContent="space-evenly"
              textAlign="center"
              lineHeight="83px"
            >
              <Box mr={1}>Beds</Box>
              <Icon as={FaChevronDown} fontSize="sm" />
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem value="banana">1 Bed</MenuItem>
            <MenuItem value="orange">2 Bed</MenuItem>
            <MenuItem value="strawberry">3 Bed</MenuItem>
          </MenuList>
        </Menu> */}

        {/*Baths */}
        {/*Baths*/}
        {/* <Menu>
          <MenuButton
            as={Box}
            w="150px"
            h="83px"
            borderRadius="10px"
            bg="#eaebef"
            border="1px solid #eaebef"
            fontSize="27px"
            px={10}
          >
            <HStack
              justifyContent="space-evenly"
              textAlign="center"
              lineHeight="83px"
            >
              <Box mr={1}>Baths</Box>
              <Icon as={FaChevronDown} fontSize="sm" />
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem value="banana">1 bathroom</MenuItem>
            <MenuItem value="orange">2 bathrooms</MenuItem>
            <MenuItem value="strawberry">3 Bathrooms</MenuItem>
          </MenuList>
        </Menu> */}
        <Select
          placeholder="Bathrooms"
          h="83px"
          // defaultValue={baths}
          fontSize="25px"
          border="1px solid #eaebef"
          w="max-content"
          borderRadius="10px"
          onChange={(e) => {
            setBaths(e.target.value); 
            props.search(postalCode, rentPrice, rating, beds, e.target.value, petPref);
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
          h="83px"
          defaultValue={petPref}
          fontSize="25px"
          border="1px solid #eaebef"
          w="max-content"
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

        {/* </Flex> */}
      </HStack>
    </Box>
  );
}
export default FilterRow;
