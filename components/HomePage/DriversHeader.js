import { Box, Flex, Text, Img, HStack, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { ArrowDownIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const DriversHeader = () => {

  const exampleVariant = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    },
    hidden: { opacity: 0, scale: 0 }
  };

  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);
  return (
    <Flex
      pos="relative"
      overflow="hidden"
      flexDir={["column", "column", "column", "row"]}
      w="100%"
      justifyContent="space-between"
      bg="#000"
      p={["90px 0 6rem 0", null, null, "90px 0 10rem 0"]}
    >
      <motion.Box
        variants={exampleVariant}
        animate={control}
        ref={ref}
        w="auto"
        initial="hidden"
      >
        <Text
          fontWeight="700"
          fontSize={["28px", "40px", "50px", "65px"]}
          lineHeight={["35px", "50px", "70px", "90px"]}
          color="#ffffff"
          textAlign={["center", null, null, "unset"]}
          m="30px 0"
          className="gradient-text"
          bgSize={["30%", null, null, "40%"]}
        >
          Business.
        </Text>
        <Text
          fontWeight="500"
          fontSize={["12px", "14px", "14px"]}
          lineHeight={["20px", "22px", "25px"]}
          color="#ffffff"
          textAlign={["center", null, null, "unset"]}
          maxW={["500px", null, null, "500px"]}
          m={["20px auto", null, null, "unset"]}
        >
      {"To help businesses achieve a"} {"`"}spike{"`"} {"in growth by creating a strong social and online presence through social media, here's a strategic approach I could implement:"}
        </Text>
        <Box w={["100%","100%","100%", "90%"]}>
          <Text
            fontWeight="900"
            fontSize={["12px", "14px", "14px"]}
            lineHeight={["20px", "22px", "25px"]}
            color="#ffffff"
            textAlign={["center", null, null, "unset"]}
            maxW={["500px", null, null, "500px"]}
            m={["20px auto", null, null, "unset"]}
          >
            1. Audit and Define Goals
          </Text>
          <Box mt="10px" color="#fff" ml="10px">
            <li>
              <span style={{ fontWeight: "900" }}> {"Business Analysis:"}</span> {"Understand the business's current social media presence, target audience, competitors, and unique selling points (USPs)."}
            </li>
            <li>
              <span style={{ fontWeight: "900" }}>Goal Setting:</span> Define clear objectives such as increasing brand awareness, driving website traffic, or boosting engagement
            </li>
            <li>
              <span style={{ fontWeight: "900" }}>Security</span> Our platform ensures that all activities provided to users will be reviewed and re-evaluated over a period of five months. At any point during this period, users will have the option to withdraw or request verification of tasks. Any task that does not meet our quality standards will be eligible for a full refund. We are committed to delivering excellence and maintaining the highest levels of user satisfaction.
            </li>
          </Box>
        </Box>
        <Stack
          pos="relative"
          direction={["column", "row"]}
          spacingX={["0px", "40px"]}
          align="center"
          justify={["center", "center", null, "unset"]}
          mt="30px"
        >
          <Box display="flex" cursor="pointer">
            <Flex
              pos="relative"
              alignItems="center"
              bg="#3030EC"
              borderRadius="24.5px"
              p={["13px 70px", "13px 40px"]}
              color="white"
              w={["200px", "180px"]}
            >
              <Text
                fontSize={["10px", null, "14px"]}
                lineHeight={["20px", null, "25px"]}
                pr={[2]}
              >
                Scroll down
              </Text>
              <Box
                _hover={{ top: "21px" }}
                transition="all 0.3s linear"
                top="18px"
                cursor="pointer"
                pos="absolute"
                right="20px"
                w="full"
              >
                <ArrowDownIcon
                  style={{ float: "right", marginRight: "10px" }}
                  h={{ base: "12px", lg: "20px" }}
                />
              </Box>
            </Flex>
          </Box>
          <Link href="/auth/login">
            <Box color="white" pos="relative" cursor="pointer">
              <Text
                display="inline-block"
                bg="linear-gradient(to right, #3030EC,#C937FB,#0DECFF,#FFA88E)"
                p="2.5px"
                borderRadius="24.5px"
              >
                <Text
                  p={["10px 50px", "10px 30px"]}
                  fontSize={["10px", null, "14px"]}
                  lineHeight={["20px", null, "25px"]}
                  bg="#000"
                  borderRadius="30.5px"
                  w="200px"
                  display="flex"
                  justify="center"
                  align="center"
                >
                  <Text ml={{ base: "0px", md: "5px" }}>
                    Get Start
                  </Text>
                  <Box
                    className="gradient-icon"
                    _hover={{ right: "10px" }}
                    transition="all 0.3s linear"
                    top="18px"
                    cursor="pointer"
                    pos="absolute"
                    w="full"
                  >
                    <ArrowForwardIcon
                      style={{ float: "right", marginRight: "24px" }}
                    />
                  </Box>{" "}
                </Text>
              </Text>
            </Box>
          </Link>
        </Stack>
      </motion.Box>
      <Box
        w={["100%", null, null, "170%"]}
        pos="relative"
        zIndex={50}
        mt={["100px", null, null, "unset"]}
      >
        <Img
          src="/brand/dots.png"
          alt="dots"
          pos={["", null, null, "absolute"]}
          right="0px"
          height="350px"
          w={["50%", null, null, "50%"]}
          objectFit="contain"
        />
        <Img
          src="/brand/business.png"
          alt="business"
          pos="absolute"
          w="150%"
          top="130px"
          zIndex={10}
        />
        <Img
          src="/icons/color.svg"
          alt="color"
          objectFit="contain"
          display={["none", null, null, "block"]}
          pos="absolute"
          w="50%"
          right={["80px", null, null, "auto"]}
          left="300px"
          bottom="-190px"
          className="color-tag"
        />
      </Box>
    </Flex>
  );
};

export default DriversHeader;
