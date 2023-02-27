import { Box, Heading, VStack, SimpleGrid } from "@chakra-ui/react";
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
