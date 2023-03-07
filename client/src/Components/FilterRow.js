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

function FilterRow() {
  let tempData = {
    name: "Pratyush Karmakar",
    email: "pkarmakar@ucsd.edu",
  };
  // const [pronouns, setPronouns] = React.useState(tempData.pronouns ?? null);
  const [selectedPriceOption, setSelectedPriceOption] = useState(null);
  const handlePriceOptionSelect = (value) => {
    setSelectedPriceOption(value);
  };

  const [price, setPrice] = React.useState(tempData.pronouns ?? null);
  const [rating, setRating] = React.useState(tempData.pronouns ?? null);
  const [beds, setBeds] = React.useState(tempData.pronouns ?? null);
  const [baths, setBaths] = React.useState(tempData.pronouns ?? null);
  const [more, setMore] = React.useState(tempData.pronouns ?? null);
  return (
    <Box my={5}>
      <HStack spacing="20px">
        <Box
          w="630px"
          h="75px"
          border="1px solid darkgray"
          borderRadius="15px"
          // ml={10}
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
          />
        </Box>
        {/*Price */}
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
              <Box>Price</Box>
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
          placeholder="Price"
          h="75px"
          defaultValue={price}
          fontSize="25px"
          border="1px solid #eaebef"
          // w="max-content"
          width="180px"
          borderRadius="10px"
          onChange={(e) => setPrice(e.target.value)}
          bg="#eaebef"
        >
          <option value="1000+">&lt;1000</option>
          <option value="2000">&lt;2000</option>
          <option value="3000">&lt;3000</option>
          <option value="4000">&lt;4000</option>
          <option value="5000">&lt;5000</option>
        </Select>

        {/*Ratings*/}
        <Select
          placeholder="Rating"
          h="75px"
          defaultValue={rating}
          fontSize="25px"
          border="1px solid #eaebef"
          // w="max-content"
          // minw={"120px"}
          // width="20%"
          width="180px"
          borderRadius="10px"
          onChange={(e) => setRating(e.target.value)}
          bg="#eaebef"
        >
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </Select>

        {/*Beds*/}
        <Select
          placeholder="Beds"
          h="75px"
          defaultValue={beds}
          fontSize="25px"
          width="180px"
          border="1px solid #eaebef"
          // w="max-content"
          // minw={"120px"}
          // width="180px"
          borderRadius="10px"
          onChange={(e) => setBeds(e.target.value)}
          bg="#eaebef"
        >
          <option value="1 Bed">1 Bed</option>
          <option value="2 Bed">2 Bed</option>
          <option value="3 Bed">3 Bed</option>
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
          h="75px"
          // defaultValue={baths}
          fontSize="25px"
          border="1px solid #eaebef"
          // w="max-content"
          width="180px"
          // minw={"120px"}
          borderRadius="10px"
          onChange={(e) => setBaths(e.target.value)}
          bg="#eaebef"
        >
          <option value="1 Bathroom">1 Bathroom</option>
          <option value="2 Bathroom">2 Bathroom</option>
          <option value="3 Bathroom">3 Bathroom</option>
        </Select>

        {/*More*/}

        <Select
          placeholder="Pet-Friendly"
          h="75px"
          defaultValue={more}
          fontSize="25px"
          border="1px solid #eaebef"
          // w="max-content"
          width="180px"
          // minw={"120px"}
          borderRadius="10px"
          onChange={(e) => setMore(e.target.value)}
          bg="#eaebef"
        >
          <option value="yes">yes</option>
          <option value="no">no</option>
          {/* <option value="furnished">furnished</option> */}
          {/* <option value="Parking">Parking</option> */}
        </Select>
      </HStack>
    </Box>
  );
}
export default FilterRow;
