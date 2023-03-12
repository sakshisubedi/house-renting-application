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
import React from "react";
import NavBar from "./NavBar";
import favIcon from "../img/Union.svg";

function IndividualListingPage() {
  // need to get actual data from db

  let landlordData = {
    name: "Pratyush Karmakar",
    email: "pkarmakar@ucsd.edu",
    phoneNo: "123-456-7890",
  };

  let tempData = {
    name: "Palm Harbor",
    address: "2699 Green Valley, La Jolla, CA",
    rent: 2000,
    rating: 4.5,
    landlordId: null,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    media: null,
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 1000,
    hasPet: true,
    postalCode: "92092",
    timestamp: Date(),
  };
  const [popup, setPopup] = React.useState(false);
  const [media, setMedia] = React.useState([]);
  const [selectedImages, setSelectedImages] = React.useState([]);

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

  const [desc, setDesc] = React.useState(tempData.desc ?? null);
  const [pronouns, setPronouns] = React.useState(tempData.pronouns ?? null);
  const [age, setAge] = React.useState(tempData.age ?? null);
  const [phone, setPhone] = React.useState(tempData.phone ?? null);

  const toast = useToast();

  return (
    <Box>
      <NavBar />
      <Box my={50} ml={150} mr={150}>
        <HStack spacing={5}>
          <Box>
            <VStack spacing={5} align={"left"}>
              <Heading size={"2xl"}>{tempData.name}</Heading>
              <Text fontSize={"xl"}>{tempData.address}</Text>
              <HStack>
                <Box fontSize={"xl"}>Rent Price :</Box>
                <Box
                  color="#3062D5"
                  fontWeight="bold"
                  letterSpacing="wide"
                  fontSize="2xl"
                >
                  ${tempData.rent}
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
                <StarIcon color={"yellow.400"} boxSize={"30px"} />
                <Text fontWeight={"bold"} fontSize={"3xl"}>
                  {tempData.rating}
                </Text>
                <Text>(120 reviews)</Text>
              </HStack>
              <IconButton
                bg={"white"}
                icon={
                  <Image boxSize={16} src={favIcon} alt="wishlist button" />
                }
                onClick={() => {
                  // ADD/REMOVE FROM WISHLIST
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
        </Box>
        <HStack spacing={5} align={"top"}>
          <VStack spacing={5} w={"75%"}>
            <Box mt={5} w={"full"}>
              <HStack
                spacing={5}
                // w={"full"}
                border="2px"
                borderColor="gray.300"
                borderRadius={"2xl"}
                px={20}
                py={5}
              >
                <VStack spacing={2}>
                  <Text>Bedrooms</Text>
                  <Text>{tempData.bedrooms}</Text>
                </VStack>
                <Spacer />
                <VStack spacing={2}>
                  <Text>Bathrooms</Text>
                  <Text>{tempData.bathrooms}</Text>
                </VStack>
                <Spacer />
                <VStack spacing={2}>
                  <Text>Area</Text>
                  <Text>{tempData.squareFeet}</Text>
                </VStack>
                <Spacer />
                <VStack spacing={2}>
                  <Text>Pets</Text>
                  <Text>{tempData.hasPet ? "Yes" : "No"}</Text>
                </VStack>
              </HStack>
              <Heading my={5} size={"lg"}>
                Overview
              </Heading>
              <Text>{tempData.description}</Text>
              <HStack spacing={3}>
                <Heading my={5} size={"lg"}>
                  Add a Star Rating
                </Heading>
                {/* Rating stars */}
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
                        // onClick={() => {
                        //   // ADD IMAGES POPUP
                        //   //
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
                        onClick={() => {
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
                  <Avatar name={landlordData.name} />
                  <Text fontWeight={"bold"} align={"right"}>
                    {landlordData.name}
                  </Text>
                </HStack>
                <HStack spacing={10} w={"full"}>
                  <EmailIcon />
                  <Text>{landlordData.email}</Text>
                </HStack>
                <HStack spacing={10} w={"full"}>
                  <PhoneIcon />
                  <Text>{landlordData.phoneNo}</Text>
                </HStack>
              </VStack>
            </Box>
            <Box
              mt={5}
              h={300}
              w={"full"}
              border="2px"
              borderColor="gray.300"
              borderRadius={"2xl"}
              p={5}
            >
              <Text fontWeight={"bold"} textAlign={"center"}>
                People who have wishlisted this
              </Text>
              <Divider borderWidth={"2px"} my={2} />
              {/* WISHLISTED PEOPLE */}
            </Box>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
}

export default IndividualListingPage;
