/*
 * Filename: AddListingPage.js
 *
 * This file defines the frontend component AddListingPage(), which an authenticated
 * landlord will use to create a new listing. It defines a page that has multiple fields
 * to fill out, and upon clicking "Submit" will create the new listing and send a
 * request to the server to save this new data into the listing database.
 */

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
  Image,
  Textarea,
  HStack,
  Heading,
  FormHelperText,
  ButtonGroup,
  useToast,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { createListing } from "../services/listingApis";
import NavBar from "./NavBar";
import { getLandlordInfoById } from "../services/landlordApis";
import { useAuth } from "../Components/auth/context/hookIndex";

function AddListingPage() {
  const toast = useToast();

  // Fetching auth info of logged in landlord
  const { authInfo } = useAuth();
  const [landlordId, setLandlordId] = React.useState(authInfo?.profile?.id);

  const [landlordInfo, setLandlordInfo] = React.useState(null);

  useEffect(() => {
    const id = authInfo?.profile?.id;
    setLandlordId(id);

    // Fetching all info of current landlord
    async function getLandlordInfo(landlordId) {
      const response = await getLandlordInfoById(landlordId);
      if (response?.data) {
        setLandlordInfo(response.data);
      }
    }
    getLandlordInfo(id);
  }, [landlordId, authInfo]);

  const [name, setName] = React.useState();
  const [price, setPrice] = React.useState();
  const [address, setAddress] = React.useState();
  const [zipcode, setZipcode] = React.useState();
  const [bedrooms, setBedrooms] = React.useState();
  const [bathrooms, setBathrooms] = React.useState();
  const [area, setArea] = React.useState();
  const [pets, setPets] = React.useState();
  const [desc, setDesc] = React.useState();

  const [media, setMedia] = React.useState([]);
  const [selectedImages, setSelectedImages] = React.useState([]);
  const [popup, setPopup] = React.useState(false);

  //Takes the uploaded image and converts it to base64 string format
  /**
   * 
   * @param {Event Object} event event object
   * Converts image to base64 string
   */
  const onImageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      let images = [];
      for (let i = 0; i < event.target.files.length; i++) {
        let img = event.target.files[i];
        let reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = () => {
          images.push(reader.result.split("base64,")[1]);
          setSelectedImages(images);
        };
      }
    }
  };

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

  // Add new listing to DB
  const addListing = async (landlordId) => {
    // contruct new listing object
    const newListing = {
      name: name,
      address: address,
      rent: parseInt(price),
      landlordId: landlordId,
      description: desc,
      media: media,
      bedrooms: parseInt(bedrooms),
      bathrooms: parseInt(bathrooms),
      squareFeet: parseInt(area),
      hasPet: pets ? pets === "true" : false,
      postalCode: zipcode,
    };
    // console.log("new listing = ", newListing);

    // creates new listing and store it in db
    const response = await createListing(newListing);
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
        description: "Successfully added listing",
        status: "success",
        position: "top-right",
      });
    }
  };

  return (
    <Box>
      <NavBar />
      <Box my={100} ml={200} mr={200}>
        <Box>
          <Heading>Add New Listing</Heading>
        </Box>
        <Box>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              try {
                addListing(landlordInfo._id);
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
            <ButtonGroup spacing={5} float="right">
              <Button variant="outline" colorScheme="red" w={100}>
                Cancel
              </Button>
              <Button type="submit" variant="solid" colorScheme="blue" w={100}>
                Save
              </Button>
            </ButtonGroup>
            <br />
            <br />
            <VStack spacing={10} mt={10}>
              <FormControl id="name" isRequired>
                <HStack>
                  <FormLabel w="20%">Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Listing Name..."
                    defaultValue={name}
                    w="80%"
                    onChange={(e) => setName(e.target.value)}
                  />
                </HStack>
              </FormControl>
              {/*  */}
              <FormLabel w={"100%"}>Images/Videos (Up to 10)</FormLabel>
              <Box
                w={"100%"}
                h={200}
                border="2px"
                borderColor="gray.300"
                borderRadius={"2xl"}
                p={10}
                fontWeight="bold"
                ml="auto"
                display="flex"
                flexWrap="wrap"
              >
                {/* {" renders the base64 string and converts it to image to display in the box "} */}
                {media.map((image, index) => (
                  <Box key={index} mb={5}>
                    <Image src={`data:image/jpeg;base64,${image}`} maxH={180} maxW={200} />
                  </Box>
                ))}
                {/* {media.length > 0 ? `${media.length} file(s) uploaded` : "  "} */}
              </Box>
              {/*  */}
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
                      <Button colorScheme="blue" mr={3} onClick={uploadImages}>
                        Save
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              )}
              <Button
                variant="solid"
                colorScheme="blue"
                align="right"
                w={200}
                mt={5}
                float={"right"}
                onClick={showPopup}
                ml="auto"
              >
                Upload Images/Videos
              </Button>
              {/*  */}
              <FormLabel w={"100%"} fontSize={"3xl"}>
                Parameters
              </FormLabel>
              <Box
                w={"100%"}
                border="2px"
                borderColor="gray.300"
                borderRadius={"2xl"}
              >
                <VStack spacing={10} p={10}>
                  <FormControl id="price" isRequired>
                    <HStack>
                      <VStack w={"50%"} align={"left"}>
                        <FormLabel>Price</FormLabel>
                        <FormHelperText>($/month)</FormHelperText>
                      </VStack>
                      <Input
                        type="number"
                        placeholder="Listing Price..."
                        defaultValue={price}
                        w="50%"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </HStack>
                  </FormControl>
                  <FormControl id="address" isRequired>
                    <HStack>
                      <FormLabel w="50%">Address</FormLabel>
                      <Input
                        type="text"
                        placeholder="Listing Address..."
                        defaultValue={address}
                        w="50%"
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </HStack>
                  </FormControl>
                  <FormControl id="zipcode" isRequired>
                    <HStack>
                      <FormLabel w="50%">Zipcode</FormLabel>
                      <Input
                        type="number"
                        placeholder="Listing Zipcode..."
                        defaultValue={zipcode}
                        w="50%"
                        onChange={(e) => setZipcode(e.target.value)}
                      />
                    </HStack>
                  </FormControl>
                  <FormControl id="bedrooms" isRequired>
                    <HStack>
                      <FormLabel w="50%">Bedrooms</FormLabel>
                      <Input
                        type="number"
                        placeholder="Listing Bedroom count..."
                        defaultValue={bedrooms}
                        w="50%"
                        onChange={(e) => setBedrooms(e.target.value)}
                      />
                    </HStack>
                  </FormControl>
                  <FormControl id="bathrooms" isRequired>
                    <HStack>
                      <FormLabel w="50%">Bathrooms</FormLabel>
                      <Input
                        type="number"
                        placeholder="Listing Bathroom count..."
                        defaultValue={bathrooms}
                        w="50%"
                        onChange={(e) => setBathrooms(e.target.value)}
                      />
                    </HStack>
                  </FormControl>
                  <FormControl id="area" isRequired>
                    <HStack>
                      <VStack w={"50%"} align={"left"}>
                        <FormLabel>Area</FormLabel>
                        <FormHelperText>(sqft)</FormHelperText>
                      </VStack>
                      <Input
                        type="number"
                        placeholder="Listing area..."
                        defaultValue={area}
                        w="50%"
                        onChange={(e) => setArea(e.target.value)}
                      />
                    </HStack>
                  </FormControl>
                  <FormControl id="pets">
                    <HStack>
                      <FormLabel w="50%">Pets allowed</FormLabel>
                      <RadioGroup
                        colorScheme={"blue"}
                        defaultValue={pets}
                        onChange={setPets}
                      >
                        <HStack spacing={10}>
                          <Radio value="true">Yes</Radio>
                          <Radio value="false">No</Radio>
                        </HStack>
                      </RadioGroup>
                    </HStack>
                  </FormControl>
                </VStack>
              </Box>
              <FormControl id="description" isRequired>
                <FormLabel w={"100%"} fontSize={"3xl"}>
                  Listing Description
                </FormLabel>
                <Textarea
                  h="200"
                  mt={5}
                  p={5}
                  border="2px"
                  borderColor="gray.300"
                  borderRadius={"2xl"}
                  type="text"
                  placeholder="Add description..."
                  defaultValue={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </FormControl>
            </VStack>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default AddListingPage;
