import { Box, Heading, VStack, SimpleGrid } from "@chakra-ui/react";
import NavBar from "./NavBar";
import React from "react";
import FilterRow from "./FilterRow";
import ListingCard1 from "./ListingCard1";
import house1 from "../img/house1.jpg";
import { getListingsByRating } from "../services/listingApis";

export default class SearchResult extends React.Component {
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
        <Box ml={5} mt={5}>
          <Heading pl={10} pt={5} textAlign="left">
            Showing results for “Location”...
          </Heading>
          <FilterRow></FilterRow>
        </Box>
        <Box margin="auto" pt={5} pl={10}>
          <VStack align="left" spacing={30}>
            <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10} mt={10} mx={10}>
              {
                this.state.recommendedListings?.data.map((listing, idx) => (
                  <ListingCard1 key={idx} src={{...listing, img: house1}}> </ListingCard1>
                ))
              }
            </SimpleGrid>
          </VStack>
        </Box>
      </Box>
      );
  }
}



      