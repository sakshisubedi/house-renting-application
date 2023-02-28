import {
  Box,
  VStack,
  Heading,
  Center,
  SimpleGrid,
  Divider,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import ListingCard1 from "./ListingCard1";
import house1 from "../img/house1.jpg";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import ButtonRL from "./ButtonRL";

function LandingPage() {
  // need to get actual data from db

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
      {/* <NavBar /> */}
      <NavBar profileURL={tempData.profile}></NavBar>
      <Box my={20}>
        <Center>
          <Flex py={10}>
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
          my={5}
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
              <ListingCard1 src={tempListing}> </ListingCard1>
              <ListingCard1 src={tempListing}> </ListingCard1>
              <ListingCard1 src={tempListing}> </ListingCard1>
              <ListingCard1 src={tempListing}> </ListingCard1>
              <ListingCard1 src={tempListing}></ListingCard1>
            </SimpleGrid>
          </VStack>
        </Center>
      </Box>
    </Box>
  );
}

export default LandingPage;
