/*
 * Filename: ListingCard.js
 * 
 * This file defines a card for general use that displays listing information. This card
 * is used in the landing page, the search results page, and the wishlist page to display
 * the relevant listings in a grid layout.
 */

import {
  Box,
  Image,
  Text,
  Divider,
  SimpleGrid,
  Flex,
  LinkBox,
  LinkOverlay,
  IconButton,
  HStack,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import heart from '../img/Union.svg'
import emptyHeart from '../img/emptyHeartButton.svg'
import house from '../img/house1.jpg'
import { getIsWishlistedByUser, createWishlistItem, deleteWishlistItem, getWishlistByUserId } from '../services/wishlistApis';
import { useEffect, useState } from "react";
import { useAuth } from "./auth/context/hookIndex";

const ListingCard = ({ src, getWishlist }) => {
  // fetches auth info for landlord or user based on the user type
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistInfo, setWishlistInfo] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();
  const [userId, setUserId] = useState(src?.userId || authInfo?.profile?.id);
  const userType = localStorage.getItem('user-type');

  // handle the situation when the user clicks the "like" button on listing card
  // add or remove wishlist depending on whether user has wishlisted the listing or not
  const handleWishlist = async () => {
    // if previously not wishlisted, create the wishlist item and add to database
    if(!isWishlisted) {
      // adds listing to user's wishlist if not already
      try {
        await createWishlistItem({
          listingId: src?._id,
          userId: userId
        });
        setIsWishlisted(true);
      } catch (error) {
        toast({
          title: "Failed",
          description: error,
          status: "error",
          position: "top-right"
        });
      }
    } else {
      // if previously wishlisted, delete the wishlist in the database
      // removes listing from user's wishlist if it was wishlisted
      try {
        // filter the wishlist item of current listing
        const wishlist = wishlistInfo.filter(wishlist => wishlist.listingId === src?._id);
        if(wishlist.length>0) {
          await deleteWishlistItem(wishlist[0]._id);
          setIsWishlisted(false);
          if(getWishlist) {
            getWishlist(userId);
          }
        }
      } catch (error) {
        toast({
          title: "Failed",
          description: error,
          status: "error",
          position: "top-right"
        });
      }
    }
  }

  useEffect(() => {
    const id = src?.userId || authInfo?.profile?.id;
    setUserId(id);

    /**
     * sets whether the listing has been wishlisted by the user or not
     */
    async function isWishlistedByUser() {
      const response = await getIsWishlistedByUser(id, src?._id);
      if(!response.data) {
        setIsWishlisted(response.data);
      } else {
        setIsWishlisted(true);
      }
    }
    isLoggedIn && isWishlistedByUser();

    /**
     * Fetches all the wishlist for the given user id
     */
    async function getWishlist() {
      const response = await getWishlistByUserId(id);
      if(response?.data) {
        setWishlistInfo(response.data);
      }
    }
    isLoggedIn && getWishlist();
  }, [userId, isLoggedIn, authInfo?.profile?.id, src?.userId, src?._id]);

  return (
    <LinkBox maxW='sm' borderWidth='1px' borderRadius={20} overflow='hidden'>
      <Image objectFit='fill' w="100%" h="180px" src={src.media.length>0 ? `data:image/jpeg;base64,${src.media[0]}` : house} alt="card image" />
      <Box p='4'>
        <HStack>
          <Box
            color='#3062D5'
            fontWeight='bold'
            letterSpacing='wide'
            fontSize='xl'
          >
            ${src.rent}
            <Box as='span' color='#3062D5' fontWeight='semibold' fontSize='sm'>
              /month
            </Box>
          </Box>
        </HStack>

        <Flex justifyContent="space-between" alignContent="center">
          <Box
            fontWeight='bold'
            lineHeight='tight'
            noOfLines={1}
            fontSize='3xl'
          >
            <LinkOverlay as={"button"} onClick={() => {
              navigate(`/listing/${src?._id}`, {
                  state: {
                      userId: userId,
                  },
              });
            }}>
              {src.name}
            </LinkOverlay>

          </Box>

          {/* show the "like" button only when the user is logged in and not a landlord */}
          {/* Displays wishlist icon if the user is logged in and its user type equals customer */}
          {(isLoggedIn && userType !== "landlord") && <IconButton
            bg="#FFFFFF"
            icon={<Image src={isWishlisted ? heart : emptyHeart} boxSize={30} alt="heart" />}
            onClick={(e) => {
              e.preventDefault();
              handleWishlist();
            }}
          />}
        </Flex>

        <Box color="#505050" lineHeight="tight" noOfLines={1}>
          {src.address}
        </Box>

        <Divider borderColor="#DCDCDC" p={1} />

        <Box
          color="gray.500"
          fontWeight="semibold"
          fontSize="xs"
          textTransform="uppercase"
          ml="2"
          p={3}
        >
          <SimpleGrid columns={3} spacing={3}>
            <Text>{src.bedrooms} beds</Text>
            <Text>{src.bathrooms} baths</Text>
            <Text>{src.squareFeet} sqft</Text>
          </SimpleGrid>
        </Box>
      </Box>
    </LinkBox>
  );
};

export default ListingCard;