/*
 * Filename: SearchBar.js
 * 
 * This file defines the search bar used in the landing page. It includes a text
 * input section and an icon to indicate a search field.
 */

import React from "react";
import { Input, IconButton, HStack, Image } from "@chakra-ui/react";
import search from "../img/search.jpg";
import { useNavigate } from "react-router-dom";

export default function SearchBar(props) {
  const navigate = useNavigate();

  /**
   * search listing based on postal code changes
   * @param {Object} event event object
   */
  const handlePostalCodeChange = async (event) => {
    props.search(event.target.value);
  };

  return (
    <>
      <HStack
        borderRadius="20px"
        borderWidth="2px"
        borderStyle="none"
        color="blue"
        w="734.93px"
        h="83px"
        border="1px solid darkgrey"
      >
        <Input
          id="search-input"
          type="search"
          placeholder="Enter postal code"
          border="none"
          fontSize="25px"
          outline="none"
          color="black"
          borderRadius="20px"
          w="734.93px"
          h="83px"
          onChange={handlePostalCodeChange}
        />
        <IconButton
          width="50px"
          icon={
            <Image width="50px" objectFit="cover" src={search} alt="logo" />
          }
          onClick={(e) => {
            navigate("/search");
        }}
        />
      </HStack>
    </>
  );
}
