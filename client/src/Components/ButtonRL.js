import React, { useState } from "react";
import { Flex, Button, Box } from "@chakra-ui/react";

export default function Buttons() {
  const [activeButton, setActiveButton] = useState(1);

  const handleButtonClick = (buttonNum) => {
    setActiveButton(buttonNum);
  };

  return (
    <Flex
      justify="space-between"
      align="center"
      width="200px"
      margin="auto"
      py={5}
    >
      <Button
        fontFamily="Inter"
        fontWeight="700"
        fontSize="18px"
        lineHeight="22px"
        bg={activeButton === 1 ? "#B0C4F9" : "white"}
        _hover={{}}
        _active={{ bg: "white" }}
        _focus={{ boxShadow: "none" }}
        className={`options ${activeButton === 1 ? "options-active" : ""}`}
        onClick={() => handleButtonClick(1)}
      >
        <Box fontFamily="Inter">Rent</Box>
      </Button>
      <Button
        fontFamily="Inter"
        fontWeight="700"
        fontSize="18px"
        lineHeight="22px"
        bg={activeButton === 2 ? "#B0C4F9" : "white"}
        _hover={{}}
        _active={{ bg: "white" }}
        _focus={{ boxShadow: "none" }}
        className={`options ${activeButton === 2 ? "options-active" : ""}`}
        onClick={() => handleButtonClick(2)}
      >
        <Box fontFamily="Inter">Lease</Box>
      </Button>
    </Flex>
  );
}
