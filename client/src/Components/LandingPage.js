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
import React, { useEffect, useState } from "react";
import ListingCard from "./ListingCard";
import house1 from "../img/house1.jpg";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import ButtonRL from "./ButtonRL";
import {
  getListingBySearchParameter,
  getListingsByRating,
} from "../services/listingApis";

export default function IndividualListingPage() {
  const [recommendedListings, setRecommendedListings] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 6;

  useEffect(() => {
    async function getRecommendedListings() {
      const response = await getListingsByRating();
      if (response?.data) {
        setRecommendedListings(response.data);
      }
    }
    getRecommendedListings();
  }, [recommendedListings]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = async (postalCode) => {
    const response = await getListingBySearchParameter(postalCode);
    if (response?.data) {
      setRecommendedListings(response.data);
    }
  };

  return (
    recommendedListings && (
      <Box>
        <NavBar profileURL={"https://i.stack.imgur.com/l60Hf.png"}></NavBar>
        <Box my={10}>
          <Center>
            <Flex py={5}>
              <VStack>
                <Heading mb={10}>Find a place with...</Heading>
                <SearchBar search={handleSearch} />
              </VStack>
            </Flex>
          </Center>
        </Box>
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
            <VStack align="left" spacing={30}>
              <SimpleGrid columns={3} spacing={10}>
                {recommendedListings.map((listing, idx) => (
                  <ListingCard key={idx} src={{ ...listing, img: house1 }}>
                    {" "}
                  </ListingCard>
                ))}
              </SimpleGrid>
            </VStack>
          </Center>

          {recommendedListings && (
            <Flex justifyContent={"center"} margin="auto" mt={10}>
              <Box mt={10}>
                {/* Display the pagination buttons */}
                {Array.from(
                  {
                    length: Math.ceil(
                      recommendedListings.length / resultsPerPage
                    ),
                  },
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
          )}
        </Box>
      </Box>
    )
  );
}
