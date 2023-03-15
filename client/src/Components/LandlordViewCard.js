/*
 * Filename: LandlordViewCard.js
 *
 * This file defines the card that displays key details about a specific listing. The card
 * is used on the landlord profile page to display a single listing created by the landlord,
 * and there can be multiple of these cards displayed together.
 */

// import {
//   Box,
//   Image,
//   Text,
//   Divider,
//   SimpleGrid,
//   Flex,
//   LinkBox,
//   LinkOverlay,
//   VStack,
//   Button,
//   IconButton,
//   HStack,
// } from "@chakra-ui/react";
// import React from "react";
// import heart from "../img/Union.svg";
// import star from "../img/rating_star.jpg";
// import delete1 from "../img/delete.jpg";
// import edit from "../img/edit.jpg";
// import { useNavigate } from "react-router-dom";
// import { deleteListing } from "../services/listingApis";

// const LandlordViewCard = ({ src }) => {
//   const navigate = useNavigate();

//   async function deleteCurrentListing(listing_id) {
//     await deleteListing(listing_id);
//   }

//   return (
//     <LinkBox
//       borderRadius={15}
//       border="1px solid #F1F1F1"
//       borderWidth="2px"
//       p="4"
//       w="100%"
//       backgroundColor="#F1F1F1"
//       overfill="hide"
//     >
//       {/* Content goes here */}
//       <Box
//         alignItems="center"
//         w="100%"
//         justifyContent={"space-between"}
//         margin="auto"
//       >
//         <Flex alignItems="center">
//           {/*Image on Listing Card */}
//           <Box w="20%" h="10%" borderRadius={15} pr={4}>
//             <Image w="100%" src={src.img} alt="card image" borderRadius={15} />
//           </Box>
//           <Box w="80%" h="10%">
//             <Flex
//               justifyContent={"space-between"}
//               margin="auto"
//               alignItems={"flex-start"}
//             >
//               {/*Card name(Listing)*/}
//               <Box fontWeight="extrabold" fontSize="2xl" color="black">
//                 {src.name}
//               </Box>
//               {/*rent*/}
//               <Flex>
//                 <Box
//                   color="#3062D5"
//                   fontWeight="bold"
//                   letterSpacing="wide"
//                   fontSize="2xl"
//                 >
//                   ${src.rent}
//                   <Box
//                     as="span"
//                     color="#3062D5"
//                     fontWeight="semibold"
//                     fontSize="md"
//                   >
//                     /month
//                   </Box>
//                 </Box>
//               </Flex>
//               {/*Rating*/}
//               <Box>
//                 <Flex alignItems="center">
//                   <Image src={star} width={6} height={6} />
//                   <Box>
//                     <Flex justifyContent="space-evenly" alignItems="center">
//                       <Box fontWeight={"Bold"} fontSize="xl">
//                         {src.rating}
//                       </Box>
//                       <Box px={1}>
//                         <p>({src.reviewCount} reviews)</p>
//                       </Box>
//                     </Flex>
//                   </Box>
//                 </Flex>
//               </Box>
//               {/*Delete Listing button*/}
//               <Flex mx={5}>
//                 <Box mx={3}>
//                   <IconButton
//                     icon={
//                       <Image
//                         width="100%"
//                         objectFit="cover"
//                         src={edit}
//                         alt="logo"
//                       />
//                     }
//                     onClick={(e) => {
//                       // e.preventDefault();
//                     }}
//                   />
//                 </Box>
//                 <Box>
//                   <IconButton
//                     width="5px"
//                     icon={
//                       <Image
//                         width="75%"
//                         h="85%"
//                         objectFit="fill"
//                         src={delete1}
//                         alt="logo"
//                       />
//                     }
//                     onClick={(e) => {
//                       // e.preventDefault();
//                       deleteCurrentListing(src._id);
//                     }}
//                   />
//                 </Box>
//               </Flex>
//             </Flex>
//             <Box color="#505050" lineHeight="tight" noOfLines={1}>
//               {src.address}
//             </Box>
//             <Flex alignItems={"center"}>
//               <Box
//                 mt={7}
//                 color="gray.500"
//                 fontWeight="semibold"
//                 letterSpacing="wide"
//                 fontSize="sm"
//                 textTransform="uppercase"
//                 w="80%"
//                 mr={20}
//               >
//                 <SimpleGrid columns={4} spacing={1} w="100%">
//                   <Box>BedRooms</Box>
//                   <Box>Bathrooms</Box>
//                   <Box>SquareFeet</Box>
//                   <Box>Pets</Box>

//                   <Text>{src.bedrooms} beds</Text>
//                   <Text>{src.bathrooms} baths</Text>
//                   <Text>{src.squareFeet} sqft</Text>
//                   <Text>{src.hasPet ? "Yes" : "No"}</Text>
//                 </SimpleGrid>
//               </Box>
//               <Box mt={7} w="8%">
//                 <Button
//                   variant="outline"
//                   colorScheme="blue"
//                   w="100%"
//                   backgroundColor="white"
//                   border="2px"
//                   borderRadius={10}
//                   onClick={() => {
//                     navigate(`/listing/${src._id}`);
//                   }}
//                 >
//                   View
//                 </Button>
//               </Box>
//             </Flex>
//           </Box>
//         </Flex>
//       </Box>
//     </LinkBox>
//   );
// };

// export default LandlordViewCard;

//starts
import {
  Box,
  Image,
  Text,
  SimpleGrid,
  Flex,
  LinkBox,
  Button,
  IconButton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import star from "../img/rating_star.jpg";
import delete1 from "../img/delete.jpg";
import { useNavigate } from "react-router-dom";
import { deleteListing } from "../services/listingApis";
import { getAverageRatingByListingId } from "../services/ratingApis";
import house from "../img/house1.jpg";

// LandlordViewCard component that takes in an object with information about a property listing
const LandlordViewCard = ({ src , getListings}) => {
  const navigate = useNavigate();
  const [averageRating, setAverageRating] = useState(null);

  // Async function that deletes the current listing
  /**
   * delete listing and retrives all the listings added by given landlord
   * @param {string} listing_id listing id
   */
  async function deleteCurrentListing(listing_id){

    await deleteListing(listing_id);
    await getListings(src?.landlordId);
  }

  /**
   * sets average rating and review count
   * @param {string} listingId listing id
   */
  async function getAverageRating(listingId) {
    const response = await getAverageRatingByListingId(listingId);
    if(response?.data && response.data.length > 0) {
        setAverageRating(response.data[0]);
    }
  }
  
  useEffect(() => {
    getAverageRating(src._id);
  }, [src._id]);

  return (
    // LinkBox component that acts as a clickable container for the listing card
    <LinkBox
      borderRadius={15}
      border="1px solid #F1F1F1"
      borderWidth="2px"
      p="4"
      w="100%"
      backgroundColor="#F1F1F1"
      overfill="hide"
    >
      {/* Content goes here */}
      <Box
        alignItems="center"
        w="100%"
        justifyContent={"space-between"}
        margin="auto"
      >
        <Flex alignItems="center">
          {/* Image on the listing card */}
          <Box w="20%" h="10%" borderRadius={15} pr={4}>
            <Image objectFit='fill' w="100%" h="100px" style={{borderRadius: '1rem'}} src={src.media.length>0 ? `data:image/jpeg;base64,${src.media[0]}` : house} alt="card image" />
          </Box>
          <Box w="80%" h="10%">
            <Flex
              justifyContent={"space-between"}
              margin="auto"
              alignItems={"flex-start"}
            >
              {/* Card name (listing) */}
              <Box fontWeight="extrabold" fontSize="2xl" color="black">
                {src.name}
              </Box>
              {/* Rent */}
              <Flex>
                <Box
                  color="#3062D5"
                  fontWeight="bold"
                  letterSpacing="wide"
                  fontSize="2xl"
                >
                  ${src.rent}
                  <Box
                    as="span"
                    color="#3062D5"
                    fontWeight="semibold"
                    fontSize="md"
                  >
                    /month
                  </Box>
                </Box>
              </Flex>
              {/* Rating */}
              <Box>
                <Flex alignItems="center">
                  <Image src={star} width={6} height={6} />
                  <Box>
                    <Flex justifyContent="space-evenly" alignItems="center">
                      <Box fontWeight={"Bold"} fontSize="xl">
                        {Math.round(averageRating?.averageRating || 0)}
                      </Box>
                      <Box px={1}>
                        <p>({averageRating?.reviewCount || 0} reviews)</p>
                      </Box>
                    </Flex>
                  </Box>
                </Flex>
              </Box>
              {/* Delete Listing button */}
              <Flex mx={5}>
                <Box mx={3}>
                  {/* <IconButton
                    icon={
                      <Image
                        width="100%"
                        objectFit="cover"
                        src={edit}
                        alt="logo"
                      />
                    }
                    onClick={(e) => {
                      // e.preventDefault();
                    }}
                  /> */}
                </Box>
                <Box>
                  <IconButton
                    width="5px"
                    icon={
                      <Image
                        width="75%"
                        h="85%"
                        objectFit="fill"
                        src={delete1}
                        alt="logo"
                      />
                    }
                    //on clicking the delete Icon in the card, that particular listing is deleted.
                    onClick={(e) => {
                      deleteCurrentListing(src._id);
                    }}
                  />
                </Box>
              </Flex>
            </Flex>
            <Box color="#505050" lineHeight="tight" noOfLines={1}>
              {src.address}
            </Box>
            <Flex alignItems={"center"}>
              <Box
                mt={7}
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="sm"
                textTransform="uppercase"
                w="80%"
                mr={20}
              >
                //For the parameter values
                <SimpleGrid columns={4} spacing={1} w="100%">
                  <Box>BedRooms</Box>
                  <Box>Bathrooms</Box>
                  <Box>SquareFeet</Box>
                  <Box>Pets</Box>

                  <Text>{src.bedrooms} beds</Text>
                  <Text>{src.bathrooms} baths</Text>
                  <Text>{src.squareFeet} sqft</Text>
                  <Text>{src.hasPet ? "Yes" : "No"}</Text>
                </SimpleGrid>
              </Box>
              <Box mt={7} w="8%">
                <Button
                  variant="outline"
                  colorScheme="blue"
                  w="100%"
                  backgroundColor="white"
                  border="2px"
                  borderRadius={10}
                  onClick={() => {
                    navigate(`/listing/${src._id}`);
                  }}
                >
                  View
                </Button>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </LinkBox>
  );
};

export default LandlordViewCard;
