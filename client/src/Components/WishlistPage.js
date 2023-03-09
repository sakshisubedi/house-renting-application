import {
    Box,
    VStack,
    Heading,
    Center,
    SimpleGrid,
    useToast,
} from "@chakra-ui/react";
import React from "react";
import ListingCard from "./ListingCard";
import house1 from '../img/house1.jpg';
import NavBar from "./NavBar";
import EmptyWishlist from "./EmptyWishlist";
import { getWishlistByUserId } from '../services/wishlistApis';
import { getListingById } from "../services/listingApis";
import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

function WishlistPage() {
    // need to get actual data from db

    const tempData = {
        name: "Jin Huangfu",
        desc: "hi",
        email: "jhuangfu@ucsd.edu",
        pronouns: "She/Her/Hers",
        age: 23,
        occupation: "student",
        datePref: "4 month",
        spacePref: "1bd/1ba",
        housematesBool: "No",
        roommatePrefs: "prefs",
        petsPref: "Yes",
    };

    // let tempListing = {
    //     img: house1,
    //     name: "Listing 1",
    //     address: "Unit 1202, 4067 Miramar St, La Jolla, CA 92092",
    //     bedrooms: 3,
    //     bathrooms: 2,
    //     rent: '1900',
    //     reviewCount: 34,
    //     rating: 3.3,
    //     squareFeet: 1200,
    // };

    // const toast = useToast();

    let userData = {
        email: {
            isPublic: true,
            data: "abottrill2@unesco.org",
        },
        age: {
            isPublic: true,
            data: 25,
        },
        occupation: {
            isPublic: true,
            data: "Compensation Analyst",
        },
        _id: "6406a03278cf68a5f9f4dd6e",
        name: "Ashton Bottrill",
        isVerified: true,
        pronoun: "He/Him",
        preferredMoveInDate: "2023-04-05T07:00:00.000Z",
        preferPet: true,
        isLookingForFlatmate: false,
        profilePicture: null,
        createdAt: "2023-03-01T22:56:00.991Z",
        updatedAt: "2023-03-01T22:56:00.991Z",
    };

    // let wishlistData = [
    //     {
    //         img: house1,
    //         name: "Listing 1",
    //         address: "Unit 1202, 4067 Miramar St, La Jolla, CA 92092",
    //         bedrooms: 3,
    //         bathrooms: 2,
    //         rent: '1900',
    //         reviewCount: 34,
    //         rating: 3.3,
    //         squareFeet: 1200,
    //     },
    //     {
    //         img: house1,
    //         name: "Listing 2",
    //         address: "7545 Charmant Dr, San Diego, CA 92122",
    //         bedrooms: 2,
    //         bathrooms: 1,
    //         rent: '1500',
    //         reviewCount: 7,
    //         rating: 4.5,
    //         squareFeet: 500,
    //     }
    // ];

    const [wishlistedListings, setwishlistedListings] = useState([]);

    const getUserWishlist = async () => {
        const response = await getWishlistByUserId(userData._id);
        var listings = [];
        if (!response?.error) { // traverse listing id to get listing data
            for (const listingId of response.data) {
                const listingDetail = await getListingById(listingId.listingId);
                if (response?.error) { continue; }
                else {
                    listings.push(listingDetail.data);
                }
            }
        }
        setwishlistedListings(listings);
    }

    useEffect(() => {
        getUserWishlist();
    }, []);


    return (
        <Box>
            {/* <NavBar /> */}
            <NavBar profileURL={tempData.profile}></NavBar>
            <Box my={50} ml={200} mr={200}>
                {wishlistedListings.length == 0 ?
                    (
                        <Center>
                            <EmptyWishlist></EmptyWishlist>
                        </Center>
                    )
                    :
                    (
                        <VStack align="left" spacing={30}>
                            <Heading>Your Wishlist</Heading>
                            <Center>
                                <SimpleGrid columns={3} spacing={10}>
                                    {wishlistedListings.map( (listing) => (<ListingCard userId = {userData._id} src={listing}> </ListingCard>))}
                                </SimpleGrid>
                            </Center>
                        </VStack>
                    )}
            </Box>
        </Box>
    );
}

export default WishlistPage;