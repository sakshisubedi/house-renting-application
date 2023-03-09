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
import { getIsWishlistedByUser, createWishlistItem, deleteWishlistItem } from '../services/wishlistApis';
import { useEffect, useState } from "react";

const ListingCard = ({ userId, src }) => {

  let wishlistItem = {
    listingId: src._id,
    userId: userId,
  };

  const [like, setLike] = useState(false);
  const [wishlistId, setWishListId] = useState("");

  const getLiked = async () => {
    const response = await getIsWishlistedByUser(userId, src._id);
    if (!response?.error) { // traverse listing id to get listing data
      if (response.data == false) {
        setLike(false);
      } else {
        setLike(true);
        setWishListId(response.data._id);
      }
    }
  }

  useEffect(() => {
    getLiked();
  }, []);

  const navigate = useNavigate();

  const toast = useToast();

  const handleClick = () => {
    setLike(current => !current);
    if (like) {
      try {
        deleteWishlistItem(wishlistId);
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
        createWishlistItem(wishlistItem)
      } catch (error) {
        toast({
          title: "Failed",
          description: error,
          status: "error",
          position: "top-right"
        });
      }
    }
  };

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
            <LinkOverlay onClick={(e) => {
              navigate(`/listing/${src._id}`);
            }}>
              {/* route to detailed listing page */}
              {src.name}
            </LinkOverlay>

          </Box>
          <IconButton
            bg="#FFFFFF"
            icon={<Image src={like ? heart : emptyHeart} boxSize={30} alt="heart" />}
            onClick={(e) => {
              // cancel wishlist
              e.preventDefault();
              handleClick();
            }}
          />
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
