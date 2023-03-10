import {
  Box,
  VStack,
  Heading,
  Center,
  SimpleGrid,
  Divider,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListingCard from "./ListingCard";
import house1 from "../img/house1.jpg";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import ButtonRL from "./ButtonRL";
import { getListingBySearchParameter, getListingsByRating } from "../services/listingApis";
import { useAuth } from "../Components/auth/context/hookIndex"

export default function IndividualListingPage() {
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;
  const userId = authInfo.profile ? authInfo.profile.id : "640669c85943eac949e1f7a8"; // ELSE DUMMY USER ID

  const [recommendedListings, setRecommendedListings] = useState(null);

  useEffect(() => {
    async function getRecommendedListings() {
      const response = await getListingsByRating();
      if(response?.data) {
        setRecommendedListings(response.data);
      }
    }
    getRecommendedListings();
  }, [])

  const handleSearch = async (postalCode) => {
    const response = await getListingBySearchParameter(postalCode);
    if(response?.data) {
      setRecommendedListings(response.data);
    }
  }

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
            {/* <ButtonRL /> */}
          </VStack>

          <Box my={50} ml={200} mr={200}>
            <Center>
              {/* empty listing page */}
              {/* <EmptyWishlist></EmptyWishlist> */}
              <VStack align="left" spacing={30}>
                <SimpleGrid columns={3} spacing={10}>
                  {recommendedListings.map((listing, idx) => (
                    <ListingCard userId={userId} key={idx} src={{ ...listing, img: house1 }}>
                      {" "}
                    </ListingCard>
                  ))}
                </SimpleGrid>
              </VStack>
            </Center>
          </Box>
      </Box>
      )
  );
}
