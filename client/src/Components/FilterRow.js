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
          h="83px"
          defaultValue={price}
          fontSize="25px"
          border="1px solid #eaebef"
          w="max-content"
          borderRadius="10px"
          onChange={(e) => setPrice(e.target.value)}
          bg="#eaebef"
        >
          <option value="2000+">2000+</option>
          <option value="1000-2000">1000-2000</option>
          <option value="700-1000">700-1000</option>
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
          onChange={(e) => setRating(e.target.value)}
          bg="#eaebef"
        >
          <option value="Top Rated">Top Rated</option>
          <option value="Average">Average</option>
          <option value="Below-Average">Below-Average</option>
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
          h="83px"
          // defaultValue={baths}
          fontSize="25px"
          border="1px solid #eaebef"
          w="max-content"
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
          placeholder="More"
          h="83px"
          defaultValue={more}
          fontSize="25px"
          border="1px solid #eaebef"
          w="max-content"
          borderRadius="10px"
          onChange={(e) => setMore(e.target.value)}
          bg="#eaebef"
        >
          <option value="pet friendly">pet friendly</option>
          <option value="furnished">furnished</option>
          <option value="Parking">Parking</option>
        </Select>

        {/* </Flex> */}
      </HStack>
    </Box>
  );
}
export default FilterRow;
