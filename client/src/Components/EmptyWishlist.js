/*
 * Filename: EmptyWishlist.js
 * 
 * This file defines the screen for the situation that a user does not have any items
 * in their wishlist. It tells them there is nothing here and includes a button to the 
 * landing page where they can look for listings to favorite/wishlist.
 */

import {
    Button,
    VStack,
    Image,
    Flex,
    Text,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import emptyList from '../img/emptyList.jpg'

const EmptyWishlist = () => {
    const navigate = useNavigate();

    return (
        <Flex
            direction={{ base: 'column-reverse', md: 'row' }}
        >
            <VStack justify="center" spacing={10}>
                <Image width='300px' objectFit='cover' src={emptyList} alt="wishlist" />
                <Text fontSize="2xl" fontWeight="bold">Oops... It’s empty in here</Text>
                <Button
                    variant="solid"
                    colorScheme="blue"
                    w={175}
                    mt={5}
                    onClick={() => {
                        navigate("/landingPage");
                    }}
                >
                    Find Listings
                </Button>
            </VStack>
        </Flex>
    )
}

export default EmptyWishlist;