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
import { updateLandlord } from "../services/landlordApis";
import React from "react";
import NavBar from "./NavBar";

function EditLandlordProfilePage() {
  // need to get actual data from db

  let landlordData = {  // NEED TO GET DYNAMIC USER DATA FROM LOCATION PROPS
    name: "Anthe Braybrooke",
    email: "abraybrookej@amazon.com",
    password: "test123",
    isVerified: true,
    pronoun: "They/Them",
    age: 27,
    phoneNo: "1234567890",
    introduction: "some test self intro",
    profilePicture: null,
    _id: "640656792b0fe156679a8bc2",
    createdAt: "2023-03-06T21:09:13.377Z",
    updatedAt: "2023-03-06T21:09:13.377Z",
    __v: 0,
  };

  const [desc, setDesc] = React.useState(landlordData.introduction ?? null);
  const [pronouns, setPronouns] = React.useState(landlordData.pronoun ?? null);
  const [age, setAge] = React.useState(landlordData.age ?? null);
  const [phone, setPhone] = React.useState(landlordData.phoneNo ?? null);

  const updateLandlordData = async () => {
    landlordData.introduction = desc === "" ? null : desc;
    landlordData.pronoun = pronouns === "" ? null : pronouns;
    landlordData.age = age === "" ? null : parseInt(age);
    landlordData.phoneNo = phone === "" ? null : phone;
    landlordData.updatedAt = new Date().toISOString();
    console.log(landlordData, "landlord data");

    const response = await updateLandlord(landlordData, landlordData._id); // NEED TO ENTER DYNAMIC LANDLORD ID
    if(response?.error) {
      toast({
        title: "Failed",
        description: response?.error,
        status: "error",
        position: "top-right"
      });
    } else {
      toast({
        title: "Success",
        description: "Successfully updated landlord profile",
        status: "success",
        position: "top-right"
      });
    }
  };

  const toast = useToast();

  return (
    <Box>
      <NavBar />
      <Box my={100} ml={250} mr={250}>
        <Box>
          <HStack spacing={5} mb={10}>
            <Avatar size="2xl" name={landlordData.name} src={null} />
            <VStack spacing={5} align="left" pl={50} w="100%">
              <Flex>
                <Heading mr={5}>{landlordData.name}</Heading>
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
                    updateLandlordData();
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
                      position: "top-right"
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
                    defaultValue={landlordData.email}
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
                    <option value="He/Him">He/Him</option>
                    <option value="She/Her">She/Her</option>
                    <option value="They/Them">They/Them</option>
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
            <Box mt={5}>{/* All listings go here */}</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default EditLandlordProfilePage;
