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

const DetailedProfile = ({ p }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Stack>
            <Button
                colorScheme={"blue"}
                variant={"outline"}
                size={"xs"}
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
                                        {/* <Input mr={5} defaultValue={tempData.name ?? null} placeholder="Enter First and Last Name here..."  /> */}
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

                                    <Box px={5}>
                                        <SimpleGrid columns={2} spacingX='60px' spacingY='3px'>

                                            <Box>
                                                <HStack>
                                                    <Box
                                                        fontWeight='medium'
                                                        letterSpacing='wide'
                                                        fontSize='lg'
                                                    >
                                                        Email:
                                                    </Box>
                                                    {p.email.isPublic ? (
                                                        <Box as='span' fontWeight='normal' fontSize='md'>
                                                            {' '}{p.email.data}
                                                        </Box>
                                                    ) : (<BiHide />)}
                                                </HStack>
                                            </Box>

                                            <Box
                                                fontWeight='medium'
                                                letterSpacing='wide'
                                                fontSize='lg'
                                            >
                                                Pronouns:
                                                <Box as='span' fontWeight='normal' fontSize='md'>
                                                    {' '}{p.pronoun}
                                                </Box>
                                            </Box>

                                            <Box>
                                                <HStack>
                                                    <Box
                                                        fontWeight='medium'
                                                        letterSpacing='wide'
                                                        fontSize='lg'
                                                    >
                                                        Age:
                                                    </Box>
                                                    {p.age.isPublic ? (
                                                        <Box as='span' fontWeight='normal' fontSize='md'>
                                                            {' '}{p.age.data}
                                                        </Box>
                                                    ) : (<BiHide />)}
                                                </HStack>
                                            </Box>

                                            <Box>
                                                <HStack>
                                                    <Box
                                                        fontWeight='medium'
                                                        letterSpacing='wide'
                                                        fontSize='lg'
                                                    >
                                                        Occupation:
                                                    </Box>
                                                    {p.occupation.isPublic ? (
                                                        <Box as='span' fontWeight='normal' fontSize='md'>
                                                            {' '}{p.occupation.data}
                                                        </Box>
                                                    ) : (<BiHide />)}
                                                </HStack>
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

                                    <Box px={5}>
                                        <SimpleGrid columns={1} spacingY='3px'>

                                            <Box
                                                fontWeight='medium'
                                                letterSpacing='wide'
                                                fontSize='lg'
                                            >
                                                Preferred Move in Date:
                                                <Box as='span' fontWeight='normal' fontSize='md'>
                                                    {' '}{p.preferredMoveInDate}
                                                </Box>
                                            </Box>

                                            <Box
                                                fontWeight='medium'
                                                letterSpacing='wide'
                                                fontSize='lg'
                                            >
                                                Desired Space:
                                                <Box as='span' fontWeight='normal' fontSize='md'>
                                                    {' '}2 bedrooms, 1 bathrooms
                                                </Box>
                                            </Box>

                                            <Box
                                                fontWeight='medium'
                                                letterSpacing='wide'
                                                fontSize='lg'
                                            >
                                                Looking for Roommates:
                                                <Box as='span' fontWeight='normal' fontSize='md'>
                                                    {' '}{p.isLookingForFlatmate ? "Yes" : "No"}
                                                </Box>
                                            </Box>

                                            <Box
                                                fontWeight='medium'
                                                letterSpacing='wide'
                                                fontSize='lg'
                                            >
                                                Roommates Preferences:
                                                <Box as='span' fontWeight='normal' fontSize='md'>
                                                    {' '}...
                                                </Box>
                                            </Box>

                                            <Box
                                                fontWeight='medium'
                                                letterSpacing='wide'
                                                fontSize='lg'
                                            >
                                                Open to Having Pets:
                                                <Box as='span' fontWeight='normal' fontSize='md'>
                                                    {' '}{p.preferPet ? "Yes" : "No"}
                                                </Box>
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
