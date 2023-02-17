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

function EditLandlordProfilePage() {
  // need to get actual data from db

  // const tempData = {
  //   name: "Pratyush Karmakar",
  //   desc: "temporary self intro",
  //   email: "pkarmakar@ucsd.edu",
  //   pronouns: "He/Him/His",
  //   age: 24,
  //   occupation: "student",
  //   datePref: "1 month",
  //   spacePref: "1bd/1ba",
  //   housematesBool: "No",
  //   roommatePrefs: "test prefs",
  //   petsPref: "No",
  // };

  let tempData = {
    name: "Pratyush Karmakar",
    email: "pkarmakar@ucsd.edu",
  };

  const [desc, setDesc] = React.useState(tempData.desc ?? null);
  const [pronouns, setPronouns] = React.useState(tempData.pronouns ?? null);

  const updateUserData = () => {
    tempData.desc = desc === "" ? null : desc;
    tempData.pronouns = pronouns === "" ? null : pronouns;
    // SAVE TO DB
  };

  const toast = useToast();

  return (
    <Box>
      {/* <NavBar /> */}
      <Box my={100} ml={200} mr={400}>
        <Box>
          <HStack spacing={5} mb={10}>
            <Avatar size="2xl" name={tempData.name} src={null} />
            <VStack spacing={5} align="left" pl={50} w="100%">
              <Flex>
                <Heading mr={5}>{tempData.name}</Heading>
                {/* <Input mr={5} defaultValue={tempData.name ?? null} placeholder="Enter First and Last Name here..."  /> */}
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
                  // e.preventDefault();
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
              <FormControl id="email" isDisabled>
                <HStack>
                  <FormLabel w="50%">Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="johndoe@gmail.com"
                    defaultValue={tempData.email}
                    w="50%"
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
                  // Navogate to add listing Page
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
