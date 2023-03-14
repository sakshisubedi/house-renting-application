/*
 * Filename: DetailedProfile.js
 * 
 * This file defines a modal that displays the detailed information of 
 * another user. This modal appears upon clicking View on another user's
 * profile in the interested people list on a listing.
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
    Heading,
    FormControl,
    Textarea,
    useColorModeValue,
    SimpleGrid,
    Grid,
} from '@chakra-ui/react'
import { BiHide } from "react-icons/bi";
import { React } from "react";

const DetailedProfile = ({ p, l }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Stack>
            <Button
                colorScheme={"blue"}
                variant={"outline"}
                size={"xs"}
                isDisabled={!l} // disable the "View" button for visitor user
                onClick={onOpen}>
                View
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size={"3xl"} isCentered={"true"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <VStack align='flex-start'>
                            <Box mt={10} ml={50}>
                                <HStack spacing={3} mb={10}>
                                    <Avatar size="2xl" name={p.name} src={null} />
                                    <VStack spacing={3} align="left" pl={50} w="100%">
                                        <Heading>{p.name}</Heading>
                                        <Text
                                            fontWeight='semibold'
                                            fontSize='md'
                                        >
                                            Self intro...
                                        </Text>
                                    </VStack>
                                </HStack>
                            </Box>
                            <Divider borderWidth={"1.5px"} />
                        </VStack>
                    </ModalHeader>

                    <ModalCloseButton />
                    <ModalBody>

                        <VStack
                            spacing={4}
                            align='stretch'
                        >
                            <Box
                                border="2px"
                                borderColor="gray.300"
                                borderRadius={"2xl"}
                                p={7}
                            >
                                <VStack align='flex-start'>
                                    <Heading
                                        fontSize={'xl'}
                                    >
                                        Personal Info:
                                    </Heading>

                                    <Box px={5} mt={5}>
                                        <SimpleGrid columns={4} spacingX={"3rem"}>

                                            <Box>
                                                <VStack spacing={3}>
                                                    <Box
                                                        fontWeight='medium'
                                                        letterSpacing='wide'
                                                        fontSize='lg'
                                                    >
                                                        Email
                                                    </Box>
                                                    {p.email ? (
                                                        <Box as='span' fontWeight='normal' fontSize='md' textAlign={"center"}>
                                                            {' '}{p.email}
                                                        </Box>
                                                    ) : (<BiHide size={"1.5rem"} />)}
                                                </VStack>
                                            </Box>

                                            <Box>
                                                <VStack spacing={3}>
                                                    <Box
                                                        fontWeight='medium'
                                                        letterSpacing='wide'
                                                        fontSize='lg'
                                                    >
                                                        Pronouns
                                                    </Box>
                                                    <Box as='span' fontWeight='normal' fontSize='md' textAlign={"center"}>
                                                        {' '}{p.pronoun}
                                                    </Box>
                                                </VStack>
                                            </Box>
                                            

                                            <Box>
                                                <VStack spacing={3}>
                                                    <Box
                                                        fontWeight='medium'
                                                        letterSpacing='wide'
                                                        fontSize='lg'
                                                    >
                                                        Age
                                                    </Box>
                                                    {p.age ? (
                                                        <Box as='span' fontWeight='normal' fontSize='md' textAlign={"center"}>
                                                            {' '}{p.age}
                                                        </Box>
                                                    ) : (<BiHide size={"1.5rem"} />)}
                                                </VStack>
                                            </Box>

                                            <Box>
                                                <VStack spacing={3}>
                                                    <Box
                                                        fontWeight='medium'
                                                        letterSpacing='wide'
                                                        fontSize='lg'
                                                    >
                                                        Occupation
                                                    </Box>
                                                    {p.occupation ? (
                                                        <Box as='span' fontWeight='normal' fontSize='md' textAlign={"center"}>
                                                            {' '}{p.occupation}
                                                        </Box>
                                                    ) : (<BiHide size={"1.5rem"} />)}
                                                </VStack>
                                            </Box>
                                        </SimpleGrid>
                                    </Box>
                                </VStack>
                            </Box>

                            <Box
                                border="2px"
                                borderColor="gray.300"
                                borderRadius={"2xl"}
                                p={7}
                            >
                                <VStack align='flex-start'>
                                    <Heading
                                        fontSize={'xl'}
                                    >
                                        Renting Info:
                                    </Heading>

                                    <Box px={5} mt={5}>
                                        <SimpleGrid columns={2} spacingY='1rem' spacingX={"10rem"}>

                                            <Box
                                                fontWeight='medium'
                                                letterSpacing='wide'
                                                fontSize='lg'
                                            >
                                                Preferred Move in Date:
                                            </Box>
                                            <Box as='span' fontWeight='normal' fontSize='md'>
                                                {' '}{new Date(p.preferredMoveInDate).toDateString()}
                                            </Box>

                                            {/* <Box
                                                fontWeight='medium'
                                                letterSpacing='wide'
                                                fontSize='lg'
                                            >
                                                Desired Space:
                                            </Box>
                                            <Box as='span' fontWeight='normal' fontSize='md'>
                                                {' '}2 bedrooms, 1 bathrooms
                                            </Box> */}
                                            

                                            <Box
                                                fontWeight='medium'
                                                letterSpacing='wide'
                                                fontSize='lg'
                                            >
                                                Looking for Roommates:
                                            </Box>
                                            <Box as='span' fontWeight='normal' fontSize='md'>
                                                {' '}{p.isLookingForFlatmate ? "Yes" : "No"}
                                            </Box>

                                            {/* <Box
                                                fontWeight='medium'
                                                letterSpacing='wide'
                                                fontSize='lg'
                                            >
                                                Roommates Preferences:
                                            </Box>
                                            <Box as='span' fontWeight='normal' fontSize='md'>
                                                {' '}...
                                            </Box> */}
                                            

                                            <Box
                                                fontWeight='medium'
                                                letterSpacing='wide'
                                                fontSize='lg'
                                            >
                                                Open to Having Pets:
                                            </Box>
                                            <Box as='span' fontWeight='normal' fontSize='md'>
                                                {' '}{p.preferPet ? "Yes" : "No"}
                                            </Box>
                                           
                                        </SimpleGrid>
                                    </Box>
                                </VStack>
                            </Box>
                        </VStack>

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

export default DetailedProfile;
