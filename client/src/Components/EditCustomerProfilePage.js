/*
 * Filename: EditCustomerProfilePage.js
 * 
 * This file defines the authenticated customer's profile page, and allows them to update
 * their own information at their discretion. It also allows them to change if they want
 * their email, age, and occupation to be public. The public information inputted on this
 * page can be seen by others on this application.
 */

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
import { useAuth } from "../Components/auth/context/hookIndex"
import { useLocation } from "react-router-dom";

function EditCustomerProfilePage() {
  // Fetching auth info of logged in user
  const { authInfo } = useAuth();
  const location = useLocation();
  const [userId, setUserId] = React.useState(location.pathname.split("/").pop() || authInfo?.profile?.id);

  const [userData, setUserData] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [emailPublicFlag, setEmailPublicFlag] = React.useState(null);
  const [desc, setDesc] = React.useState(null);
  const [pronouns, setPronouns] = React.useState("");
  const [age, setAge] = React.useState(null);
  const [agePublicFlag, setAgePublicFlag] = React.useState(null);
  const [occupation, setOccupation] = React.useState(null);
  const [occupationPublicFlag, setOccupationPublicFlag] = React.useState(null);
  const [datePref, setDatePref] = React.useState(null);
  const [housematesBool, setHousematesBool] = React.useState("");
  const [petsPref, setPetsPref] = React.useState("");

  useEffect(() => {
    const id = location.pathname.split("/").pop() || authInfo?.profile?.id;
    setUserId(id);

    // Fetching all info of current user
    async function getUserData(userId) {
      const response = await getUserAllInfoById(userId);
      if (response?.data) {
        // console.log(response.data, "user data recd");
        setUserData(response.data);
        setName(response.data.name);
        setEmail(response.data.email.data);
        setEmailPublicFlag(response.data.email.isPublic.toString());
        setDesc(response.data.desc ?? null);
        setPronouns(response.data.pronoun);
        setAge(response.data.age.data);
        setAgePublicFlag(response.data.age.isPublic.toString());
        setOccupation(response.data.occupation.data);
        setOccupationPublicFlag(response.data.occupation.isPublic.toString());
        setDatePref(new Date(response.data.preferredMoveInDate).toISOString().substring(0, 10));
        setHousematesBool(response.data.isLookingForFlatmate);
        setPetsPref(response.data.preferPet);
      }
    }
    getUserData(id);
  }, [userId, location, authInfo]);

  // Updating info of current user
  const updateUserData = async () => {
    userData.email.isPublic = emailPublicFlag === "true" ?? null;
    userData.pronoun = pronouns === "" ? null : pronouns;
    userData.age.data = age === "" ? null : parseInt(age);
    userData.age.isPublic = agePublicFlag === "true" ?? null;
    userData.occupation.data = occupation === "" ? null : occupation;
    userData.occupation.isPublic = occupationPublicFlag === "true" ?? null;
    userData.preferredMoveInDate = datePref === "" ? null : new Date(datePref);
    userData.isLookingForFlatmate = housematesBool === "" ? null : housematesBool === "true";
    userData.preferPet = petsPref === "" ? null : petsPref === "true";
    userData.preferredMoveInDate = userData.preferredMoveInDate.toISOString() ?? null;
    userData.updatedAt = new Date().toISOString();
    // console.log(userData, "user data upd");

    const response = await updateUser(userData, userData._id);
    if(response?.error) {
      toast({
        title: "Failed",
        description: response?.error,
        status: "error",
        position: "top-right",
      });
    } else {
      toast({
        title: "Success",
        description: "Successfully updated user profile",
        status: "success",
        position: "top-right",
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
            <Avatar size="2xl" name={name} />
            <VStack spacing={5} align="left" pl={50} w="100%">
              <Heading>{name}</Heading>
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
                      defaultValue={email}
                      w="full"
                      isDisabled
                    />
                    <RadioGroup
                      colorScheme={"blue"}
                      value={emailPublicFlag}
                      onChange={setEmailPublicFlag}
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
                    value={pronouns}
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
                  <FormLabel w="50%">Age</FormLabel>
                  <VStack w="50%" align={"left"} spacing={5}>
                    <Input
                      type="number"
                      placeholder="Enter your age..."
                      defaultValue={age}
                      w="full"
                      onChange={(e) => setAge(e.target.value)}
                    />
                    <RadioGroup
                      colorScheme={"blue"}
                      value={agePublicFlag}
                      onChange={setAgePublicFlag}
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
                      defaultValue={occupation}
                      w="full"
                      onChange={(e) => setOccupation(e.target.value)}
                    />
                    <RadioGroup
                      colorScheme={"blue"}
                      value={occupationPublicFlag}
                      onChange={setOccupationPublicFlag}
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
                    defaultValue={datePref}
                    w="50%"
                    onChange={(e) => setDatePref(e.target.value)}
                  />
                </HStack>
              </FormControl>
              <FormControl id="housematesBool">
                <HStack>
                  <FormLabel w="50%">Looking for Housemates</FormLabel>
                  <Select
                    placeholder="Select option"
                    value={housematesBool}
                    w="50%"
                    onChange={(e) => setHousematesBool(e.target.value)}
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
                    value={petsPref}
                    w="50%"
                    onChange={(e) => setPetsPref(e.target.value)}
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
  );
}

export default EditCustomerProfilePage;