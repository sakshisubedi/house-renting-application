import {
    Box,
    HStack,
    Image,
    IconButton,
    Flex,
    useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import logoImg from '../img/logo.jpg'
import logoTxt from '../img/rease.jpg'
import emptyHeart from '../img/heart.jpg'
// Setting isLoggedIn Status
import { useAuth } from "../Components/auth/context/hookIndex"
const NavBar = ({ profileURL }) => {
    const { authInfo, handleLogout } = useAuth();
    const { isLoggedIn } = authInfo;

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
                        onClick={(e) => {
                            e.preventDefault();
                            // route to landing page
                            window.location.href = '/landing';
                        }}
                    />


                </Flex>

                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                    <IconButton
                        height='20px'
                        width='120px'
                        icon={<Image width='120px' objectFit='cover' src={logoTxt} alt="logo" />}
                        onClick={(e) => {
                            e.preventDefault();
                            // route to landing page
                            window.location.href = '/landing';
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
                        onClick={(e) => {
                            // stay on same page
                            e.preventDefault();
                        }}
                    />
                    {/* Double click the profile icon to logout */}
                    {isLoggedIn ? (
                        <IconButton
                            borderRadius='full'
                            boxSize='50px'
                            icon={<Image borderRadius='full' boxSize='50px' objectFit='cover' src={profileURL} alt="profile" />}
                            onClick={handleLogout}
                        />
                    ) : (
                        <IconButton
                            borderRadius='full'
                            boxSize='50px'
                            icon={<Image borderRadius='full' boxSize='50px' objectFit='cover' src={profileURL} alt="profile" />}
                            onClick={(e) => {
                                // route to profile page
                                e.preventDefault();
                                window.location.href = '/auth/signin';
                            }}
                        />
                    )}
                </HStack>
            </Flex>

        </Box>
    )
}

export default NavBar;