import {
  Box,
  HStack,
  Image,
  IconButton,
  Flex,
  useColorModeValue,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../img/logo.jpg";
import logoTxt from "../img/rease.jpg";
import emptyHeart from "../img/heart.jpg";

// Setting isLoggedIn Status
import { useAuth } from "../Components/auth/context/hookIndex";
import { getUserAllInfoById } from "../services/userApis";

const NavBar = ({ profileURL }) => {
  const { authInfo, handleLogout } = useAuth();
  const { isLoggedIn } = authInfo;

  const navigate = useNavigate();
  const [userData, setUserData] = React.useState(null);

  useEffect(() => {
    async function getUserData() {
      if (isLoggedIn) {
        const response = await getUserAllInfoById(authInfo.profile.id);
        if (response?.data) {
          // console.log(response.data);
          setUserData(response.data);
        }
      }
    }
    getUserData();
  }, []);

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <IconButton
            width="50px"
            icon={
              <Image width="50px" objectFit="cover" src={logoImg} alt="logo" />
            }
            onClick={(e) => {
              window.location.href = "/landing";
            }}
          />
        </Flex>

        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <IconButton
            height="20px"
            width="120px"
            icon={
              <Image width="120px" objectFit="cover" src={logoTxt} alt="logo" />
            }
            onClick={(e) => {
              window.location.href = "/landing";
            }}
          />
        </Flex>

        <HStack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <IconButton
            height="30px"
            icon={
              <Image
                width="40px"
                objectFit="cover"
                src={emptyHeart}
                alt="wishilist"
              />
            }
            onClick={(e) => {
              window.location.href = "/wishlist";
            }}
          />

          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"md"} src={profileURL} />
              </MenuButton>
              <MenuList>
                {/* User Authentication */}
                {isLoggedIn ? (
                  <div>
                    <MenuItem
                      onClick={(e) => {
                        // route to profile page
                        // window.location.href = '/customer/me';
                        navigate("/customer/me", {
                          state: {
                            userInfo: userData ?? null,
                          },
                        });
                      }}
                    >
                      Profile
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={handleLogout}>Log out</MenuItem>
                  </div>
                ) : (
                  <MenuItem
                    onClick={(e) => {
                      // route to user login
                      window.location.href = "/auth/signin";
                    }}
                  >
                    User Login
                  </MenuItem>
                )}

                {/* Landlord Authentication */}
                {isLoggedIn ? (
                  <MenuItem onClick={handleLogout}>Log out</MenuItem>
                ) : (
                  <MenuItem
                    onClick={(e) => {
                      // route to landlord login
                      window.location.href = "/landlord/signin";
                    }}
                  >
                    Landlord Login
                  </MenuItem>
                )}
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
    </Box>
  );
};

export default NavBar;
