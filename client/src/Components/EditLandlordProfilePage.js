/*
 * Filename: EditLandlordProfilePage.js
 * 
 * This file defines the authenticated landlord's profile page, and allows them to update
 * their own information at their discretion. Unlike the customer's profile page, this profile
 * page requires mainly basic information and contact information of the landlord, and also 
 * displays their listings, so a user of the app can see all the active listings this 
 * landlord has open.
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
import { useAuth } from "../Components/auth/context/hookIndex";
import { getLandlordInfoById } from "../services/landlordApis";
import { getListingByLandlordId } from "../services/listingApis";
import { getAverageRatingByListingId } from "../services/ratingApis";
import { useLocation } from "react-router-dom";

function EditLandlordProfilePage() {
  // Fetching auth info of logged in landlord
  const { authInfo } = useAuth();
  const location = useLocation();
  const [landlordId, setLandlordId] = React.useState(location.pathname.split("/").pop() || authInfo?.profile?.id);

  const [landlordInfo, setLandlordInfo] = React.useState(null);
  const [listingsInfo, setListingsInfo] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [desc, setDesc] = React.useState(null);
  const [pronouns, setPronouns] = React.useState(null);
  const [age, setAge] = React.useState(null);
  const [phone, setPhone] = React.useState(null);

  useEffect(()=>{
    const id = location.pathname.split("/").pop() || authInfo?.profile?.id;
    setLandlordId(id);

    // Fetching all info of current landlord
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
    getLandlordInfo(id);
  }, [landlordId, location, authInfo]);

  /**
   * Retrieves listing for given landlord id
   * @param {string} landlordId landlord id
   */
  async function getListingsInfo(landlordId) {
    const response = await getListingByLandlordId(landlordId);
    if(response?.data && response.data.length>0) {
      setListingsInfo(response.data);
    }
  }

  useEffect(()=>{
    // Fetching all listings of current landlord
    getListingsInfo(landlordId);
  }, [landlordId]);

  // Updating info of current landlord
  const updateLandlordInfo = async () => {
    landlordInfo.introduction = desc === "" ? null : desc;
    landlordInfo.pronoun = pronouns === "" ? null : pronouns;
    landlordInfo.age = age === "" ? null : parseInt(age);
    landlordInfo.phoneNo = phone === "" ? null : phone;
    landlordInfo.updatedAt = new Date().toISOString();
    // console.log(landlordInfo, "landlord data upd");

    const response = await updateLandlord(landlordInfo, landlordInfo._id);
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
                    updateLandlordInfo();
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
          {/* LISTINGS BOX */}
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
                  window.location.href = '/listing'
                }}
              >
                Add Listing
              </Button>
            </Flex>
            <Box mt={10}>
              {listingsInfo?.map((listing, ind) => (
                <Box key={ind}>
                  <LandlordViewCard ard src={listing} getListings={getListingsInfo}>
                    {" "}
                  </LandlordViewCard>
                  <br/>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default EditLandlordProfilePage;
