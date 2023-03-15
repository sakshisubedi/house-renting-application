/*
 * Filename: WishlistPage.js
 * 
 * This file defines the wishlist screen for the user where they can view all their
 * favorited listings. It displays the wishlisted listings using ListingCards in a grid 
 * format, and each of these listings can be unfavorited from this screen, or navigated 
 * to by clicking the card.
 */

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
import { useLocation } from "react-router-dom";

function WishlistPage() {
    // fetches auth info for landlord or user based on the user type
    const { authInfo } = useAuth();
    const { isLoggedIn } = authInfo;
    const location = useLocation();
    const [userId, setUserId] = useState(location?.state?.userId || authInfo?.profile?.id);

    const [wishlistedListings, setwishlistedListings] = useState([]);

    /**
     * get all wishlist items corresponding to a given user id
     * @param {string} userId user id
     */
    const getUserWishlist = async (userId) => {
        const response = await getWishlistByUserId(userId);
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
        const id = location?.state?.userId || authInfo?.profile?.id;
        setUserId(id);
        isLoggedIn && getUserWishlist(id);
    }, [userId, isLoggedIn, authInfo?.profile?.id, location?.state?.userId]);


    return (
        userId && <Box>
        <NavBar />
        <Box my={50} ml={200} mr={200}>
            {/* if wishlist is empty then display EmptyWishlist Component else display all the wishlisted listing for given user */}
            {wishlistedListings.length == 0 ?
                (
                    // If the user hasn't wishlited any listings, show empty wishlist page
                    <Center>
                        <EmptyWishlist></EmptyWishlist>
                    </Center>
                )
                :
                (
                    // If the user has wishlisted listings, display the listings as listing cards in a gridded format
                    <VStack align="left" spacing={30}>
                        <Heading>Your Wishlist</Heading>
                        <Center>
                            <SimpleGrid columns={3} spacing={10}>
                                {wishlistedListings.map( (listing, idx) => (<ListingCard key={idx} src={{...listing, userId: authInfo?.profile?.id}} getWishlist={(id) => getUserWishlist(id)}> </ListingCard>))}
                            </SimpleGrid>
                        </Center>
                    </VStack>
                )}
        </Box>
    </Box>
    );
}

export default WishlistPage;