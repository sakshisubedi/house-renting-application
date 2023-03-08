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
import React from "react";
import { updateUser } from "../services/userApis";
import NavBar from "./NavBar";

function EditCustomerProfilePage() {
  // need to get actual data from db

  let userData = { // NEED TO GET DYNAMIC USER DATA FROM LOCATION PROPS
    email: {
      isPublic: true,
      data: "abottrill2@unesco.org",
    },
    age: {
      isPublic: true,
      data: 25,
    },
    occupation: {
      isPublic: true,
      data: "Compensation Analyst",
    },
    _id: "63ffd80035d9bd7fb39d9fa7",
    name: "Ashton Bottrill",
    isVerified: true,
    pronoun: "He/Him",
    preferredMoveInDate: "2023-04-05T07:00:00.000Z",
    preferPet: true,
    isLookingForFlatmate: false,
    profilePicture: null,
    createdAt: "2023-03-01T22:56:00.991Z",
    updatedAt: "2023-03-01T22:56:00.991Z",
  };

  const [emailPublicFlag, setEmailPublicFlag] = React.useState(userData.email.isPublic.toString());
  const [desc, setDesc] = React.useState(userData.desc ?? null);
  const [pronouns, setPronouns] = React.useState(userData.pronoun ?? null);
  const [age, setAge] = React.useState(userData.age.data ?? null);
  const [agePublicFlag, setAgePublicFlag] = React.useState(userData.age.isPublic.toString());
  const [occupation, setOccupation] = React.useState(
    userData.occupation.data ?? null
  );
  const [occupationPublicFlag, setOccupationPublicFlag] =
    React.useState(userData.occupation.isPublic.toString());
  const [datePref, setDatePref] = React.useState(new Date(userData.preferredMoveInDate).toISOString() ?? null);
  const [spacePref, setSpacePref] = React.useState(userData.spacePref ?? null);
  const [housematesBool, setHousematesBool] = React.useState(
    userData.isLookingForFlatmate ?? null
  );
  const [roommatePrefs, setRoommatePrefs] = React.useState(
    userData.roommatePrefs ?? null
  );
  const [petsPref, setPetsPref] = React.useState(userData.preferPet ?? null);
  // console.log(userData)
  const updateUserData = async () => {
    userData.email.isPublic = emailPublicFlag === "true" ?? null;
    // userData.desc = desc === "" ? null : desc;
    userData.pronoun = pronouns === "" ? null : pronouns;
    userData.age.data = age === "" ? null : parseInt(age);
    userData.age.isPublic = agePublicFlag === "true" ?? null;
    userData.occupation.data = occupation === "" ? null : occupation;
    userData.occupation.isPublic = occupationPublicFlag === "true" ?? null;
    userData.preferredMoveInDate = datePref === "" ? null : new Date(datePref);
    // userData.spacePref = spacePref === "" ? null : spacePref;
    userData.isLookingForFlatmate =
      housematesBool === "" ? null : housematesBool === "true";
    // userData.roommatePrefs = roommatePrefs === "" ? null : roommatePrefs;
    userData.preferPet = petsPref === "" ? null : petsPref === "true";
    userData.preferredMoveInDate = userData.preferredMoveInDate.toISOString() ?? null;
    userData.updatedAt = new Date().toISOString();
    console.log(userData, "user data");

    const response = await updateUser(userData, userData._id); // NEED TO ENTER DYNAMIC USER ID
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
        description: "Successfully updated user profile",
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
            <Avatar size="2xl" name={userData.name} src={null} />
            <VStack spacing={5} align="left" pl={50} w="100%">
              <Heading>{userData.name}</Heading>
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
                      defaultValue={emailPublicFlag}
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
                      defaultValue={agePublicFlag}
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
                      defaultValue={occupationPublicFlag}
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
                    {/* <FormHelperText>
                      E.g. Two months, one year, etc.
                    </FormHelperText> */}
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
              <FormControl id="desiredSpace">
                <HStack>
                  <VStack w="50%" align="left">
                    <FormLabel>Desired Space</FormLabel>
                    <FormHelperText>
                      Number of rooms your new place will ideally have/number of
                      rooms you’d like to have.
                    </FormHelperText>
                  </VStack>
                  <Textarea
                    type="text"
                    placeholder="Two bedroom, One bathroom..."
                    defaultValue={spacePref}
                    w="50%"
                    onChange={(e) => setSpacePref(e.target.value)}
                  />
                </HStack>
              </FormControl>
              <FormControl id="housematesBool">
                <HStack>
                  <FormLabel w="50%">Looking for Housemates</FormLabel>
                  <Select
                    placeholder="Select option"
                    defaultValue={housematesBool}
                    w="50%"
                    onChange={(e) => setHousematesBool(e.target.value)}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                    {/* <option value="No preference">No preference</option> */}
                  </Select>
                </HStack>
              </FormControl>
              <FormControl id="roommatePref">
                <HStack>
                  <VStack w="50%" align="left">
                    <FormLabel>Roommate Preferences</FormLabel>
                    <FormHelperText>
                      E.g. Gender, cleanliness, noise, etc.
                    </FormHelperText>
                  </VStack>
                  <Textarea
                    type="text"
                    placeholder="No preference..."
                    defaultValue={roommatePrefs}
                    w="50%"
                    onChange={(e) => setRoommatePrefs(e.target.value)}
                  />
                </HStack>
              </FormControl>
              <FormControl id="petsBool">
                <HStack>
                  <FormLabel w="50%">Open to having pets</FormLabel>
                  <Select
                    placeholder="Select option"
                    defaultValue={petsPref}
                    w="50%"
                    onChange={(e) => setPetsPref(e.target.value)}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                    {/* <option value="No preference">No preference</option> */}
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
