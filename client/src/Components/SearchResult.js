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
import {
  getListingBySearchParameter,
  getListingsByRating,
} from "../services/listingApis";


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
  };


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
        <Box>
          <Heading ml={8} mt={5} pl={10} pt={5} pr={5} textAlign="left">
            Showing results for “Location”...
          </Heading>
          <Flex
            justifyContent="space-between"
            alignItems="flex-start"
            pl={10}
            pr={5}
            pt={5}
            ml={8}
          >
            <FilterRow search={this.handleSearch} />
          </Flex>

        </Box>
        <Box margin="auto" pt={3} pl={10}>
          <VStack
            spacing={30}
            justifyContent="space-between"
            alignItems="flex-start"
            margin="auto"
            ml={8}
          >
            <SimpleGrid
              columns={{ base: 1, md: 4 }}
              spacing={10}
              mt={2}
              // mx={10}
            >
              {currentListings?.map((listing, idx) => (
                <ListingCard key={idx} src={{ ...listing, img: house1 }}>
                  {" "}
                </ListingCard>
              ))}
            </SimpleGrid>
          </VStack>
          <Flex justifyContent={"center"} margin="auto" mt={10}>
            <Box mt={10}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <Button
                    key={pageNumber}
                    mx={2}
                    colorScheme={pageNumber === currentPage ? "blue" : "gray"}
                    onClick={() => this.handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                )
              )}
            </Box>
          </Flex>
          <Box m={10}></Box>
        </Box>
      </Box>
    );
  }
}
