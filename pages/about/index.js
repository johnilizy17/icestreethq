import { Box, Center, Container, Flex, Heading, Image, Img, Square, Stack, Text } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import MenuLayout from '../../components/MenuLayout'

function AboutUs() {
    return (
        <>
            <Head>
                <title>Awefun - About Us</title>
                <meta property="og:title" content="Awefun - About Us" key="title" />
                <meta
                    property="og:description"
                    content="Awefun"
                    key="description"
                />
            </Head>
            <MenuLayout menu={false} category={false}>

                <Flex minH="100vh" pt="40px" bg="#FFF" flexDir="column">
                    <Box flex="1" h="full">
                        <Center pos="relative" overflow="hidden" h={["200px", "400px", "400px", "400px"]} mb="40px" color="#fff" fontWeight="900" fontSize="60px">
                            <Img src="banner/aboutUs.png" objectPosition={"center"} objectFit="cover" />
                            <Center top="0px" w="full" pos="absolute" h="full">
                                About Us
                            </Center>
                        </Center>
                        <Container color="#7d7e81" maxW="container.lg">

                            <Box>
                                <p style={{ marginBottom: "20px", fontSize: "18px" }}>
                                    {"Ice Street is more than just a clothing brand; we’re a lifestyle. Our mission is to bring cutting-edge fashion and timeless style to individuals who appreciate quality and those who are radically unique. We cater to the fashion-forward, the trendsetters, and our collections include everything from casual, streetwear, to chic office wear, ensuring there's something for every occasion. Freeze The Moment, Own The Look, with every piece we create and treasure the memories forever."}
                                </p>
                                <p style={{ marginBottom: "20px", fontSize: "18px" }}>
                                    {"Each item in our collection is crafted with care, combining high-quality fabrics with meticulous design to deliver comfort and style. Because we believe that clothing should not only reflect who you are but also inspire who you want to become."}
                                </p>
                            </Box>
                        </Container>
                    </Box>
                </Flex>
            </MenuLayout>
        </>
    )
}

export default AboutUs;
