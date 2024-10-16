import React,{useState, useEffect} from "react";
import {
  Box,
  Img,
  Flex,
  Text,
  Center,
  HStack,
  Slide,
  useDisclosure
} from "@chakra-ui/react";
import { ArrowForwardIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [stored, setStored] = useState()
  useEffect(()=>{
    if (typeof window !== 'undefined') {
    setStored(localStorage.getItem('token'))
  }
},[stored])
  
  return (
    <>
      <Flex
        bg={{ base:"#000", md: "#000" }}
        pl={{ base: "10px", md: "60px" }}
        pr={{ base: "10px", md: "60px" }}
        h={{ base: "70px", md: "75px" }}
        align="center"
        pos="fixed"
        top="0%"
        left="0px"
        zIndex={90}
        w="full"
        mb="90px"
      >
        <Box flex={stored? { base: 1, md: 0.4 }: { base: 1, md: 0.34 }}>
          <Box w={{ base: "8em", md: "9em" }} h="100%">
            <Link href="/">
              <Img src="brand/awefun2-logo.svg" alt="logo" cursor="pointer" />
            </Link>
          </Box>
        </Box>
        <HStack
          spacing="50px"
          flex={stored?{ md: 0.6 }:{ md: 0.7 }}
          display={{ base: "none", md: "inherit" }}
        >
          <Box w="70px">
            {stored&&<Link href="/dashboard/driver/summary">
              <Text
                fontSize="14.56px"
                lineHeight="25px"
                color="#fff"
                fontWeight="700"
                cursor="pointer"
                transition="width 1s ease"
                display="flex"
                w="35px"
                animation="animate 1s linear forwards"
                background="transparent"
                _hover={{
                  borderBottom: "1px solid #fff",
                  w: "75px"
                }}
              >
                Dashboard
              </Text>
            </Link>}
          </Box>
          <Box w="50px">
            <Link href="/pricing">
              <Text
                fontSize="14.56px"
                lineHeight="25px"
                color="#fff"
                fontWeight="700"
                cursor="pointer"
                transition="width 1s ease"
                display="flex"
                w="30px"
                animation="animate 1s linear forwards"
                background="transparent"
                _hover={{
                  borderBottom: "1px solid #fff",
                  w: "50px"
                }}
              >
                Pricing
              </Text>
            </Link>
          </Box>
          <Box w="50px">
            <Link href="/business">
              <Text
                fontSize="14.56px"
                lineHeight="25px"
                color="#fff"
                fontWeight="700"
                cursor="pointer"
                transition="width 1s ease"
                display="flex"
                w="30px"
                animation="animate 1s linear forwards"
                background="transparent"
                _hover={{
                  borderBottom: "1px solid #fff",
                  w: "50px"
                }}
              >
                Business
              </Text>
            </Link>
          </Box>
          <Box w="50px">
            <Link href="/creators">
              <Text
                fontSize="14.56px"
                lineHeight="25px"
                color="#fff"
                fontWeight="700"
                cursor="pointer"
                transition="width 1s ease"
                display="flex"
                w="30px"
                animation="animate 1s linear forwards"
                background="transparent"
                _hover={{
                  borderBottom: "1px solid #fff",
                  w: "50px"
                }}
              >
                Creators
              </Text>
            </Link>
          </Box>
          <Box w="40px">
            <Link href="/FAQs">
              <Text
                fontSize="14.56px"
                lineHeight="25px"
                color="#fff"
                fontWeight="700"
                cursor="pointer"
                transition="width 1s ease"
                display="flex"
                w="20px"
                animation="animate 1s linear forwards"
                background="transparent"
                _hover={{
                  borderBottom: "1px solid #fff",
                  w: "40px"
                }}
              >
                FAQs
              </Text>
            </Link>
          </Box>
        </HStack>
        <Link href="/auth/login">
          <Flex
            alignItems="center"
            bg="#3030EC"
            borderRadius="24.5px"
            p="10px 30px"
            color="white"
            display={{ base: "none", md: "inherit" }}
          >
            <Center position="relative">
              <Text
                fontSize="12px"
                fontWeight="700"
                w="90px"
                lineHeight="25px"
                cursor="pointer"
                pr={2}
              >
                Sign In
              </Text>
              <Box
                transition="0.5s"
                _after={{ transition: "0.5s" }}
                position="absolute"
                cursor="pointer"
                right="0px"
                w="full"
                _hover={{ right: "-5px" }}
              >
                <ArrowForwardIcon style={{ float: "right" }} />
              </Box>
            </Center>
          </Flex>
        </Link>
        <Flex
          align="center"
          justify="center"
          display={{ md: "none", base: "inherit" }}
          cursor="pointer"
        >
          <Center>
            <Flex
              bg="linear-gradient(to right,#7f3982, #8941ff , #4758A0, #16929B,#444845)"
              h="38px"
              w="40px"
              align="center"
              justify="center"
              onClick={onToggle}
            >
              <Center>
                {!isOpen ? (
                  <HamburgerIcon h="30px" color="#fff" transition="1s" />
                ) : (
                  <CloseIcon h="10px" color="#fff" transition="1s" />
                )}
              </Center>
            </Flex>
          </Center>
        </Flex>
      </Flex>
      <Slide
        direction="top"
        bg="#00161f"
        in={isOpen}
        style={isOpen && { zIndex: 80, height: "80vh", top: "0" }}
      >
        <Flex
          p="40px"
          color="white"
          mt="4"
          bg="#00161f"
          h="80vh"
          justify="center"
          direction="column"
          align="center"
        >
         {stored&& <Link href="/dashboard/driver/summary">
            <Text
              fontSize="14.56px"
              lineHeight="25px"
              color="#fff"
              fontWeight="700"
              cursor="pointer"
              onClick={onToggle}
            >
              Dashboard
            </Text>
          </Link>}

          <Link href="/pricing">
            <Text
              fontSize="14.56px"
              lineHeight="25px"
              color="#fff"
              fontWeight="700"
              cursor="pointer"
              mt="33.76px"
              onClick={onToggle}
            >
              Pricing
            </Text>
          </Link>
          <Link href="/FAQs">
            <Text
              fontSize="14.56px"
              lineHeight="25px"
              color="#fff"
              fontWeight="700"
              cursor="pointer"
              mt="33.76px"
              onClick={onToggle}
            >
              FAQs
            </Text>
          </Link>
          <Link href="/business">
            <Flex
              alignItems="center"
              bg="#3030EC"
              borderRadius="24.5px"
              p="10px 20px"
              color="white"
              w="240px"
              align="center"
              justify="center"
              mt="33.76px"
              onClick={onToggle}
            >
              <Center position="relative">
                <Text
                  fontSize="12px"
                  fontWeight="700"
                  lineHeight="25px"
                  cursor="pointer"
                  pr={2}
                  mr="20px"
                >
                  Contact Us
                </Text>
                <Box
                  transition="0.5s"
                  _after={{ transition: "0.5s" }}
                  position="absolute"
                  cursor="pointer"
                  right="0px"
                  w="full"
                  _hover={{ right: "-5px" }}
                >
                  <ArrowForwardIcon style={{ float: "right", marginTop: -2 }} />
                </Box>
              </Center>
            </Flex>
          </Link>
        </Flex>
      </Slide>
    </>
  );
};

export default Navbar;
