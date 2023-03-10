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
import { getListingBySearchParameter, getListingsByRating } from "../services/listingApis";
import { useAuth } from "./auth/context/hookIndex";
export default function IndividualListingPage() {
  const [recommendedListings, setRecommendedListings] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [listingsPerPage, setListingsPerPage] = useState(6);
  const { authInfo } = useAuth();
  const [ totalPages, setTotalPages ] = useState(0);
  const [currentListings, setCurrentListings] = useState(null);

  useEffect(() => {
    async function getRecommendedListings() {
      const response = await getListingsByRating();
      if (response?.data) {
        setRecommendedListings(response);
        setTotalPages(Math.ceil(response.data.length/listingsPerPage));
        handlePagination(response, currentPage);
      }
    }
    getRecommendedListings();
  }, []);

  const handlePagination = (listings, pageNo) => {
    console.log((pageNo-1)*listingsPerPage, pageNo*listingsPerPage);
    setCurrentListings(listings.data.slice((pageNo-1)*listingsPerPage, pageNo*listingsPerPage));
  }


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    handlePagination(recommendedListings, pageNumber);
  };

  const handleSearch = async (postalCode) => {
    const response = await getListingBySearchParameter(postalCode);
    if (response?.data) {
      setRecommendedListings(response);
    }
    setTotalPages(Math.ceil(response.data.length/listingsPerPage));
    handlePagination(response, currentPage);
  };

  return (
    // && authInfo?.profile?.id
    currentListings && (
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
          {/* <ButtonRL /> */}
        </VStack>

        <Box my={50} ml={200} mr={200}>
          <Center>
            {/* empty listing page */}
            <VStack align="left" spacing={30}>
              <SimpleGrid columns={3} spacing={10}>
                {currentListings.map((listing, idx) => (
                  <ListingCard key={idx} src={{ ...listing, img: house1, userId: authInfo?.profile?.id }}>
                    {" "}
                  </ListingCard>
                ))}
              </SimpleGrid>
            </VStack>
          </Center>

          {currentListings && (
            <Flex justifyContent={"center"} margin="auto" mt={10}>
              <Box mt={10}>
                {/* Display the pagination buttons */}
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
          )}
        </Box>
      </Box>
    )

  );
}
