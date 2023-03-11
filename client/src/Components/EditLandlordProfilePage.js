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
import React, { useEffect } from "react";
import NavBar from "./NavBar";
import LandlordViewCard from "./LandlordViewCard";
import house1 from "../img/house1.jpg";
import { useLandlordAuth } from "../Components/auth/context/hookIndex";
import { getLandlordInfoById } from "../services/landlordApis";
import { getListingByLandlordId } from "../services/listingApis";
import { getAverageRatingByListingId } from "../services/ratingApis";

function EditLandlordProfilePage() {
  const { landlordInfo } = useLandlordAuth();
  const landlordId = landlordInfo.profile?.id;
  const [landlordData, setLandlordInfo] = React.useState(null);
  const [listingsInfo, setListingsInfo] = React.useState(null);

  const [name, setName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [desc, setDesc] = React.useState(null);
  const [pronouns, setPronouns] = React.useState(null);
  const [age, setAge] = React.useState(null);
  const [phone, setPhone] = React.useState(null);

  useEffect(()=>{
    async function getLandlordInfo(landlordId) {
      const response = await getLandlordInfoById(landlordId);
      if(response?.data) {
        setLandlordInfo(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setDesc(response.data.introduction);
        setPronouns(response.data.pronoun);
        setAge(response.data.age);
        setPhone(response.data.phoneNo);
      }
    }

    async function getListingMetadata(listingId) {
      const response = await getAverageRatingByListingId(listingId);
      if (response?.data && response.data.length>0) {
        return response;
      }
    }

    async function getListingsInfo(landlordId) {
      const response = await getListingByLandlordId(landlordId);
      // console.log(response.data);
      if(response?.data && response.data.length>0) {
        response.data.forEach(async listing => {
          const response1 = await getListingMetadata(listing._id);
          if (response1) {
            listing["rating"] = response1.data[0].averageRating ?? 0;
            listing["reviewCount"] = response1.data[0].reviewCount ?? 0;
          }
        });
        setListingsInfo(response.data);
      }
    }
    getLandlordInfo(landlordId);
    getListingsInfo(landlordId);
  }, [landlordId]);

  let tempLandlordData = {  // NEED TO GET DYNAMIC USER DATA FROM LOCATION PROPS
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
  // const [desc, setDesc] = React.useState(landlordData.introduction ?? null);
  // const [pronouns, setPronouns] = React.useState(landlordData.pronoun ?? null);
  // const [age, setAge] = React.useState(landlordData.age ?? null);
  // const [phone, setPhone] = React.useState(landlordData.phoneNo ?? null);

  const updateLandlordData = async () => {
    landlordData.introduction = desc === "" ? null : desc;
    landlordData.pronoun = pronouns === "" ? null : pronouns;
    landlordData.age = age === "" ? null : parseInt(age);
    landlordData.phoneNo = phone === "" ? null : phone;
    landlordData.updatedAt = new Date().toISOString();
    // console.log(landlordData, "landlord data");

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
            <Avatar size="2xl" name={name} />
            <VStack spacing={5} align="left" pl={50} w="100%">
              <Flex>
                <Heading mr={5}>{name}</Heading>
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
                    defaultValue={email}
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
            <Box mt={10}>
              {/* <LandlordViewCard></LandlordViewCard> */}
              {listingsInfo?.map((listing, ind) => (
                <Box key={ind}>
                  <LandlordViewCard ard src={listing}>
                    {" "}
                  </LandlordViewCard>
                  <br/>
                </Box>
              ))}
              {/* <LandlordViewCard ard src={tempListing}>
                {" "}
              </LandlordViewCard> */}
              {/* All listings go here */}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default EditLandlordProfilePage;
