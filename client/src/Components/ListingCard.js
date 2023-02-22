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
} from "@chakra-ui/react";
import React from "react";
import heart from '../img/Union.svg'

const ListingCard = ({ src }) => {
    return (
        <LinkBox maxW='sm' borderWidth='1px' borderRadius={20} overflow='hidden'>
            <Image objectFit='fill' w="100%" src={src.img} alt="stock image" />
            <Box p='4'>
                <Box
                    color='#3062D5'
                    fontWeight='semibold'
                    letterSpacing='wide'
                    fontSize='s'

                >
                    ${src.rent}/month
                </Box>


                <Flex mt="1" justifyContent="space-between" alignContent="center">
                    <Box
                        mt='1'
                        fontWeight='bold'
                        lineHeight='tight'
                        noOfLines={1}
                        fontSize='3xl'
                    >
                        <LinkOverlay href='#'>
                            {src.name}
                        </LinkOverlay>

                    </Box>
                    <IconButton
                            bg="#FFFFFF"
                            icon={<Image src={heart} boxSize={30} alt="heart" />}
                            onClick={(e) => {
                                // cancel wishlist
                                e.preventDefault();
                            }}
                        />
                </Flex>

                <Box
                    color='#505050'
                    lineHeight='tight'
                    noOfLines={1}
                >
                    {src.address}
                </Box>

                <Divider borderColor='#DCDCDC' p={1} />

                <Box
                    color='gray.500'
                    fontWeight='semibold'
                    letterSpacing='wide'
                    fontSize='xs'
                    textTransform='uppercase'
                    ml='2'
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
    )
}

export default ListingCard;