import {
    Box,
    VStack,
    Heading,
    Center,
    SimpleGrid,
} from "@chakra-ui/react";
import React from "react";
import ListingCard from "./ListingCard";
import house1 from '../img/house1.jpg'
import NavBar from "./NavBar";


function WishlistPage() {
    // need to get actual data from db

    // const tempData = {
    //   name: "Jin Huangfu",
    //   desc: "hi",
    //   email: "jhuangfu@ucsd.edu",
    //   pronouns: "She/Her/Hers",
    //   age: 23,
    //   occupation: "student",
    //   datePref: "4 month",
    //   spacePref: "1bd/1ba",
    //   housematesBool: "No",
    //   roommatePrefs: "prefs",
    //   petsPref: "Yes",
    // };

    let tempData = {
        name: "Jin Huangfu",
        profile: 'https://i.stack.imgur.com/l60Hf.png',
    };

    let tempListing = {
        img: house1,
        name: "Listing 1",
        address: "4067 Miramar St, La Jolla, CA 92092",
        bedrooms: 3,
        bathrooms: 2,
        rent: '1900',
        reviewCount: 34,
        rating: 3.3,
        squareFeet: 1200,
    };

    return (
        <Box>
            {/* <NavBar /> */}
            <NavBar profileURL = {tempData.profile}></NavBar>
            <Box my={50} ml={200} mr={200}>
                <Center >
                    {/* empty listing page */}
                    {/* <EmptyWishlist></EmptyWishlist> */}
                    <VStack align="left" spacing={30}>
                        <Heading>Your Wishilist</Heading>
                        <SimpleGrid columns={3} spacing={10}>
                            <ListingCard src={tempListing}> </ListingCard>
                        </SimpleGrid>
                    </VStack>
                </Center>

            </Box>
        </Box>
    );
}

export default WishlistPage;