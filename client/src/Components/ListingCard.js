import {
  Box,
  Image,
  Text,
  Divider,
  SimpleGrid,
  Flex,
  LinkBox,
  LinkOverlay,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import heart from '../img/Union.svg'
import emptyHeart from '../img/emptyHeartButton.svg'

const ListingCard = ({ src }) => {
    const [like, setLike] = React.useState("true");

    const navigate = useNavigate();

    const handleClick = () => {
        setLike(current => !current);
      };

    return (
        <LinkBox maxW='sm' borderWidth='1px' borderRadius={20} overflow='hidden'>
            <Image objectFit='fill' w="100%" src={src.img} alt="card image" />
            <Box p='4'>
                <HStack>
                    <Box
                        color='#3062D5'
                        fontWeight='bold'
                        letterSpacing='wide'
                        fontSize='xl'
                    >
                        ${src.rent}
                        <Box as='span' color='#3062D5' fontWeight='semibold' fontSize='sm'>
                            /month
                        </Box>
                    </Box>
                </HStack>

                <Flex justifyContent="space-between" alignContent="center">
                    <Box
                        fontWeight='bold'
                        lineHeight='tight'
                        noOfLines={1}
                        fontSize='3xl'
                    >
                        <LinkOverlay onClick={(e) => {
                            // navigate("/listing/me");
                            navigate(`/listing/${src._id}`);
                        }}> 
                        {/* route to detailed listing page */}
                            {src.name}
                        </LinkOverlay>

                    </Box>
                    <IconButton
                        bg="#FFFFFF"
                        icon={<Image src={like ? heart : emptyHeart} boxSize={30} alt="heart" />}
                        onClick={(e) => {
                            // cancel wishlist
                            e.preventDefault();
                            handleClick();
                        }}
                    />
                </Flex>

        <Box color="#505050" lineHeight="tight" noOfLines={1}>
          {src.address}
        </Box>

        <Divider borderColor="#DCDCDC" p={1} />

        <Box
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
          ml="2"
          p={3}
        >
          <SimpleGrid columns={3} spacing={5}>
            <Text>{src.bedrooms} beds</Text>
            <Text>{src.bathrooms} baths</Text>
            <Text>{src.squareFeet} sqft</Text>
          </SimpleGrid>
        </Box>
      </Box>
    </LinkBox>
  );
};

export default ListingCard;
