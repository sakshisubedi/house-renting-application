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
  useToast,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { updateUser, getUserAllInfoById } from "../services/userApis";
import NavBar from "./NavBar";
import { useLocation } from "react-router-dom";

// Get current login user
import { useAuth } from "../Components/auth/context/hookIndex"

function EditCustomerProfilePage() {
  // need to get actual data from db
  const { authInfo } = useAuth();
  const userId = authInfo?.profile?.id;
  const [userData, setUserData] = React.useState(null);

  let tempUserData = { // NEED TO GET DYNAMIC USER DATA FROM LOCATION PROPS
    email: {
      isPublic: false,
      data: authInfo?.profile?.email,
    },
    age: {
      isPublic: false,
      data: "",
    },
    occupation: {
      isPublic: false,
      data: "",
    },
    _id: userId,
    name: authInfo?.profile?.name,
    isVerified: false,
    pronoun: "",
    preferredMoveInDate: "",
    preferPet: false,
    isLookingForFlatmate: false,
    profilePicture: null
  };

  useEffect(() => {
    async function getUserInfo() {
      const response = await getUserAllInfoById(userId);
      if(response?.data) {
        setUserData(response.data);
        tempUserData = response.data;
      }
    }
    getUserInfo();
  },[authInfo]);

 

  const updateUserData = async () => {
    console.log(tempUserData, "---------");
  };

  const toast = useToast();

  return (
    userData && tempUserData && (
      <>
        <Box>
          <NavBar />
          <Box my={100} ml={250} mr={250}>
            <Box>
              <HStack spacing={5} mb={10}>
                <Avatar size="2xl" name={userData.name} src={null} />
                <VStack spacing={5} align="left" pl={50} w="100%">
                  <Heading>{userData.name}</Heading>
                  {/* <Textarea
                    type="text"
                    placeholder="Short self intro..."
                    defaultValue={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  /> */}
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
                      <VStack w="50%" align={"left"} spacing={5}>
                        <Input
                          type="email"
                          placeholder="johndoe@gmail.com"
                          defaultValue={userData.email.data}
                          w="full"
                          isDisabled
                        />
                        <RadioGroup
                          colorScheme={"blue"}
                          defaultValue={userData.email.isPublic.toString()}
                          onChange={(e) => {
                            tempUserData.email.isPublic = Boolean(e.target.value);
                          }}
                        >
                          <HStack spacing={10}>
                            <Text>Make this field public :</Text>
                            <Radio value="true">Yes</Radio>
                            <Radio value="false">No</Radio>
                          </HStack>
                        </RadioGroup>
                      </VStack>
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
                        defaultValue={userData.pronoun}
                        w="50%"
                        onChange={(e) => {
                          tempUserData.pronoun = e.target.value;
                        }}
                      >
                        <option value="He/Him">He/Him</option>
                        <option value="She/Her">She/Her</option>
                        <option value="They/Them">They/Them</option>
                      </Select>
                    </HStack>
                  </FormControl>
                  <FormControl id="age">
                    <HStack>
                      <FormLabel w="50%">Age</FormLabel>
                      <VStack w="50%" align={"left"} spacing={5}>
                        <Input
                          type="number"
                          placeholder="Enter your age..."
                          defaultValue={userData.age.data}
                          w="full"
                          onChange={(e) => {
                            tempUserData.age.data = e.target.value;
                          }}
                        />
                        <RadioGroup
                          colorScheme={"blue"}
                          defaultValue={userData.age.isPublic.toString()}
                          onChange={(e) => {
                            tempUserData.age.isPublic = Boolean(e.target.value);
                          }}
                        >
                          <HStack spacing={10}>
                            <Text>Make this field public :</Text>
                            <Radio value="true">Yes</Radio>
                            <Radio value="false">No</Radio>
                          </HStack>
                        </RadioGroup>
                      </VStack>
                    </HStack>
                  </FormControl>
                  <FormControl id="occupation">
                    <HStack>
                      <VStack w="50%" align="left">
                        <FormLabel>Occupation</FormLabel>
                        <FormHelperText>
                          E.g.: student, medical assistant, etc.
                        </FormHelperText>
                      </VStack>
                      <VStack w="50%" align={"left"} spacing={5}>
                        <Input
                          type="text"
                          placeholder="Enter your occupation..."
                          defaultValue={userData.occupation.data}
                          w="full"
                          onChange={(e) => {
                            tempUserData.occupation.data = e.target.value;
                          }}
                        />
                        <RadioGroup
                          colorScheme={"blue"}
                          defaultValue={userData.occupation.isPublic.toString()}
                          onChange={(e) => {
                            tempUserData.occupation.isPublic = Boolean(e.target.value);
                          }}
                        >
                          <HStack spacing={10}>
                            <Text>Make this field public :</Text>
                            <Radio value="true">Yes</Radio>
                            <Radio value="false">No</Radio>
                          </HStack>
                        </RadioGroup>
                      </VStack>
                    </HStack>
                  </FormControl>
                  <FormControl id="moveDate">
                    <HStack>
                      <VStack w="50%" align="left">
                        <FormLabel>Preferred Move-in Date</FormLabel>
                      </VStack>
                      <Input
                        type="date"
                        placeholder="Enter your preferred move-in date..."
                        defaultValue={userData.preferredMoveInDate}
                        w="50%"
                        onChange={(e) => {
                          tempUserData.preferredMoveInDate = e.target.value;
                        }}
                      />
                    </HStack>
                  </FormControl>
                  <FormControl id="housematesBool">
                    <HStack>
                      <FormLabel w="50%">Looking for Housemates</FormLabel>
                      <Select
                        placeholder="Select option"
                        defaultValue={userData.isLookingForFlatmate ? "true": "false"}
                        w="50%"
                        onChange={(e) => {
                          tempUserData.isLookingForFlatmate = Boolean(e.target.value);
                        }}
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </Select>
                    </HStack>
                  </FormControl>
                  <FormControl id="petsBool">
                    <HStack>
                      <FormLabel w="50%">Open to having pets</FormLabel>
                      <Select
                        placeholder="Select option"
                        defaultValue={userData.preferPet}
                        w="50%"
                        onChange={(e) => {
                          tempUserData.preferPet = Boolean(e.target.value);
                        }}
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </Select>
                    </HStack>
                  </FormControl>
                </VStack>
              </form>
            </Box>
          </Box>
        </Box>
      </>
    )
  );
}

export default EditCustomerProfilePage;
