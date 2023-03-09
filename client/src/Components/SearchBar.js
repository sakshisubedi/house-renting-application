import React, { useEffect, useState } from "react";
import { Input, IconButton, HStack, Image } from "@chakra-ui/react";
import search from "../img/search.jpg";
import { useNavigate } from "react-router-dom";
import { getListingBySearchParameter } from "../services/listingApis";

export default function SearchBar(props) {
  const navigate = useNavigate();

  const handleInputChange = async (event) => {
    props.search(event.target.value);
  };

  // const handleSearchSubmit = (event) => {
  //   event.preventDefault();
  //   // Perform search and display results
  //   console.log(`Searching for "${searchQuery}"...`);
  //   // Perform search and display results
  // };

  return (
    <>
      <HStack
        borderRadius="20px"
        borderWidth="2px"
        borderStyle="none"
        color="blue"
        w="734.93px"
        h="83px"
        border="1px solid darkgrey"
      >
        <Input
          id="search-input"
          type="search"
          placeholder="Enter postal code"
          // color="lavender"
          border="none"
          fontSize="25px"
          outline="none"
          color="black"
          borderRadius="20px"
          // p={10}
          w="734.93px"
          h="83px"
          onChange={handleInputChange}
        />
        <IconButton
          width="50px"
          icon={
            <Image width="50px" objectFit="cover" src={search} alt="logo" />
          }
          // onClick={handleSearchSubmit}
          onClick={(e) => {
            navigate("/searchResult");
        }}
        />
      </HStack>
    </>
  );
}

// <Flex py={10}>
//         <Box
//           borderRadius="20px"
//           borderWidth="2px"
//           // borderColor="darkgray"
//           borderStyle="none"
//           color="blue"
//           w="630px"
//           h="83px"
//           border="1px solid darkgray"
//           borderRadius="15px"
//           // ml={10}
//         >
//           <HStack>
//             <Box
//               w="630px"
//               h="83px"
//               border="1px solid darkgray"
//               borderRadius="15px"
//               ml={10}
//               color="green"
//               borderStyle="none"
//             >
//               <Input
//                 id="search-input"
//                 type="search"
//                 placeholder="Location"
//                 // h="100%"
//                 color="lavender"
//                 border="none"
//                 fontSize="25px"
//                 outline="none"
//                 // px={4}
//                 w="630px"
//                 h="83px"
//               />
//             </Box>

//  <Input
//               justifyContent={"flex-start"}
//               id="search-input"
//               type="text"
//               value={searchQuery}
//               onChange={handleInputChange}
//               placeholder="Enter address or zip code..."
//               size="5g"
//               borderStyle="none"
//               borderRadius="20px"
//               h="100%"
//               px={80}
//               fontSize="30"
//             />
//             <IconButton
//               width="50px"
//               icon={
//                 <Image width="50px" objectFit="cover" src={search} alt="logo" />
//               }
//               onClick={handleSearchSubmit}
//       />
//     </HStack>
//   </Box>
// </Flex>
