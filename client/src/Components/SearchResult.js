/**import { Box, Heading, VStack, SimpleGrid } from "@chakra-ui/react";
import NavBar from "./NavBar";
import React from "react";
import FilterRow from "./FilterRow";
import ListingCard from "./ListingCard";
import house1 from "../img/house1.jpg";

function SearchResult() {
  let tempData = {
    name: "xyz",
    profile: "https://i.stack.imgur.com/l60Hf.png",
  };

  let tempListing = {
    img: house1,
    name: "Listing 1",
    address: "4067 Miramar St, La Jolla, CA 92092",
    bedrooms: 3,
    bathrooms: 2,
    rent: "1900",
    reviewCount: 34,
    rating: 3.3,
    squareFeet: 1200,
  };

  return (
    <Box>
      <NavBar profileURL={tempData.profile}></NavBar>
      <Box ml={5} mt={5}>
        <Heading pl={10} pt={5} textAlign="left">
          Showing results for “Location”...
        </Heading>
        <FilterRow></FilterRow>
      </Box>

      <Box margin="auto" pt={5} pl={10}>
        <VStack align="left" spacing={30}>
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10} mt={10} mx={10}>
            <ListingCard src={tempListing}> </ListingCard>
            <ListingCard src={tempListing}> </ListingCard>
            <ListingCard src={tempListing}> </ListingCard>
            <ListingCard src={tempListing}> </ListingCard>
            <ListingCard src={tempListing}> </ListingCard>
            <ListingCard src={tempListing}> </ListingCard>
            <ListingCard src={tempListing}></ListingCard>
          </SimpleGrid>
        </VStack>
      </Box>
    </Box>
  );
}
export default SearchResult;
**/

import {
  Box,
  Heading,
  VStack,
  Flex,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import NavBar from "./NavBar";
import React, { useState } from "react";
import FilterRow from "./FilterRow";
import ListingCard from "./ListingCard";
import house1 from "../img/house1.jpg";

function SearchResult() {
  const resultsPerPage = 8; // Define the number of results to display per page
  const [currentPage, setCurrentPage] = useState(1); // Initialize the current page to 1

  let tempData = {
    name: "xyz",
    profile: "https://i.stack.imgur.com/l60Hf.png",
  };

  let tempListing = {
    img: house1,
    name: "Listing 1",
    address: "4067 Miramar St, La Jolla, CA 92092",
    bedrooms: 3,
    bathrooms: 2,
    rent: "1900",
    reviewCount: 34,
    rating: 3.3,
    squareFeet: 1200,
  };

  // Calculate the index of the first and last results to display based on the current page
  const lastIndex = currentPage * resultsPerPage;
  const firstIndex = lastIndex - resultsPerPage;

  // Create an array of mock data for the results
  const results = new Array(10).fill(tempListing);

  // Slice the results array based on the current page
  const displayedResults = results.slice(firstIndex, lastIndex);

  // Define a function to handle the user's click on the pagination buttons
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Box>
      <NavBar profileURL={tempData.profile}></NavBar>
      <Box ml={5} mt={5}>
        <Heading pl={10} pt={5} textAlign="left">
          Showing results for “Location”...
        </Heading>
        <FilterRow></FilterRow>
      </Box>

      <Box margin="auto" pt={3} pl={10}>
        <VStack align="left" spacing={30}>
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10} mt={10} mx={4}>
            {displayedResults.map((result, index) => (
              <ListingCard src={result} key={index}></ListingCard>
            ))}
          </SimpleGrid>
          <Flex justifyContent={"center"} margin="auto" mt={10}>
            <Box mt={10}>
              {/* Display the pagination buttons */}
              {Array.from(
                { length: Math.ceil(results.length / resultsPerPage) },
                (_, i) => i + 1
              ).map((pageNumber) => (
                <Button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  mr={2}
                  colorScheme={currentPage === pageNumber ? "blue" : "gray"}
                  size="sm"
                >
                  {pageNumber}
                </Button>
              ))}
            </Box>
          </Flex>
          <Box m={10}></Box>
        </VStack>
      </Box>
    </Box>
  );
}
export default SearchResult;
