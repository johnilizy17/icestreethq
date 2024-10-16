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
                                    {"Welcome to ICE STREET, where fashion meets attitude and style meets substance. Our brand is built on a simple yet powerful philosophy: `Freeze the Moment, Own the Look.` We believe that fashion is not just about what you wear but how you express yourself in the world."}
                                </p>
                                <p style={{ marginBottom: "20px", fontSize: "18px" }}>
                                    {"At ICE STREET, we are passionate about creating clothing that stands out and makes a statement. Our collections are designed for those who dare to be different, who embrace their individuality, and who see fashion as a form of self-expression. Whether you're hitting the streets or stepping out for a special occasion, our pieces are crafted to make you feel confident and unforgettable."}
                                </p>
                                <p style={{ marginBottom: "20px", fontSize: "18px" }}>
                                    {"We draw inspiration from urban culture, contemporary trends, and timeless classics, blending them into designs that are both cutting-edge and enduring. Every garment is meticulously crafted with attention to detail and quality, ensuring that you look and feel your best."}
                                </p>
                                <p style={{ marginBottom: "20px", fontSize: "18px" }}>
                                    {"Our mission is to provide you with more than just clothing; we aim to offer a platform for you to showcase your unique style and make your mark. At ICE STREET, we’re not just setting trends—we’re creating them."}
                                </p>
                                <p style={{ marginBottom: "20px", fontSize: "18px" }}>
                                    {"Join us on this journey, and let’s freeze the moment together. Own your look. Own your story. Own your place in the world."}
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
