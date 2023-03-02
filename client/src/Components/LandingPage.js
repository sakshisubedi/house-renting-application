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
import ListingCard1 from "./ListingCard1";
import house1 from "../img/house1.jpg";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import ButtonRL from "./ButtonRL";
import { getListingsByRating } from "../services/listingApis";

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendedListings: null
    }
  }

  async componentDidMount() {
    const recommendedListings = await getListingsByRating();
    this.setState({
      recommendedListings
    });
    console.log(recommendedListings, this.props?.history);
  }

  

  render() {
    return (
        <Box>
          <NavBar profileURL={"https://i.stack.imgur.com/l60Hf.png"}></NavBar>
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
                  {
                    this.state.recommendedListings?.data.map((listing, idx) => (
                      <ListingCard1 key={idx} src={{...listing, img: house1}}> </ListingCard1>
                    ))
                  }
                </SimpleGrid>
              </VStack>
            </Center>
          </Box>
        </Box>
      );
  }
}