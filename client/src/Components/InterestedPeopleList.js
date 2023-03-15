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

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Stack>
            <Button
                colorScheme={"blue"}
                variant={"link"}
                isDisabled={!l} // disable the "View All" button for visitor user
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
                                                <DetailedProfile p={person} l={l}></DetailedProfile>
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
