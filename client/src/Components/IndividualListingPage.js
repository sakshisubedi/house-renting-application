import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
  VStack,
  FormControl,
  Textarea,
  HStack,
  Avatar,
  Heading,
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
  CheckCircleIcon,
  DeleteIcon,
  EmailIcon,
  PhoneIcon,
  StarIcon,
} from "@chakra-ui/icons";
import { BiHide, BiLike, BiReply } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import favIcon from "../img/Union.svg";
import emptyHeart from "../img/emptyHeartButton.svg";
import { useLocation } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { getListingById } from "../services/listingApis";
import {
  addRating,
  getAverageRatingByListingId,
  getRatingByUserId,
  updateRating,
} from "../services/ratingApis";
import { getLandlordInfoById } from "../services/landlordApis";
import InterestedPeopleList from "./InterestedPeopleList";
import DetailedProfile from "./DetailedProfile";
import { useAuth } from "../Components/auth/context/hookIndex";
import {
  addComment,
  deleteComment,
  getCommentsByListingId,
} from "../services/commentApis";
import { getUserPublicInfoById } from "../services/userApis";
import { createWishlistItem, deleteWishlistItem, getIsWishlistedByUser, getInterestedPeopleByListingId } from "../services/wishlistApis";

function IndividualListingPage() {
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;
  const userType = localStorage.getItem("user-type");

  const [isWishlisted, setIsWishlisted] = useState(false); // INITIAL VALUE TO BE SET BASED ON VALUE FROM WISHLIST API
  const [currentRating, setCurrentRating] = useState(null); // INITIAL VALUE TO BE SET BASED ON VALUE FROM Rating API
  const [listingInfo, setListingInfo] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [landlordInfo, setLandlordInfo] = useState(null);
  const [commentInfo, setCommentInfo] = useState(null);
  const [commentText, setCommentText] = React.useState(null);
  const [wishlistInfo, setWishlistInfo] = useState(null);
  const [interestedPeople, setInterestedPeople] = useState([]);
  const [media, setMedia] = React.useState([]);
  const [selectedImages, setSelectedImages] = React.useState([]);
  const [popup, setPopup] = React.useState(false);

  const toast = useToast();

  const location = useLocation();
  const [userId, setUserId] = useState(
    location?.state?.userId || authInfo?.profile?.id
  );

  const uploadImages = () => {
    setMedia(selectedImages);
    setPopup(false);
  };

  const showPopup = () => {
    setPopup(true);
  };

  const closePopup = () => {
    setPopup(false);
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      let images = [];
      for (let i = 0; i < event.target.files.length; i++) {
        let img = event.target.files[i];
        let reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = () => {
          images.push(reader.result);
          // this.setState({
          //   images: images,
          // });
          setSelectedImages(images);
        };
      }
    }
  };

  async function isWishlistedByUser(listingId) {
    const response = await getIsWishlistedByUser(userId, listingId);
    if (!response.data) {
      setIsWishlisted(response.data);
      setWishlistInfo(null);
    } else {
      setIsWishlisted(true);
      setWishlistInfo(response.data);
    }
  }

  useEffect(() => {
    let listingId = location.pathname.split("/").pop();

    async function getListing() {
      const response = await getListingById(listingId);
      if (response?.data) {
        setListingInfo(response.data);
        getLandlordInfo(response.data.landlordId);
      }
    }

    async function getAverageRating() {
      const response = await getAverageRatingByListingId(listingId);
      if (response?.data && response.data.length > 0) {
        setAverageRating(response.data[0].averageRating);
        setReviewCount(response.data[0].reviewCount);
      }
    }

    async function getLandlordInfo(landlordId) {
      const response = await getLandlordInfoById(landlordId);
      if (response?.data) {
        setLandlordInfo(response.data);
      }
    }

    async function getCurrentRating() {
      const response = await getRatingByUserId(userId, listingId);
      if (response?.data && response.data.length > 0) {
        setCurrentRating(response.data[0]);
      }
    }

    async function getInterestedPeople() {
      const response = await getInterestedPeopleByListingId(listingId);
      var people = []
      if (response?.data) {
        for (const wishlist of response.data) {
          const user = await getUserPublicInfoById(wishlist.userId);
          if (!user?.error && wishlist.userId != userId) {
            people.push(user.data[0]);
          }
        }
      }
      setInterestedPeople(people);
    }

    getListing();
    isLoggedIn && getAverageRating();
    isLoggedIn && getCurrentRating();
    getComments(listingId);
    isLoggedIn && isWishlistedByUser(listingId);
    getInterestedPeople();
  }, [location, userId, isLoggedIn])

  const getComments = async (listingId) => {
    const response = await getCommentsByListingId(listingId);
    if (response?.data && response.data.length > 0) {
      setCommentInfo(response.data);
    }
  };

  const handleWishlist = async () => {
    if (!isWishlisted) {
      try {
        await createWishlistItem({
          listingId: location.pathname.split("/").pop(),
          userId: userId,
        });
      } catch (error) {
        toast({
          title: "Failed",
          description: error,
          status: "error",
          position: "top-right",
        });
      }
    } else {
      try {
        await deleteWishlistItem(wishlistInfo?._id);
      } catch (error) {
        toast({
          title: "Failed",
          description: error,
          status: "error",
          position: "top-right",
        });
      }
    }
    await isWishlistedByUser(location.pathname.split("/").pop());
  };

  const handleComment = async () => {
    if (commentText.trim() !== "") {
      const listingId = location.pathname.split("/").pop();
      const comment = {
        listingId,
        userId: userId,
        comment: commentText,
      };
      console.log(comment);
      const response = await addComment(comment);
      await getComments(listingId);
      if (response?.error) {
        toast({
          title: "Failed",
          description: response?.error,
          status: "error",
          position: "top-right",
        });
      } else {
        toast({
          title: "Success",
          description: "Successfully added new comment",
          status: "success",
          position: "top-right",
        });
      }
    }
    setCommentText(null);
  };

  async function deleteComm(comm_id) {
    await deleteComment(comm_id);
    await getComments(location.pathname.split("/").pop());
  }

  const changeCurrentRating = async (value) => {
    if (!currentRating) {
      // create new rating
      // console.log("here", location.pathname.split("/").pop())
      const rating = {
        userId: userId, // NEED TO ADD CURRENT USER ID
        listingId: location.pathname.split("/").pop(),
        rating: value,
      };
      // console.log("req", rating)
      const response = await addRating(rating);
      if (response?.data) {
        setCurrentRating(response.data);
      }
    } else {
      // update rating
      const rating = {
        rating: value,
      };
      const response = await updateRating(currentRating._id, rating);
      if (response?.data) {
        setCurrentRating(response.data);
      }
    }
  };

  return (
    // && userId
    listingInfo &&
    landlordInfo && (
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
                {userType!=="landlord" && <IconButton
                  bg={"white"}
                  style={{ backgroundColor: "transparent" }}
                  isDisabled={!isLoggedIn}
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
                    handleWishlist();
                  }}
                />}
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
                  {isLoggedIn ? (
                    <StarRatings
                      name="rating"
                      numberOfStars={5}
                      starRatedColor={"#F6E05E"}
                      starEmptyColor={"#E2E8F0"}
                      starHoverColor={"#F6E05E"}
                      starDimension={"30px"}
                      // rating={currentRating}
                      rating={currentRating ? currentRating.rating : 0}
                      changeRating={(value) => {
                        changeCurrentRating(value);
                      }}
                    />
                  ) : (
                    <Text fontSize={20} fontWeight={"light"}>
                      Login to add your rating!
                    </Text>
                  )}
                </HStack>
                <Heading my={5} size={"lg"}>
                  Comments
                </Heading>
                <Box
                  border="2px"
                  borderColor="gray.300"
                  borderRadius={"2xl"}
                  p={2}
                  style={{ filter: isLoggedIn ? "none" : "blur(5px)" }}
                >
                  <form>
                    <FormControl id="commentText"></FormControl>
                    <Textarea
                      placeholder="Leave a Comment..."
                      variant={"filled"}
                      mb={2}
                      // defaultValue={comm}
                      isDisabled={!isLoggedIn}
                      // onChange={(e) => setComm(e.target.value)}
                      defaultValue={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <Flex mb={3}>
                      <Spacer />
                      <ButtonGroup>
                        <IconButton
                          colorScheme={"blue"}
                          icon={<AttachmentIcon />}
                          isDisabled={!isLoggedIn}
                          // onClick={() => {
                          //   // ADD IMAGES POPUP
                          // }}
                          onClick={showPopup}
                        />
                        {popup && (
                          <Modal isOpen={popup} onClose={closePopup}>
                            <ModalOverlay />
                            <ModalContent>
                              <ModalHeader>Select Image(s)</ModalHeader>
                              <ModalCloseButton />
                              <ModalBody>
                                <FormControl>
                                  <input
                                    type="file"
                                    name="myImage"
                                    onChange={onImageChange}
                                    multiple
                                  />
                                </FormControl>
                              </ModalBody>
                              <ModalFooter>
                                <Button
                                  colorScheme="blue"
                                  mr={3}
                                  onClick={uploadImages}
                                >
                                  Save
                                </Button>
                              </ModalFooter>
                            </ModalContent>
                          </Modal>
                        )}
                        <Button
                          type="submit"
                          variant="solid"
                          colorScheme="blue"
                          w={100}
                          isDisabled={!isLoggedIn}
                          onClick={(e) => {
                            e.preventDefault();
                            // ADD NEW COMMENT
                            try {
                              handleComment();
                              // toast({
                              //   title: "Success",
                              //   description: "Changes Saved",
                              //   status: "success",
                              //   position: "top-right"
                              // });
                            } catch (error) {
                              toast({
                                title: "Failed",
                                description: error,
                                status: "error",
                                position: "top-right",
                              });
                            }
                          }}
                        >
                          Post
                        </Button>
                      </ButtonGroup>
                    </Flex>
                  </form>
                  <Divider borderWidth={"2px"} mb={3} />
                  <Box>
                    {/* COMMENTS */}
                    {commentInfo?.map((comment, ind) => (
                      <Box key={ind}>
                        <HStack spacing={2} px={3}>
                          <Avatar name={comment.user.name} size={"sm"} />
                          <Text fontWeight={"bold"} fontSize={"2xl"}>
                            {comment.user.name}
                          </Text>
                          <Spacer />
                          <BiLike
                            size={25}
                            color={"#3182CE"}
                            onClick={() => {}}
                          />
                          <BiReply
                            ml={5}
                            size={30}
                            color={"#3182CE"}
                            onClick={() => {}}
                          />
                          <IconButton
                            icon={<DeleteIcon boxSize={5} />}
                            variant={"link"}
                            colorScheme={"blue"}
                            onClick={() => {
                              deleteComm(comment._id);
                            }}
                          />
                        </HStack>
                        <Text ml={10} fontSize={"lg"}>
                          {comment.comment}
                        </Text>
                        <Divider borderWidth={"3px"} my={2} />
                        {comment.reply.length > 0 &&
                        Object.keys(comment.reply[0]).length > 0 ? (
                          <>
                            <Box ml={"2rem"}>
                              {/* REPLY BOX */}
                              {comment.reply.map((reply, idx) => (
                                <>
                                  <HStack spacing={2} px={3} key={idx}>
                                    <Avatar
                                      name={reply.user.name}
                                      size={"xs"}
                                    />
                                    <Text fontWeight={"bold"} fontSize={"xl"}>
                                      {reply.user.name}
                                    </Text>
                                    <CheckCircleIcon
                                      boxSize={4}
                                      color={"blue.500"}
                                    />
                                    <Spacer />
                                    <BiLike
                                      size={25}
                                      color={"#3182CE"}
                                      onClick={() => {}}
                                    />
                                    <IconButton
                                      icon={<DeleteIcon boxSize={5} />}
                                      variant={"link"}
                                      colorScheme={"blue"}
                                      onClick={() => {
                                        deleteComm(reply._id);
                                      }}
                                    />
                                  </HStack>
                                  <Text ml={10} fontSize={"md"}>
                                    {reply.comment}
                                  </Text>
                                </>
                              ))
                            }
                            
                          </Box>
                          <Divider borderWidth={"3px"} my={2}/>
                        </>
                      ): <br/>
                      }
                    </Box>
                  ))}
                </Box>
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
              style={{ filter:  isLoggedIn ? "none" : "blur(5px)" }}
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
              style={{ filter:  isLoggedIn ? "none" : "blur(5px)" }}
            >
              <Text fontWeight={"bold"} textAlign={"center"}>
                People who have wishlisted this
              </Text>
              <Divider borderWidth={"3px"} my={2} />
              {/* WISHLISTED PEOPLE */}
              {interestedPeople.length == 0 ?
                  (<Box
                  py={2}
                  px={3}>
                    <Text>Oops...currently there is no user interested in this listing.</Text>
                  </Box>)
                  :
                  (
                    <Box>
                      <VStack
                        spacing={2}
                        h={300}
                        overflowY={isLoggedIn ? "auto" : "hidden"}
                        overflowX={"hidden"}
                      >
                        {interestedPeople.map((person, ind) => (
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
                                  {person.age ? (
                                    <Text>{person.age.data}</Text>
                                  ) : (
                                    <BiHide size={"1.5rem"} />
                                  )}
                                  <Spacer />
                                  <Text>{person.pronoun}</Text>
                                </HStack>
                              </VStack>
                              <Spacer />
                              <DetailedProfile p={person} l={isLoggedIn}></DetailedProfile>
                            </HStack>
                            <Divider borderWidth={"2px"} my={2} />
                          </Box>
                        ))}
                      </VStack>
                      <Divider borderWidth={"3px"} />
                      <Flex mt={2}>
                        <Spacer />
                        <InterestedPeopleList wishlistedPeople={interestedPeople} l={isLoggedIn}/>
                        <Spacer />
                      </Flex>
                    </Box>
                  )}
              <Divider borderWidth={"3px"} />
              <Flex mt={2}>
                <Spacer />
                <InterestedPeopleList wishlistedPeople={interestedPeople} l={isLoggedIn}/>
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
