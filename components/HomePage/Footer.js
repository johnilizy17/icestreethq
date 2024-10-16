import { Box, Center, Flex, HStack, Img, Text } from "@chakra-ui/react";
import React from "react";
import { FaFacebookF, FaPinterest } from "react-icons/fa";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import Link from "next/link";

const Footer = () => {
  return (
    <Box bg="#000" p="20px 0">
      <Center>
        <Box h={["60px", "100px"]}>
          <Img src="/brand/steam.svg" w="100%" h="100%" />
        </Box>
      </Center>

      <Box
        h="1px"
        bg="rgba(137, 65, 255, 0.26)"
        m="0 auto"
        w={["95%", null, "80%"]}
      ></Box>
      <Flex
        p={["20px 30px", "50px 30px", "50px 130px"]}
        flexDir={["column", "row"]}
        justify={["center", "start"]}
        align={["center", "start"]}
      >
        <Link href="/business">
          <Box w="50px" display="flex" justifyContent="center" alignItems="center" mt={["40px", "0px"]} mr={["0px", "30px"]}>
            <Text
              fontSize="14.56px"
              lineHeight="25px"
              fontWeight="700"
              cursor="pointer"
              fontFamily="THICCCBOI"
              color="#ffffff"
              textAlign="center"
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
          </Box>
        </Link>
        <Link href="/creators">
          <Box w="80px" display="flex" justifyContent="center" alignItems="center" mt={["40px", "0px"]} mr={["0px", "30px"]}>
            <Text
              fontSize="14.56px"
              lineHeight="25px"
              fontWeight="700"
              cursor="pointer"
              fontFamily="THICCCBOI"
              color="#ffffff"
              textAlign="center"
              transition="width 1s ease"
              display="flex"
              w="40px"
              animation="animate 1s linear forwards"
              background="transparent"
              _hover={{
                borderBottom: "1px solid #fff",
                w: "70px"
              }}
            >
               Creators
            </Text>
          </Box>
        </Link>
        <Link href="/FAQs">
          <Box w="30px" display="flex" justifyContent="center" alignItems="center" mt={["40px", "0px"]}>
            <Text
              fontSize="14.56px"
              lineHeight="25px"
              fontWeight="700"
              cursor="pointer"
              fontFamily="THICCCBOI"
              color="#ffffff"
              textAlign="center"
              ml={{ base: "-5px", md: "0px" }}
              transition="width 1s ease"
              display="flex"
              w="15px"
              animation="animate 1s linear forwards"
              background="transparent"
              _hover={{
                borderBottom: "1px solid #fff",
                w: "30px"
              }}
            >
              FAQs
            </Text>
          </Box>
        </Link>

        <Text flex={1} />
        <Center mt={["70px", "0px"]} ml={["-10px", "0px"]}>
          <Box
            w="16px"
            h="16px"
            fontSize={["12px", null, "13px"]}
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg="#57D0EF"
            color="black"
            mr={{ base: "30px", md: "30px" }}
          >
            <AiFillInstagram />
          </Box>
          <Box
            w="16px"
            h="16px"
            fontSize={["12px", null, "13px"]}
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg="#57D0EF"
            color="black"
          >
            <AiOutlineTwitter />
          </Box>
        </Center>
      </Flex>
      <Text
        fontFamily="THICCCBOI"
        textAlign="center"
        color="rgba(255, 255, 255, 0.42)"
        fontSize={["12px", null, "14px"]}
        lineHeight="20px"
        p="20px 0"
      >
        © 2024 Spike All right reserved.
      </Text>
    </Box>
  );
};

export default Footer;
