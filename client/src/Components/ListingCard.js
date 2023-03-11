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

const ListingCard = ({ src }) => {
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistInfo, setWishlistInfo] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();
  const [userId, setUserId] = useState(src?.userId || authInfo?.profile?.id);

  const handleWishlist = async () => {
    if(!isWishlisted) {
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
      try {
        await deleteWishlistItem(wishlistInfo?._id);
        setIsWishlisted(false);
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
    async function isWishlistedByUser() {
      const response = await getIsWishlistedByUser(id, src?._id);
      if(!response.data) {
        setIsWishlisted(response.data);
      } else {
        setIsWishlisted(true);
      }
    }
    isLoggedIn && isWishlistedByUser();

    async function getWishlist() {
      const response = await getWishlistByUserId(id);
      if(response?.data) {
        setWishlistInfo(response.data[0]);
      }
    }
    isLoggedIn && getWishlist();
  }, [userId, isLoggedIn, authInfo?.profile?.id, src?.userId, src?._id]);

  return (
    <LinkBox maxW='sm' borderWidth='1px' borderRadius={20} overflow='hidden'>
      <Image objectFit='fill' w="100%" src={house} alt="card image" />
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
          {isLoggedIn && <IconButton
            bg="#FFFFFF"
            icon={<Image src={isWishlisted ? heart : emptyHeart} boxSize={30} alt="heart" />}
            onClick={(e) => {
              // cancel wishlist
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