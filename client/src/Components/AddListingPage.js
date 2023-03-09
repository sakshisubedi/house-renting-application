import {
  Box,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Image,
  HStack,
  Heading,
  FormHelperText,
  ButtonGroup,
  useToast,
  RadioGroup,
  Text,
  Radio,
} from "@chakra-ui/react";
import React from "react";
import { createListing } from "../services/listingApis";
// import UploadImage from ".//UploadImage";

import NavBar from "./NavBar";
// import axios from "axios";

function AddListingPage() {
  const toast = useToast();

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

  const uploadImages = () => {
    setMedia(selectedImages);
    setPopup(false);
  };

  const showPopup = () => {
    setPopup(true);
  };

  const updateListingData = () => {
    const newListing = {};
    newListing.name = name;
    newListing.price = parseInt(price);
    newListing.address = address;
    newListing.zipcode = parseInt(zipcode);
    newListing.bedrooms = bedrooms ? parseInt(bedrooms) : undefined;
    newListing.bathrooms = bathrooms ? parseInt(bathrooms) : undefined;
    newListing.area = area ? parseInt(area) : undefined;
    newListing.pets = pets ? pets === "true" : undefined;
    newListing.desc = desc;
    newListing.media = media;
    console.log("new listing = ", newListing);

    // need to transform tempData into proper DB schema format
    // SAVE TO DB

    // axios
    //   .post("http://localhost:4000/api/v1/listing", newListing, {
    //     method: "POST",
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //   });
  };
  const addListing = async () => {
    const newListing = {
      name: name,
      address: address,
      rent: parseInt(price),
      landlordId: "63f19a80aa15f4fb60ffc14f", //default id, need to change later
      description: desc,
      media: [],
      bedrooms: parseInt(bedrooms),
      bathrooms: parseInt(bathrooms),
      squareFeet: parseInt(area),
      hasPet: pets ? pets === "true" : false,
      postalCode: zipcode,
    };

    console.log("new listing = ", newListing);

    const response = await createListing(newListing);
    if (response?.error) {
      toast({
        title: "Failed",
        description: response?.error,
        status: "error",
      });
    } else {
      toast({
        title: "Success",
        description: "Successfully added listing",
        status: "success",
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
                // updateListingData();
                addListing();
                toast({
                  title: "Success",
                  description: "Changes Saved",
                  status: "success",
                });
              } catch (error) {
                toast({
                  title: "Failed",
                  description: error,
                  status: "error",
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
              {/* </FormControl> */}

              {popup && (
                <Box
                  position="absolute"
                  width="100%"
                  height="100%"
                  backgroundColor={"rgba(00,00,00,0.5)"}
                >
                  <FormControl
                    id="media"
                    position=" relative"
                    top="50%"
                    left="50%"
                    background="white"
                    z-index="99999"
                    transform="translate(-50%, -50%)"
                    width="600px"
                  >
                    <FormLabel w={"100%"}>Images/Videos (Up to 10)</FormLabel>
                    <Box
                      w={"100%"}
                      h={200}
                      border="2px"
                      borderColor="gray.300"
                      borderRadius={"2xl"}
                    >
                      {/*  */}
                      {/* IMAGES */}
                      <Box
                        textAlign="left"
                        my={6}
                        mx={6}
                        position="absolute"
                        width="70%"
                        height="50%"
                      >
                        <Heading size="lg" mb="4">
                          Select Image(s)
                        </Heading>
                        <input
                          type="file"
                          name="myImage"
                          onChange={onImageChange}
                          multiple
                        />
                        <Button
                          type="submit"
                          variant="solid"
                          colorScheme="blue"
                          w={100}
                          onClick={uploadImages}
                        >
                          Save
                        </Button>
                      </Box>
                      {/* <UploadImage /> */}

                      {/*  */}

                      {/*  */}
                    </Box>

                    {/* <Box bg="blue">
                {media.map((image) => (
                  <Text key={image}>{image}</Text>
                ))}
              </Box> */}
                  </FormControl>
                </Box>
              )}

              {media.length && (
                <Box
                  w={"100%"}
                  h={200}
                  border="2px"
                  borderColor="gray.300"
                  borderRadius={"2xl"}
                >
                  {/* const images = selectedImages.map((imageData) => {
    const imageUrl = URL.createObjectURL(imageData);
    const img = <img src={imageUrl} />;
    return img;
  }); */}
                  {media.map(
                    (imageData) => {
                      return URL.createObjectURL(
                        imageData.slice(22, imageData.length)
                      );

                      // (
                      //   <Image
                      //     width="200px"
                      //     height="150px"
                      //     borderRadius={"10px"}
                      //     src={URL.createObjectURL(imageData)}
                      //   />
                      // );

                      // const imageUrl = URL.createObjectURL(imageData);
                      // const img = (
                      // );
                      // return img;
                    }
                    // <Text key={image}>{image}</Text>
                  )}
                </Box>
              )}
              <Button
                variant="solid"
                colorScheme="blue"
                align="right"
                w={200}
                mt={5}
                float={"right"}
                onClick={showPopup}
              >
                Upload Images/Videos
              </Button>
              <FormLabel w={"100%"} fontSize={"3xl"}>
                Parameters
              </FormLabel>
              <Box
                w={"100%"}
                // h={200}
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
