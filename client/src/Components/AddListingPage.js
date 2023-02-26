import {
  Box,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  HStack,
  Heading,
  FormHelperText,
  ButtonGroup,
  useToast,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import React from "react";
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

  const updateListingData = () => {
    const newListing = {};
    newListing.name = name;
    newListing.price = parseInt(price);
    newListing.address = address;
    newListing.zipcode = parseInt(zipcode);
    newListing.bedrooms = bedrooms ? parseInt(bedrooms) : undefined;
    newListing.bathrooms = bathrooms ? parseInt(bathrooms) : undefined;
    newListing.area = area ? parseInt(area) : undefined;
    newListing.pets = pets ? (pets === "true") : undefined;
    newListing.desc = desc;
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
                updateListingData();
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
              <FormControl id="media">
                <FormLabel w={"100%"}>Images/Videos (Up to 10)</FormLabel>
                <Box
                  w={"100%"}
                  h={200}
                  border="2px"
                  borderColor="gray.300"
                  borderRadius={"2xl"}
                >
                  {/* IMAGES */}
                </Box>
                <Button
                  variant="solid"
                  colorScheme="blue"
                  w={200}
                  mt={5}
                  float={"right"}
                  onClick={() => {
                    // Uploading images workflow?
                  }}
                >
                  Upload Images/Videos
                </Button>
              </FormControl>
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