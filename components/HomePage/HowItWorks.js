import { Badge, Box, Flex, Text, Img, SimpleGrid } from '@chakra-ui/react'
import React, { useEffect, useState } from "react";
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const exampleVariant = {
  visible: { skewY: -.5, transition: { type: "spring", duration: .9, ease: "linear", bounce: 0.3 } },
  hidden: { skewY: -3 },
}
//transition={{ ease: "easeOut", duration: 2 }}

const HowItWorks = () => {
  const control = useAnimation()
  const [ref, inView] = useInView()
  const [scrollPosition, setScrollPosition] = useState(0);
  const [percentageScroll, setPercentageScroll] = useState(0)

  useEffect(() => {
    if (inView) {
      control.start("visible")
    } else {
      control.start("hidden")
    }

  }, [control, inView])

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    if (scrollPosition > 526) {
      const number = scrollPosition - 526

      if (number < 40) {
        setPercentageScroll(number)
        console.log(number)

      }
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, [scrollPosition]);

  return (
    <Box bgImage='url(/brand/works-bg.png)' mt={['3rem', null, null, '5rem']} pb='8rem'
      bgRepeat='no-repeat' bgSize='100% 100%'
    >
      <Text
        fontWeight="500"
        fontSize={['25px', null, "40px"]}
        lineHeight={['35px', null, '50px']}
        color='#ffffff'
        p='30px 0'
      >How Does <span style={{ fontWeight: "700" }}><span className='gradient-text'>Business Spike</span> work ?</span></Text>
      <motion.div ref={ref} initial="hidden" animate={control} transform="skew(50deg)"
        variants={exampleVariant} >
        <SimpleGrid pos="relative" columns={[1, 1, 2, 2]} spacing={10}>
          <Box bg="#021E2A" pos="relative" border="1px solid rgba(87, 208, 239, 1)" borderRadius='18px' p={7}>
            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="#3030EC" className="bi bi-building" viewBox="0 0 16 16">
              <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
              <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z" />
            </svg>
            <Text
              lineHeight='25px'
              fontSize="20px"
              color="#ffffff"
              p='20px 0'
            >For Business</Text>
            <Text
              fontSize={['12px', null, "14px"]}
              lineHeight={['20px', null, "25px"]}
              fontWeight='400'
              color="#ffffff"
              h={["200px", "200px", "190px"]}
            >
              In today’s competitive market, businesses must continually seek innovative ways to attract and retain customers. Business Spike is here to transform the way you engage with your audience and drive growth, leveraging cutting-edge technology and strategic solutions to take your business to the next level.
            </Text>
            <Text
              fontSize={['12px', null, "14px"]}
              lineHeight={['20px', null, "25px"]}
              fontWeight='600'
              color="#ffffff"
              p='20px 0 20px 0'
              bottom={0}
              pos="absolute"
            >Learn more <ArrowForwardIcon /></Text>
          </Box>

          <Box bg="#021E2A" pos="relative" border="1px solid rgba(87, 208, 239, 1)" borderRadius='18px' p={7} >
            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="#3030EC" className="bi bi-megaphone-fill" viewBox="0 0 16 16">
              <path d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0zm-1 .724c-2.067.95-4.539 1.481-7 1.656v6.237a25 25 0 0 1 1.088.085c2.053.204 4.038.668 5.912 1.56zm-8 7.841V4.934c-.68.027-1.399.043-2.008.053A2.02 2.02 0 0 0 0 7v2c0 1.106.896 1.996 1.994 2.009l.496.008a64 64 0 0 1 1.51.048m1.39 1.081q.428.032.85.078l.253 1.69a1 1 0 0 1-.983 1.187h-.548a1 1 0 0 1-.916-.599l-1.314-2.48a66 66 0 0 1 1.692.064q.491.026.966.06" />
            </svg>
            <Text
              lineHeight='25px'
              fontSize="20px"
              color="#ffffff"
              p='20px 0'
            >For Content Creators</Text>
            <Text
              fontSize={['12px', null, "14px"]}
              lineHeight={['20px', null, "25px"]}
              fontWeight='400'
              color="#ffffff"
              h={["170px", "120px", "120px"]}
            >
              Do you want to improve your platform and increase your online visibility as a content creator? Join together with Business Spike to take advantage of fresh chances to interact with customers and expand your brand. Our state-of-the-art solutions are made to improve your content, draw in more followers, and increase interaction.
            </Text>
            <Text
              fontSize={['12px', null, "14px"]}
              lineHeight={['20px', null, "25px"]}
              fontWeight='600'
              color="#ffffff"
              p='20px 0 20px 0'
              pos="absolute"
              bottom={0}
            >Learn more <ArrowForwardIcon /></Text>
          </Box>
        </SimpleGrid>
      </motion.div>

    </Box>
  )
}

export default HowItWorks
