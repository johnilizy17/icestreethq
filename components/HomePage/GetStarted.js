import React from "react";
import { Flex, Text, Box, Img } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Link from 'next/link'
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useRouter } from "next/router";

const GetStarted = () => {


  const router = useRouter()
  const exampleVariant = {
    visible: { scale: 1.5, transition: { type: "spring", duration: 3, ease: "linear", bounce: 0.3 } },
    hidden: { scale: 0 },
  }

  const control = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      control.start("visible")
    } else {
      control.start("hidden")
    }

  }, [control, inView])

  return (
    <>
      <Box pos="relative">
        <Box
          bg="#000"
          p="60px 30px"
          pos="relative"
          display={["flex", "flex", "flex", "block"]}
          flexDir={[
            "column-reverse",
            "column-reverse",
            "column-reverse",
            "unset"
          ]}
        >

          <Box>
            <Text
              fontWeight="700"
              fontSize={["30px", "35px", "45px"]}
              lineHeight={["45px", "50px", "55px"]}
              textAlign="center"
              color="#ffffff"
              pb="20px"
            >
              Ready to get <span className="gradient-text">started?</span>
            </Text>
            <Text
              fontWeight="400"
              fontSize={["12px", null, "14px"]}
              lineHeight={["20px", null, "25px"]}
              textAlign="center"
              m="0 auto"
              maxW="550px"
              color="#ffffff"
              opacity="0.6"
            >
              {"We’re excited to announce our partnership with Lujara and LeadersHub, combining our expertise to offer unparalleled solutions for enhancing your business's online presence."}
              </Text>
            <Flex justifyContent="center" alignItems="center" cursor="pointer" m="20px 0">
              <Flex
                pos="relative"
                alignItems="center"
                bg="#3030EC"
                borderRadius="24.5px"
                w="180px"
                p="13px 35px"
                color="white"
                onClick={() => { router.push("/auth/login") }}
              >
                <Text
                  fontSize={["12px", null, "15px"]}
                  lineHeight={["20px", null, "25px"]}
                  pr={2}
                  ml="10px"
                  textAlign="center"
                >
                  Get Started{" "}
                </Text>
                <Box
                  _hover={{ right: "20px" }}
                  top="18px"
                  transition="all 0.3s linear"
                  w="120px"
                  cursor="pointer"
                  pos="absolute"
                >
                  <ArrowForwardIcon style={{ float: "right" }} />
                </Box>
              </Flex>
            </Flex>
          </Box>
         
        </Box>
        <Img
          src="/icons/icon2.svg"
          w={["10%", null, "unset"]}
          pos="absolute"
          top={["50%", null, null, "50%"]}
        />
      </Box>
    </>
  )
}

export default GetStarted
