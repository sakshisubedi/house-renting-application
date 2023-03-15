/*
 * Filename: SearchBar.js
 *
 * This file defines the search bar used in the landing page. It includes a text
 * input section and an icon to indicate a search field.
 */
import React, { useEffect, useState } from "react";
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
      {/* used Horizontal alignment since we have a search bar and a search icon */}
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
        {/*The handleInputChange function is called when the user types into the search input. It calls the search function passed down through props with the value of the input. */}

        <IconButton
          width="50px"
          icon={
            <Image width="50px" objectFit="cover" src={search} alt="logo" />
          }
          //When the user clicks the button, it navigates to the search page using the useNavigate hook from React Router.
          onClick={(e) => {
            navigate("/search");
          }}
        />
      </HStack>
    </>
  );
}
