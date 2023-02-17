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
} from "@chakra-ui/react";
import React from "react";

function EditCustomerProfilePage() {
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
  const [age, setAge] = React.useState(tempData.age ?? null);
  const [occupation, setOccupation] = React.useState(
    tempData.occupation ?? null
  );
  const [datePref, setDatePref] = React.useState(tempData.datePref ?? null);
  const [spacePref, setSpacePref] = React.useState(tempData.spacePref ?? null);
  const [housematesBool, setHousematesBool] = React.useState(
    tempData.housematesBool ?? null
  );
  const [roommatePrefs, setRoommatePrefs] = React.useState(
    tempData.roommatePrefs ?? null
  );
  const [petsPref, setPetsPref] = React.useState(tempData.petsPref ?? null);

  const updateUserData = () => {
    tempData.desc = desc === "" ? null : desc;
    tempData.pronouns = pronouns === "" ? null : pronouns;
    tempData.age = age === "" ? null : age;
    tempData.occupation = occupation === "" ? null : occupation;
    tempData.datePref = datePref === "" ? null : datePref;
    tempData.spacePref = spacePref === "" ? null : spacePref;
    tempData.housematesBool = housematesBool === "" ? null : housematesBool;
    tempData.roommatePrefs = roommatePrefs === "" ? null : roommatePrefs;
    tempData.petsPref = petsPref === "" ? null : petsPref;
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
              <Heading>{tempData.name}</Heading>
              {/* <Input mr={5} defaultValue={tempData.name ?? null} placeholder="Enter First and Last Name here..."  /> */}
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
              <FormControl id="age">
                <HStack>
                  <FormLabel w="50%">Age</FormLabel>
                  <Input
                    type="number"
                    placeholder="Enter your age..."
                    defaultValue={age}
                    w="50%"
                    onChange={(e) => setAge(e.target.value)}
                  />
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
                  <Input
                    type="text"
                    placeholder="Enter your occupation..."
                    defaultValue={occupation}
                    w="50%"
                    onChange={(e) => setOccupation(e.target.value)}
                  />
                </HStack>
              </FormControl>
              <FormControl id="moveDate">
                <HStack>
                  <VStack w="50%" align="left">
                    <FormLabel>Preferred Move-in Date</FormLabel>
                    <FormHelperText>
                      E.g. Two months, one year, etc.
                    </FormHelperText>
                  </VStack>
                  <Input
                    type="text"
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
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="No preference">No preference</option>
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
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="No preference">No preference</option>
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
