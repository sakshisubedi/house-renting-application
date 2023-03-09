import { Box, Heading, VStack, SimpleGrid, Button } from "@chakra-ui/react";
import NavBar from "./NavBar";
import React from "react";
import FilterRow from "./FilterRow";
import ListingCard from "./ListingCard";
import house1 from "../img/house1.jpg";
import { getListingBySearchParameter, getListingsByRating } from "../services/listingApis";

export default class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendedListings: null,
      currentPage: 1,
      listingsPerPage: 8,
    };
  }

  async componentDidMount() {
    const recommendedListings = await getListingsByRating();
    this.setState({
      recommendedListings,
    });
  }

  handlePageChange = (pageNumber) => {
    this.setState({
      currentPage: pageNumber,
    });
  };

  handleSearch = async (postalCode, rentPrice, rating, beds, bathrooms, petPref) => {
    const recommendedListings = await getListingBySearchParameter(postalCode,  rentPrice, rating, beds, bathrooms, petPref);
    this.setState({
      recommendedListings,
    });
  }

  render() {
    const { recommendedListings, currentPage, listingsPerPage } = this.state;
    const indexOfLastListing = currentPage * listingsPerPage;
    const indexOfFirstListing = indexOfLastListing - listingsPerPage;
    const currentListings = recommendedListings?.data.slice(
      indexOfFirstListing,
      indexOfLastListing
    );
    const totalPages = Math.ceil(
      recommendedListings?.data.length / listingsPerPage
    );

    return (
      <Box>
        <NavBar profileURL={"https://i.stack.imgur.com/l60Hf.png"}></NavBar>
        <Box ml={5} mt={5}>
          <Heading pl={10} pt={5} textAlign="left">
            Showing results for “Location”...
          </Heading>
          <FilterRow search={this.handleSearch} />
        </Box>
        <Box margin="auto" pt={5} pl={10}>
          <VStack align="left" spacing={30}>
            <SimpleGrid
              columns={{ base: 1, md: 4 }}
              spacing={10}
              mt={10}
              mx={10}
            >
              {currentListings?.map((listing, idx) => (
                <ListingCard key={idx} src={{ ...listing, img: house1 }}>
                  {" "}
                </ListingCard>
              ))}
            </SimpleGrid>
            <Box mt={5}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <Button
                    key={pageNumber}
                    mx={1}
                    colorScheme={pageNumber === currentPage ? "blue" : "gray"}
                    onClick={() => this.handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                )
              )}
            </Box>
          </VStack>
        </Box>
      </Box>
    );
  }
}

