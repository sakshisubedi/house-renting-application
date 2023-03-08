import {
  Box,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  HStack,
  Avatar,
  Heading,
  Select,
  Image,
  ButtonGroup,
  Flex,
  useToast,
  Spacer,
  Text,
  Divider,
  IconButton,
} from "@chakra-ui/react";
import {
  AttachmentIcon,
  EmailIcon,
  PhoneIcon,
  StarIcon,
} from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import favIcon from "../img/Union.svg";
import emptyHeart from "../img/emptyHeartButton.svg";
import { useLocation } from "react-router-dom";
import { BiHide } from "react-icons/bi";
import StarRatings from 'react-star-ratings';
import { getListingById } from "../services/listingApis";
import { addRating, getAverageRatingByListingId, getRatingByUserId, updateRating } from "../services/ratingApis";
import { getLandlordInfoById } from "../services/landlordApis";
import InterestedPeopleList from "./InterestedPeopleList";
import DetailedProfile from "./DetailedProfile";
import { useAuth } from "../Components/auth/context/hookIndex"

function IndividualListingPage() {

  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;
  const userId = authInfo.profile ? authInfo.profile.id : "640669c85943eac949e1f7a8"; // ELSE DUMMY USER ID

  // need to get actual data from PASSED PARAMS IN STATE or API CALLS

  let wishlistedPeople = [
    {
      email: {
        isPublic: false,
        data: "kbillingsley0@house.gov",
      },
      age: {
        isPublic: false,
        data: 27,
      },
      occupation: {
        isPublic: false,
        data: "Help Desk Technician",
      },
      _id: "63ffd73c35d9bd7fb39d9fa3",
      name: "Kora Billingsley",
      isVerified: true,
      pronoun: "She/Her",
      preferredMoveInDate: "2023-03-30T07:00:00.000Z",
      preferPet: false,
      isLookingForFlatmate: false,
      profilePicture: null,
      createdAt: "2023-03-01T22:52:44.079Z",
      updatedAt: "2023-03-01T22:52:44.079Z",
    },
    {
      email: {
        isPublic: false,
        data: "cwhichelow1@usnews.com",
      },
      age: {
        isPublic: false,
        data: 28,
      },
      occupation: {
        isPublic: false,
        data: "Pharmacist",
      },
      _id: "63ffd7cb35d9bd7fb39d9fa5",
      name: "Chico Whichelow",
      isVerified: true,
      pronoun: "He/Him",
      preferredMoveInDate: "2023-04-15T07:00:00.000Z",
      preferPet: false,
      isLookingForFlatmate: false,
      profilePicture: null,
      createdAt: "2023-03-01T22:55:07.161Z",
      updatedAt: "2023-03-01T22:55:07.161Z",
    },
    {
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
      _id: "63ffd80035d9bd7fb39d9fa7",
      name: "Ashton Bottrill",
      isVerified: true,
      pronoun: "He/Him",
      preferredMoveInDate: "2023-04-05T07:00:00.000Z",
      preferPet: true,
      isLookingForFlatmate: false,
      profilePicture: null,
      createdAt: "2023-03-01T22:56:00.991Z",
      updatedAt: "2023-03-01T22:56:00.991Z",
    },
    {
      email: {
        isPublic: false,
        data: "cfearnill3@yale.edu",
      },
      age: {
        isPublic: true,
        data: 24,
      },
      occupation: {
        isPublic: true,
        data: "Graphic Designer",
      },
      _id: "63ffd86235d9bd7fb39d9fa9",
      name: "Chris Fearnill",
      isVerified: true,
      pronoun: "He/Him",
      preferredMoveInDate: null,
      preferPet: false,
      isLookingForFlatmate: false,
      profilePicture: null,
      createdAt: "2023-03-01T22:57:38.273Z",
      updatedAt: "2023-03-01T22:57:38.273Z",
    },
    {
      email: {
        isPublic: true,
        data: "mlording4@comsenz.com",
      },
      age: {
        isPublic: true,
        data: 24,
      },
      occupation: {
        isPublic: true,
        data: "Computer Systems Analyst I",
      },
      _id: "63ffd8be35d9bd7fb39d9fab",
      name: "Morgen Lording",
      isVerified: true,
      pronoun: "He/Him",
      preferredMoveInDate: "2023-03-25T07:00:00.000Z",
      preferPet: false,
      isLookingForFlatmate: false,
      profilePicture: null,
      createdAt: "2023-03-01T22:59:10.446Z",
      updatedAt: "2023-03-01T22:59:10.446Z",
    },
  ];

  const [isWishlisted, setIsWishlisted] = useState(false); // INITIAL VALUE TO BE SET BASED ON VALUE FROM WISHLIST API
  const [currentRating, setCurrentRating] = useState(null); // INITIAL VALUE TO BE SET BASED ON VALUE FROM Rating API
  const [listingInfo, setListingInfo] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [landlordInfo, setLandlordInfo] = useState(null);

  const toast = useToast();

  const location = useLocation();
  useEffect(() => {
    let listingId = location.pathname.split("/").pop();

    async function getListing() {
      const response = await getListingById(listingId);
      if(response?.data) {
        setListingInfo(response.data);
        getLandlordInfo(response.data.landlordId);
      }
    }
    
    async function getAverageRating() {
      const response = await getAverageRatingByListingId(listingId);
      if(response?.data && response.data.length>0) {
        setAverageRating(response.data[0].averageRating);
        setReviewCount(response.data[0].reviewCount);
      }
    }

    async function getLandlordInfo(landlordId) {
      const response = await getLandlordInfoById(landlordId);
      if(response?.data) {
        setLandlordInfo(response.data);
      }
    }

    async function getCurrentRating() {
      const response = await getRatingByUserId(userId, listingId);
      if(response?.data && response.data.length>0) {
        setCurrentRating(response.data[0]);
      }
    }

    getListing();
    getAverageRating();
    getCurrentRating();
  }, [location])

  const changeCurrentRating = async (value) => {
    if (!currentRating) {
      // create new rating
      // console.log("here", location.pathname.split("/").pop())
      const rating = {
        userId: userId, // NEED TO ADD CURRENT USER ID
        listingId: location.pathname.split("/").pop(),
        rating: value
      };
      // console.log("req", rating)
      const response = await addRating(rating);
      if (response?.data) {
        setCurrentRating(response.data)
      }
    } else {
      // update rating
      const rating = {
        rating: value
      };
      const response = await updateRating(currentRating._id, rating);
      if (response?.data) {
        setCurrentRating(response.data)
      }
    }
  };

  return (
    listingInfo && landlordInfo && (
      <Box>
      <NavBar />
      <Box my={50} ml={150} mr={150}>
        <HStack spacing={5}>
          <Box>
            <VStack spacing={5} align={"left"}>
              <Heading size={"2xl"}>{listingInfo.name}</Heading>
              <Text fontSize={"xl"}>{listingInfo.address}</Text>
              <HStack>
                <Box fontSize={"xl"}>Rent Price :</Box>
                <Box
                  color="#3062D5"
                  fontWeight="bold"
                  letterSpacing="wide"
                  fontSize="2xl"
                >
                  ${listingInfo.rent}
                  <Box
                    as="span"
                    color="#3062D5"
                    fontWeight="semibold"
                    fontSize="sm"
                  >
                    /month
                  </Box>
                </Box>
              </HStack>
            </VStack>
          </Box>
          <Spacer />
          <Box>
            <VStack spacing={5} align={"center"}>
              <HStack spacing={2}>
                <StarIcon color={"#F6E05E"} boxSize={"30px"} />
                <Text fontWeight={"bold"} fontSize={"3xl"}>
                  {averageRating}
                </Text>
                {/* NEED TO GET CORRECT VALUE HERE */}
                <Text>({reviewCount} reviews)</Text>
              </HStack>
              <IconButton
                bg={"white"}
                style={{ backgroundColor: "transparent" }}
                icon={
                  <Image
                    boxSize={16}
                    src={isWishlisted ? favIcon : emptyHeart}
                    alt="wishlist button"
                  />
                }
                onClick={() => {
                  // ADD/REMOVE FROM WISHLIST

                  // CHANGING ICON SOURCE IMG
                  setIsWishlisted(!isWishlisted);
                }}
              />
            </VStack>
          </Box>
        </HStack>
        <Box
          mt={5}
          h={300}
          border="2px"
          borderColor="gray.300"
          borderRadius={"2xl"}
        >
          {/* IMAGES */}
          {/* <HStack p={1} spacing={5}>
            <Image rounded={"2xl"} src={listingData.img ?? null} />
            <Spacer/>
            <Image rounded={"2xl"} src={listingData.img ?? null} />
          </HStack> */}
        </Box>
        <HStack spacing={5} align={"top"}>
          <VStack spacing={5} w={"75%"}>
            <Box mt={5} w={"full"}>
              <HStack
                spacing={5}
                w={"full"}
                border="2px"
                borderColor="gray.300"
                borderRadius={"2xl"}
                p={5}
                fontSize={"xl"}
              >
                <VStack spacing={2} w={"25%"}>
                  <Text>Bedrooms</Text>
                  <Text fontWeight={"bold"}>{listingInfo.bedrooms}</Text>
                </VStack>
                {/* <Spacer /> */}
                <VStack spacing={2} w={"25%"}>
                  <Text>Bathrooms</Text>
                  <Text fontWeight={"bold"}>{listingInfo.bathrooms}</Text>
                </VStack>
                {/* <Spacer /> */}
                <VStack spacing={2} w={"25%"}>
                  <Text>Area</Text>
                  <Text fontWeight={"bold"}>{listingInfo.squareFeet}</Text>
                </VStack>
                {/* <Spacer /> */}
                <VStack spacing={2} w={"25%"}>
                  <Text>Pets</Text>
                  <Text fontWeight={"bold"}>
                    {listingInfo.hasPet ? "Yes" : "No"}
                  </Text>
                </VStack>
              </HStack>
              <Heading my={5} size={"lg"}>
                Overview
              </Heading>
              <Text>{listingInfo.description}</Text>
              <HStack spacing={5}>
                <Heading my={5} size={"lg"}>
                  Add a Star Rating
                </Heading>
                {/* Rating stars */}
                <StarRatings
                  name="rating"
                  numberOfStars={5}
                  starRatedColor={"#F6E05E"}
                  starEmptyColor={"#E2E8F0"}
                  starHoverColor={"#F6E05E"}
                  starDimension={"30px"}
                  // rating={currentRating}
                  rating={currentRating ? currentRating.rating : 0}
                  changeRating={(value)=>{
                    changeCurrentRating(value);
                  }}
                />
              </HStack>
              <Heading my={5} size={"lg"}>
                Comments
              </Heading>
              <Box
                border="2px"
                borderColor="gray.300"
                borderRadius={"2xl"}
                p={5}
              >
                <form>
                  <FormControl id="commentText"></FormControl>
                  <Textarea
                    placeholder="Leave a Comment..."
                    variant={"filled"}
                    mb={5}
                  />
                  <Flex mb={5}>
                    <Spacer />
                    <ButtonGroup>
                      <IconButton
                        colorScheme={"blue"}
                        icon={<AttachmentIcon />}
                        onClick={() => {
                          // ADD IMAGES POPUP
                        }}
                      />
                      <Button
                        type="submit"
                        variant="solid"
                        colorScheme="blue"
                        w={100}
                        onClick={(e) => {
                          e.preventDefault();
                          // ADD NEW COMMENT
                        }}
                      >
                        Post
                      </Button>
                    </ButtonGroup>
                  </Flex>
                </form>
                <Divider borderWidth={"2px"} mb={5} />
                <Box>{/* COMMENTS */}</Box>
              </Box>
            </Box>
          </VStack>
          <Spacer />
          <VStack spacing={5} w={"25%"}>
            <Box
              mt={5}
              w={"full"}
              border="2px"
              borderColor="gray.300"
              borderRadius={"2xl"}
              p={5}
            >
              <VStack spacing={5}>
                <HStack spacing={10} w={"full"}>
                  <Avatar name={landlordInfo.name} />
                  <Text fontWeight={"bold"} align={"right"} noOfLines={1}>
                    {landlordInfo.name}
                  </Text>
                </HStack>
                <HStack spacing={10} w={"full"}>
                  <EmailIcon />
                  <Text noOfLines={1}>{landlordInfo.email}</Text>
                </HStack>
                <HStack spacing={10} w={"full"}>
                  <PhoneIcon />
                  <Text noOfLines={1}>{landlordInfo.phoneNo}</Text>
                </HStack>
              </VStack>
            </Box>
            <Box
              mt={5}
              // h={300}
              w={"full"}
              border="2px"
              borderColor="gray.300"
              borderRadius={"2xl"}
              py={5}
              px={2}
            >
              <Text fontWeight={"bold"} textAlign={"center"}>
                People who have wishlisted this
              </Text>
              <Divider borderWidth={"3px"} my={2} />
              {/* WISHLISTED PEOPLE */}
              <VStack
                spacing={2}
                h={300}
                overflowY={"auto"}
                overflowX={"hidden"}
              >
                {wishlistedPeople.map((person, ind) => (
                  <Box key={ind} w={"full"}>
                    <HStack px={2}>
                      <Avatar name={person.name} size={"sm"} />
                      <Spacer />
                      <VStack
                        fontSize={"sm"}
                        spacing={2}
                        align={"left"}
                        w={"60%"}
                      >
                        <Text blur={"md"} fontWeight={"bold"}>{person.name}</Text>
                        <Divider borderWidth={"2px"} />
                        <HStack spacing={2}>
                          {person.age.isPublic ? (
                            <Text>{person.age.data}</Text>
                          ) : (
                            <BiHide size={"1.5rem"}/>
                          )}
                          <Spacer />
                          <Text>{person.pronoun}</Text>
                          {/* <Text>
                              {a.occupation.isPublic ? a.occupation.data : null}
                            </Text> */}
                        </HStack>
                      </VStack>
                      <Spacer />
                      <DetailedProfile p={person}></DetailedProfile>
                    </HStack>
                    <Divider borderWidth={"2px"} my={2} />
                  </Box>
                ))}
              </VStack>
              <Divider borderWidth={"3px"} />
              <Flex mt={2}>
                <Spacer />
                <InterestedPeopleList />
                <Spacer />
              </Flex>
            </Box>
          </VStack>
        </HStack>
      </Box>
    </Box>
    )
  );
}

export default IndividualListingPage;
