import {
  Box,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";

import React from "react";

function FilterRow() {
  return (
    <Box my={10}>
      {/* <Flex pl={10} pt={5}> */}
      <HStack justifyContent="space-between" margin="auto" mr={10}>
        <Box
          w="630px"
          h="83px"
          border="1px solid darkgray"
          borderRadius="15px"
          ml={10}
        >
          <Input
            id="search-input"
            type="search"
            placeholder="Location"
            h="100%"
            border="none"
            fontSize="25px"
            outline="none"
            px={4}
          />
        </Box>
        {/*Price */}
        <Menu>
          <MenuButton
            as={Box}
            w="200px"
            h="83px"
            borderRadius="10px"
            bg="#eaebef"
            border="1px solid #eaebef"
            fontSize="25px"
            px={4}
          >
            <HStack
              justifyContent="space-evenly"
              textAlign="center"
              lineHeight="83px"
            >
              <Box mr={2}>Price</Box>
              <Icon as={FaChevronDown} fontSize="sm" />
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem value="apple">2000+</MenuItem>
            <MenuItem value="banana">1000-2000</MenuItem>
            <MenuItem value="orange">700-1000</MenuItem>
          </MenuList>
        </Menu>

        {/*Ratings*/}
        <Menu>
          <MenuButton
            as={Box}
            w="200px"
            h="83px"
            borderRadius="10px"
            bg="#eaebef"
            border="1px solid #eaebef"
            fontSize="25px"
            px={4}
          >
            <HStack
              justifyContent="space-evenly"
              textAlign="center"
              lineHeight="83px"
            >
              <Box mr={1}>Ratings</Box>
              <Icon as={FaChevronDown} fontSize="sm" />
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem value="banana">top rated</MenuItem>
            <MenuItem value="orange">average</MenuItem>
            <MenuItem value="strawberry">below average</MenuItem>
          </MenuList>
        </Menu>

        {/*Beds*/}
        <Menu>
          <MenuButton
            as={Box}
            w="200px"
            h="83px"
            borderRadius="10px"
            bg="#eaebef"
            border="1px solid #eaebef"
            fontSize="25px"
            px={4}
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
        </Menu>

        {/*Baths*/}
        <Menu>
          <MenuButton
            as={Box}
            w="200px"
            h="83px"
            borderRadius="10px"
            bg="#eaebef"
            border="1px solid #eaebef"
            fontSize="25px"
            px={4}
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
        </Menu>

        {/*More*/}
        <Menu>
          <MenuButton
            as={Box}
            w="200px"
            h="83px"
            borderRadius="10px"
            bg="#eaebef"
            border="1px solid #eaebef"
            fontSize="25px"
            px={4}
          >
            <HStack
              justifyContent="space-evenly"
              textAlign="center"
              lineHeight="83px"
            >
              <Box mr={1}>More</Box>
              <Icon as={FaChevronDown} fontSize="sm" />
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem value="banana">1 Bed</MenuItem>
            <MenuItem value="orange">2 Bed</MenuItem>
            <MenuItem value="strawberry">3 Bed</MenuItem>
          </MenuList>
        </Menu>
        {/* </Flex> */}
      </HStack>
    </Box>
  );
}
export default FilterRow;
