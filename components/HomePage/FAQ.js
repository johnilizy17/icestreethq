import React, { useState } from "react";
import { Box, Text, Flex, Slide, useDisclosure } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

const FAQContent = ({ title, content }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box borderBottom="1px solid #7d7e81">
      <Flex
        justifyContent="space-between"
        p="40px 0"
        onClick={() => onToggle()}
        cursor="pointer"
      >
        <Text
          fontSize={["12px", "14px", "20px"]}
          lineHeight={["20px", "25px", "30px"]}
          fontWeight="600"
          color="#7d7e81"
        >
          {title}
        </Text>
        <Box color="#7d7e81">{!isOpen ? <AddIcon /> : <MinusIcon />} </Box>
      </Flex>      
        <Box pos="relative" maxH={isOpen?"320px":"0px"}  transition="max-height 0.6s ease-out" overflow="hidden">
        <Slide direction="bottom" in={isOpen} style={{ zIndex: 10, position:"relative" }}>
          <Text
            fontSize={["10px", "14px", "15px"]}
            lineHeight={["20px", "22px", "25px"]}
            fontWeight="500"
              color="#7d7e81"
            pb="20px"
          >
            {content}
          </Text>
        </Slide>
        </Box>
    </Box>
  );
};
const FAQ = ({ faqData, show }) => {
  return (
    <Box
      bgImage="url(/brand/works-bg.png)"
      pb="1rem"
      bgRepeat="no-repeat"
      bgSize="100% 100%"
    >
      {!show && (
        <Text
          fontSize={["25px", "35px", "40px"]}
          lineHeight={["35px", "45px", "50px"]}
          fontWeight="700"
          color="#7d7e81"
          textAlign="center"
        >
          Freqently asked questions
        </Text>
      )}
      <Flex justifyContent="center" m="50px auto 100px auto">
        <Box w={["100%", "80%", "60%"]}>
          {faqData.map((item, index) => {
            return <FAQContent key={index} title={item.title} content={item.content} />;
          })}
        </Box>
      </Flex>
    </Box>
  );
};

export default FAQ;
