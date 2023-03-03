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
  FormHelperText,
  ButtonGroup,
  Flex,
  useToast,
  Spacer,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import React from "react";
import NavBar from "./NavBar";
import LandlordViewCard from "./LandlordViewCard";
import house1 from "../img/house1.jpg";
import ListingCard from "./ListingCard";
function EditLandlordProfilePage() {
  // need to get actual data from db

  let tempData = {
    name: "Pratyush Karmakar",
    email: "pkarmakar@ucsd.edu",
  };
  let tempListing = {
    img: house1,
    name: "Palm Harbor",
    address: "4067 Miramar St, La Jolla, CA 92092",
    rent: "1900",
    reviewCount: 34,
    rating: 3.3,
    // parameters...
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1200,
    petFriendly: "allowed",
    postalCode: 920092,
  };
  const [desc, setDesc] = React.useState(tempData.desc ?? null);
  const [pronouns, setPronouns] = React.useState(tempData.pronouns ?? null);
  const [age, setAge] = React.useState(tempData.age ?? null);
  const [phone, setPhone] = React.useState(tempData.phone ?? null);

  const updateUserData = () => {
    tempData.desc = desc === "" ? null : desc;
    tempData.pronouns = pronouns === "" ? null : pronouns;
    tempData.age = age === "" ? null : parseInt(age);
    tempData.phone = phone === "" ? null : phone;
    console.log(tempData, "landlord data");

    // need to transform tempData into proper DB schema format
    // SAVE TO DB
  };

  const toast = useToast();

  return (
    <Box>
      <NavBar />
      <Box my={100} ml={250} mr={250}>
        <Box>
          <HStack spacing={5} mb={10}>
            <Avatar size="2xl" name={tempData.name} src={null} />
            <VStack spacing={5} align="left" pl={50} w="100%">
              <Flex>
                <Heading mr={5}>{tempData.name}</Heading>
                <CheckCircleIcon boxSize={7} color={"blue.500"} />
              </Flex>
              <Textarea
                type="text"
                placeholder="Short self intro..."
                defaultValue={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </VStack>
          </HStack>
        </Box>
        <Box>
          <form>
            <ButtonGroup spacing={5} float="right">
              <Button variant="outline" colorScheme="red" w={100}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="solid"
                colorScheme="blue"
                w={100}
                onClick={(e) => {
                  e.preventDefault();
                  try {
                    updateUserData();
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
                Save
              </Button>
            </ButtonGroup>
            <br />
            <br />
            <VStack spacing={10} mt={10}>
              <FormControl id="email">
                <HStack>
                  <FormLabel w="50%">Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="johndoe@gmail.com"
                    defaultValue={tempData.email}
                    w="50%"
                    isDisabled
                  />
                </HStack>
              </FormControl>
              <FormControl id="pronouns">
                <HStack>
                  <VStack w="50%" align="left">
                    <FormLabel>Pronouns</FormLabel>
                    <FormHelperText>E.g.: she/her/hers, etc.</FormHelperText>
                  </VStack>
                  <Select
                    placeholder="Select option"
                    defaultValue={pronouns}
                    w="50%"
                    onChange={(e) => setPronouns(e.target.value)}
                  >
                    <option value="He/Him/His">He/Him/His</option>
                    <option value="She/Her/Hers">She/Her/Hers</option>
                    <option value="They/Them/Their">They/Them/Their</option>
                  </Select>
                </HStack>
              </FormControl>
              <FormControl id="age">
                <HStack>
                  <FormLabel w={"50%"}>Age</FormLabel>
                  <Input
                    type="number"
                    placeholder="Enter your age..."
                    defaultValue={age}
                    w="50%"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </HStack>
              </FormControl>
              <FormControl id="phone">
                <HStack>
                  <FormLabel w={"50%"}>Phone Number</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter your phone no..."
                    defaultValue={phone}
                    w="50%"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </HStack>
              </FormControl>
            </VStack>
          </form>
          <Box mt={10}>
            <Flex>
              <Heading>Your Listings</Heading>
              <Spacer />
              <Button
                type="submit"
                variant="solid"
                colorScheme="blue"
                w={100}
                onClick={() => {
                  // Navigate to add listing Page
                }}
              >
                Add Listing
              </Button>
            </Flex>
            <Box mt={10}>
              {/* <LandlordViewCard></LandlordViewCard> */}
              <LandlordViewCard ard src={tempListing}>
                {" "}
              </LandlordViewCard>
              {/* All listings go here */}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default EditLandlordProfilePage;
