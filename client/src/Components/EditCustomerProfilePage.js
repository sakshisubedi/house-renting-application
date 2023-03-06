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
import NavBar from "./NavBar";

function EditCustomerProfilePage() {
  // need to get actual data from db

  let tempData = {
    name: "Pratyush Karmakar",
    email: "pkarmakar@ucsd.edu",
  };

  const [emailPublicFlag, setEmailPublicFlag] = React.useState("false");
  const [desc, setDesc] = React.useState(tempData.desc ?? null);
  const [pronouns, setPronouns] = React.useState(tempData.pronouns ?? null);
  const [age, setAge] = React.useState(tempData.age ?? null);
  const [agePublicFlag, setAgePublicFlag] = React.useState("false");
  const [occupation, setOccupation] = React.useState(
    tempData.occupation ?? null
  );
  const [occupationPublicFlag, setOccupationPublicFlag] = React.useState("false");
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
    tempData.emailPublicFlag = (emailPublicFlag === "true") ?? null;
    tempData.desc = desc === "" ? null : desc;
    tempData.pronouns = pronouns === "" ? null : pronouns;
    tempData.age = age === "" ? null : parseInt(age);
    tempData.agePublicFlag = (agePublicFlag === "true") ?? null;
    tempData.occupation = occupation === "" ? null : occupation;
    tempData.occupationPublicFlag = (occupationPublicFlag === "true") ?? null;
    tempData.datePref = datePref === "" ? null : Date(datePref);
    tempData.spacePref = spacePref === "" ? null : spacePref;
    tempData.housematesBool = housematesBool === "" ? null : (housematesBool === "true");
    tempData.roommatePrefs = roommatePrefs === "" ? null : roommatePrefs;
    tempData.petsPref = petsPref === "" ? null : (petsPref === "true");
    console.log(tempData, "user data");

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
              <FormControl id="email">
                <HStack>
                  <FormLabel w="50%">Email</FormLabel>
                  <VStack w="50%" align={"left"} spacing={5}>
                    <Input
                      type="email"
                      placeholder="johndoe@gmail.com"
                      defaultValue={tempData.email}
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
                    <option value="He/Him/His">He/Him/His</option>
                    <option value="She/Her/Hers">She/Her/Hers</option>
                    <option value="They/Them/Their">They/Them/Their</option>
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
