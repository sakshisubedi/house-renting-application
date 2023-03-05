import {
  Box,
  Image,
  Text,
  Divider,
  SimpleGrid,
  Flex,
  LinkBox,
  LinkOverlay,
  VStack,
  Button,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import heart from "../img/Union.svg";
import star from "../img/rating_star.jpg";
import delete1 from "../img/delete.jpg";
import edit from "../img/edit.jpg";
const LandlordViewCard = ({ src }) => {
  return (
    <LinkBox
      borderRadius={15}
      border="1px solid #F1F1F1"
      borderWidth="2px"
      p="4"
      w="100%"
      backgroundColor="#F1F1F1"
      overfill="hide"
    >
      {/* Content goes here */}
      <Box
        alignItems="center"
        w="100%"
        justifyContent={"space-between"}
        margin="auto"
      >
        <Flex alignItems="center">
          {/*Image on Listing Card */}
          <Box w="20%" h="10%" borderRadius={15} pr={4}>
            <Image w="100%" src={src.img} alt="card image" borderRadius={15} />
          </Box>
          <Box w="80%" h="10%">
            <Flex
              justifyContent={"space-between"}
              margin="auto"
              alignItems={"flex-start"}
            >
              {/*Card name(Listing)*/}
              <Box fontWeight="extrabold" fontSize="2xl" color="black">
                {src.name}
              </Box>
              {/*rent*/}
              <Flex>
                <Box
                  color="#3062D5"
                  fontWeight="bold"
                  letterSpacing="wide"
                  fontSize="2xl"
                >
                  ${src.rent}
                  <Box
                    as="span"
                    color="#3062D5"
                    fontWeight="semibold"
                    fontSize="md"
                  >
                    /month
                  </Box>
                </Box>
              </Flex>
              {/*Rating*/}
              <Box>
                <Flex alignItems="center">
                  <Image src={star} width={6} height={6} />
                  <Box>
                    <Flex justifyContent="space-evenly" alignItems="center">
                      <Box fontWeight={"Bold"} fontSize="xl">
                        {src.rating}
                      </Box>
                      <Box px={1}>
                        <p>({src.reviewCount} reviews)</p>
                      </Box>
                    </Flex>
                  </Box>
                </Flex>
              </Box>
              {/*Delete Listing button*/}
              <Flex mx={5}>
                <Box mx={3}>
                  <IconButton
                    icon={
                      <Image
                        width="100%"
                        objectFit="cover"
                        src={edit}
                        alt="logo"
                      />
                    }
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  />
                </Box>
                <Box>
                  <IconButton
                    width="5px"
                    icon={
                      <Image
                        width="100%"
                        objectFit="cover"
                        src={delete1}
                        alt="logo"
                      />
                    }
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  />
                </Box>
              </Flex>
            </Flex>
            <Box color="#505050" lineHeight="tight" noOfLines={1}>
              {src.address}
            </Box>
            <Flex alignItems={"center"}>
              <Box
                mt={7}
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="sm"
                textTransform="uppercase"
                w="80%"
                mr={20}
              >
                <SimpleGrid columns={5} spacing={1} w="100%">
                  <Box>BedRooms</Box>
                  <Box>Bathrooms</Box>
                  <Box>SquareFeet</Box>
                  <Box>Pets</Box>
                  <Box>Parameter 5</Box>

                  <Text>{src.bedrooms} beds</Text>
                  <Text>{src.bathrooms} baths</Text>
                  <Text>{src.squareFeet} sqft</Text>
                  <Text>{src.petFriendly}</Text>
                  <Text> Value</Text>
                </SimpleGrid>
              </Box>
              <Box mt={7} w="8%">
                <Button
                  variant="outline"
                  colorScheme="blue"
                  w="100%"
                  backgroundColor="white"
                  border="2px"
                  borderRadius={10}
                >
                  View
                </Button>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </LinkBox>
  );
};

export default LandlordViewCard;
