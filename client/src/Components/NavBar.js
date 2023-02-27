import {
    Box,
    HStack,
    Image,
    IconButton,
    Flex,
    useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import logoImg from '../img/logo.jpg'
import logoTxt from '../img/rease.jpg'
import emptyHeart from '../img/heart.jpg'

const NavBar = ({ profileURL }) => {
    const navigate = useNavigate();

    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                    <IconButton
                        width='50px'
                        icon={<Image width='50px' objectFit='cover' src={logoImg} alt="logo" />}
                        onClick={() => {
                            navigate("/landingPage");
                        }}
                    />


                </Flex>

                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                    <IconButton
                        height='20px'
                        width='120px'
                        icon={<Image width='120px' objectFit='cover' src={logoTxt} alt="logo" />}
                        onClick={(e) => {
                            navigate("/landingPage");
                        }}
                    />


                </Flex>

                <HStack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}>
                    <IconButton
                        height='30px'
                        icon={<Image width='40px' objectFit='cover' src={emptyHeart} alt="wishilist" />}
                    />
                    <IconButton
                        borderRadius='full'
                        boxSize='50px'
                        icon={<Image borderRadius='full' boxSize='50px' objectFit='cover' src={profileURL} alt="profile" />}
                        onClick={(e) => {
                            navigate("/editCustomerProfilePage");
                        }}
                    />
                </HStack>
            </Flex>

        </Box>
    )
}

export default NavBar;