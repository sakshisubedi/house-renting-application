import {
  Box,
  VStack,
  Heading,
  Center,
  SimpleGrid,
  Divider,
  Flex,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ListingCard from "./ListingCard";
import house1 from "../img/house1.jpg";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import ButtonRL from "./ButtonRL";

function LandingPage() {
  // need to get actual data from db
  const resultsPerPage = 6; // Define the number of results to display per page
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
      {/* <NavBar /> */}
      <NavBar profileURL={tempData.profile}></NavBar>
      <Box my={10}>
        <Center>
          <Flex py={5}>
            <VStack>
              <Heading mb={10}>Find a place with...</Heading>
              <SearchBar />
            </VStack>
          </Flex>
        </Center>
      </Box>
      {/* <Divider align="center" width="90%" />*/}
      <VStack>
        <Divider
          my={2}
          borderWidth="1.5px"
          mx="auto"
          width="90%"
          borderColor="darkgray"
        />
        <Heading size="lg">Recommendations</Heading>
        <ButtonRL />
      </VStack>

      <Box my={50} ml={200} mr={200}>
        <Center>
          {/* empty listing page */}
          {/* <EmptyWishlist></EmptyWishlist> */}
          <VStack align="left" spacing={30}>
            <SimpleGrid columns={3} spacing={10}>
              {/* <ListingCard src={tempListing}> </ListingCard>
              <ListingCard src={tempListing}> </ListingCard>
              <ListingCard src={tempListing}> </ListingCard>
              <ListingCard src={tempListing}> </ListingCard>
              <ListingCard src={tempListing}></ListingCard> */}
              {displayedResults.map((result, index) => (
                <ListingCard src={result} key={index}></ListingCard>
              ))}
            </SimpleGrid>
          </VStack>
        </Center>
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
      </Box>
    </Box>
  );
}

export default LandingPage;
