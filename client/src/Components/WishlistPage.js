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
import { useAuth } from "./auth/context/hookIndex";
// import { useLocation } from "react-router-dom";

function WishlistPage() {
    // need to get actual data from db
    const { authInfo } = useAuth();

    const [wishlistedListings, setwishlistedListings] = useState([]);

    const getUserWishlist = async (userId) => {
        const response = await getWishlistByUserId(userId);
        var listings = [];
        if (!response?.error) { // traverse listing id to get listing data
            for (const listingId of response.data) {
                const listingDetail = await getListingById(listingId.listingId);
                if (listingDetail?.error) { continue; }
                else {
                    listings.push(listingDetail.data);
                }
            }
        }
        setwishlistedListings(listings);
    }

    useEffect(() => {
        getUserWishlist(authInfo?.profile?.id);
    }, [authInfo?.profile?.id]);


    return (
        wishlistedListings.length>0 && authInfo?.profile.id && <Box>
        <NavBar />
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
                                {wishlistedListings.map( (listing) => (<ListingCard src={{...listing, userId: authInfo?.profile?.id} }> </ListingCard>))}
                            </SimpleGrid>
                        </Center>
                    </VStack>
                )}
        </Box>
    </Box>
    );
}

export default WishlistPage;