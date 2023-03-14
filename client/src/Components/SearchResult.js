/*
 * Filename: SearchResult.js
 * 
 * This file defines the search result page component of the app. This utilizes
 * the FilterRow component to allow the user to search for relevant listings based on
 * postal code, rent price, number of bed/bathrooms, and pet preference and then 
 * displays the information in a grid of ListingCards.
 */

import {
  Box,
  Heading,
  VStack,
  SimpleGrid,
  Flex,
  Button,
} from "@chakra-ui/react";
import NavBar from "./NavBar";
import React from "react";
import FilterRow from "./FilterRow";
import ListingCard from "./ListingCard";
import house1 from "../img/house1.jpg";
import { getListingBySearchParameter, getListingsByRating, } from "../services/listingApis";
import { useEffect, useState } from "react";
import { useAuth } from "./auth/context/hookIndex";

const SearchResult = ({ src }) => {
  const [recommendedListings, setRecommendedListings] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [listingsPerPage, setListingsPerPage] = useState(8);
  const { authInfo } = useAuth();
  const [ totalPages, setTotalPages ] = useState(0);
  const [currentListings, setCurrentListings] = useState(null);

  useEffect(() => {
    async function getRecommendedListings() {
      const response = await getListingsByRating();
      setRecommendedListings(response);
      setTotalPages(Math.ceil(response.data.length/listingsPerPage));
      handlePagination(response, currentPage);
    }
    getRecommendedListings();
  }, []);

  const handlePagination = (listings, pageNo) => {
    setCurrentListings(listings.data.slice((pageNo-1)*listingsPerPage, pageNo*listingsPerPage));
  }


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    handlePagination(recommendedListings, pageNumber);
  };

  const handleSearch = async (postalCode, rentPrice, rating, beds, bathrooms, petPref) => {
    const recommendedListings = await getListingBySearchParameter(postalCode,  rentPrice, rating, beds, bathrooms, petPref);
    setRecommendedListings(recommendedListings);
    setTotalPages(Math.ceil(recommendedListings.data.length/listingsPerPage));
    handlePagination(recommendedListings, currentPage);
  };

  return (
    currentListings && <Box>
      <NavBar profileURL={"https://i.stack.imgur.com/l60Hf.png"}></NavBar>
      <Box>
        <Heading ml={8} mt={5} pl={10} pt={5} pr={5} textAlign="left">
          Showing results for “Location”...
        </Heading>
        <FilterRow search={handleSearch} />

      </Box>
      <Box margin="auto" pt={3} pl={10}>
        <VStack
          spacing={25}
          justifyContent="space-between"
          alignItems="flex-start"
          margin="auto"
          ml={8}
          mr={8}
        >
          <SimpleGrid
            columns={{ base: 1, md: 4 }}
            spacing={10}
            mt={2}
            // mx={10}
          >
            {currentListings.map((listing, idx) => (
              <ListingCard key={idx} src={{ ...listing, img: house1, userId: authInfo?.profile?.id }}>
                {" "}
              </ListingCard>
            ))}
          </SimpleGrid>
        </VStack>
        <Flex justifyContent={"center"} margin="auto" mt={10}>
          <Box mt={10}>
            {
              Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <Button
                    key={pageNumber}
                    mx={2}
                    colorScheme={pageNumber === currentPage ? "blue" : "gray"}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                )
              )
            }
          </Box>
        </Flex>
        <Box m={10}></Box>
      </Box>
    </Box>
  );
}
export default SearchResult;