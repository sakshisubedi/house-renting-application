/*
 * Filename: InterestedPeopleList.js
 * 
 * This file defines the modal that displays a list of user profiles of
 * the users who have wishlisted the corresponding listing. It displays
 * the users' names, age (if selected to be public), occupation (if public)
 * and gender. There is also a View All button that will display the
 * DetailedProfile view of the selected user.
 */

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Box,
    Stack,
    useDisclosure,
    VStack,
    HStack,
    Avatar,
    Spacer,
    Text,
    Divider,
    Flex,
    Center,
} from '@chakra-ui/react'
import { BiHide } from "react-icons/bi";
import { React, Lorem } from "react";
import DetailedProfile from './DetailedProfile';

const InterestedPeopleList = ({wishlistedPeople, l}) => {
    // let wishlistedPeople = [
    //     {
    //         email: {
    //             isPublic: false,
    //             data: "kbillingsley0@house.gov",
    //         },
    //         age: {
    //             isPublic: false,
    //             data: 27,
    //         },
    //         occupation: {
    //             isPublic: false,
    //             data: "Help Desk Technician",
    //         },
    //         _id: "63ffd73c35d9bd7fb39d9fa3",
    //         name: "Kora Billingsley",
    //         isVerified: true,
    //         pronoun: "She/Her",
    //         preferredMoveInDate: "2023-03-30T07:00:00.000Z",
    //         preferPet: false,
    //         isLookingForFlatmate: false,
    //         profilePicture: null,
    //         createdAt: "2023-03-01T22:52:44.079Z",
    //         updatedAt: "2023-03-01T22:52:44.079Z",
    //     },
    //     {
    //         email: {
    //             isPublic: false,
    //             data: "cwhichelow1@usnews.com",
    //         },
    //         age: {
    //             isPublic: false,
    //             data: 28,
    //         },
    //         occupation: {
    //             isPublic: false,
    //             data: "Pharmacist",
    //         },
    //         _id: "63ffd7cb35d9bd7fb39d9fa5",
    //         name: "Chico Whichelow",
    //         isVerified: true,
    //         pronoun: "He/Him",
    //         preferredMoveInDate: "2023-04-15T07:00:00.000Z",
    //         preferPet: false,
    //         isLookingForFlatmate: false,
    //         profilePicture: null,
    //         createdAt: "2023-03-01T22:55:07.161Z",
    //         updatedAt: "2023-03-01T22:55:07.161Z",
    //     },
    //     {
    //         email: {
    //             isPublic: true,
    //             data: "abottrill2@unesco.org",
    //         },
    //         age: {
    //             isPublic: true,
    //             data: 25,
    //         },
    //         occupation: {
    //             isPublic: true,
    //             data: "Compensation Analyst",
    //         },
    //         _id: "63ffd80035d9bd7fb39d9fa7",
    //         name: "Ashton Bottrill",
    //         isVerified: true,
    //         pronoun: "He/Him",
    //         preferredMoveInDate: "2023-04-05T07:00:00.000Z",
    //         preferPet: true,
    //         isLookingForFlatmate: false,
    //         profilePicture: null,
    //         createdAt: "2023-03-01T22:56:00.991Z",
    //         updatedAt: "2023-03-01T22:56:00.991Z",
    //     },
    //     {
    //         email: {
    //             isPublic: false,
    //             data: "cfearnill3@yale.edu",
    //         },
    //         age: {
    //             isPublic: true,
    //             data: 24,
    //         },
    //         occupation: {
    //             isPublic: true,
    //             data: "Graphic Designer",
    //         },
    //         _id: "63ffd86235d9bd7fb39d9fa9",
    //         name: "Chris Fearnill",
    //         isVerified: true,
    //         pronoun: "He/Him",
    //         preferredMoveInDate: null,
    //         preferPet: false,
    //         isLookingForFlatmate: false,
    //         profilePicture: null,
    //         createdAt: "2023-03-01T22:57:38.273Z",
    //         updatedAt: "2023-03-01T22:57:38.273Z",
    //     },
    //     {
    //         email: {
    //             isPublic: true,
    //             data: "mlording4@comsenz.com",
    //         },
    //         age: {
    //             isPublic: true,
    //             data: 24,
    //         },
    //         occupation: {
    //             isPublic: true,
    //             data: "Computer Systems Analyst I",
    //         },
    //         _id: "63ffd8be35d9bd7fb39d9fab",
    //         name: "Morgen Lording",
    //         isVerified: true,
    //         pronoun: "He/Him",
    //         preferredMoveInDate: "2023-03-25T07:00:00.000Z",
    //         preferPet: false,
    //         isLookingForFlatmate: false,
    //         profilePicture: null,
    //         createdAt: "2023-03-01T22:59:10.446Z",
    //         updatedAt: "2023-03-01T22:59:10.446Z",
    //     },
    // ];

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Stack>
            <Button
                colorScheme={"blue"}
                variant={"link"}
                isDisabled={!l}
                onClick={onOpen}>
                View All
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size={"3xl"} isCentered={"true"}>
                <ModalOverlay />
                <ModalContent>
                    <Center>
                        <Box p='2.5'>
                            <ModalHeader fontSize = "3xl">People who have wishlisted this</ModalHeader>
                        </Box>
                    </Center>

                    <Box p='1'>
                        <Divider borderWidth={"3px"}/>
                    </Box>

                    <ModalCloseButton />
                    <ModalBody>
                        <Box p='1'>
                            <VStack
                                spacing={1}
                                h={500}
                                overflowY={"auto"}
                                overflowX={"hidden"}
                            >
                                {wishlistedPeople.map((person, ind) => (
                                    <Box w={"full"} key={ind}>
                                        <Box key={ind} w={"full"} p='3'>
                                            <HStack px={2}>
                                                <Avatar name={person.name} size={"lg"} />
                                                <Spacer />
                                                <VStack
                                                    fontSize={"sm"}
                                                    spacing={2}
                                                    align={"left"}
                                                    w={"70%"}
                                                >
                                                    <Text blur={"md"} fontWeight={"bold"} fontSize={"lg"}>{person.name}</Text>
                                                    <Divider borderWidth={"1.5px"} />
                                                    <HStack>
                                                        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                                                            {person.age ? (
                                                                <Text>{person.age}</Text>
                                                            ) : (
                                                                <BiHide size={"1.5rem"} />
                                                            )}
                                                        </Flex>
                                                        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                                                            <Text>{person.pronoun}</Text>
                                                        </Flex>
                                                        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                                                            {person.occupation ? (
                                                                <Text>{person.occupation}</Text>
                                                            ) : (
                                                                <BiHide size={"1.5rem"} />
                                                            )}
                                                        </Flex>
                                                    </HStack>

                                                </VStack>
                                                <Spacer />
                                                <DetailedProfile p={person}></DetailedProfile>
                                            </HStack>
                                        </Box>
                                        <Divider borderWidth={"2px"} />
                                    </Box>

                                ))}
                            </VStack>
                        </Box>


                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Stack>
    )
}

export default InterestedPeopleList;
