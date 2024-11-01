import { Box, Center, Container, Flex, Heading, Image, Img, Square, Stack, Text } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import MenuLayout from '../../components/MenuLayout'

function Terms() {
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
                                Ice Street Terms and Conditions
                            </Center>
                        </Center>
                        <Container color="#7d7e81" maxW="container.lg">
                            <Box style={{ marginBottom: "20px", fontSize: "24px" }}>
                                Welcome to Ice Street! By accessing or using our website (www.icestreet.com), you agree to comply with and be bound by the following Terms and Conditions. Please read these carefully before using our services.
                            </Box>

                            <Box>
                                <p style={{ marginBottom: "20px", fontSize: "18px" }}>
                                    <Box fontWeight="700">
                                        About Us
                                    </Box>
                                    <Box>
                                        Ice Street is an online fashion retailer, offering apparel, footwear, accessories, and other fashion products for men, women, and children.
                                    </Box>
                                </p>
                                <p style={{ marginBottom: "20px", fontSize: "18px" }}>
                                    <Box fontWeight="700">
                                        Acceptance of Terms
                                    </Box>
                                    <Box>
                                        By using our website or purchasing products from Ice Street, you agree to be bound by these Terms and Conditions, as well as our Privacy Policy, Return Policy, and any other policies posted on our website. If you do not agree to these terms, please do not use our services.
                                    </Box>
                                </p>
                                <p style={{ marginBottom: "20px", fontSize: "18px" }}>
                                    <Box fontWeight="700">
                                        Order Acceptance
                                    </Box>
                                    <Box>
                                        After placing an order on Ice Street, you will receive an email confirmation. This acknowledgment does not mean that your order has been accepted. We reserve the right to cancel or refuse any order for reasons including, but not limited to, stock availability, pricing errors, or issues with your payment.
                                    </Box>
                                </p>
                                <p style={{ marginBottom: "20px", fontSize: "18px" }}>
                                    <Box fontWeight="700">
                                        Payment Methods
                                    </Box>
                                    <Box>
                                        We accept the following payment methods:

                                        <li>
                                            Credit/Debit Cards (Visa, MasterCard, American Express)
                                        </li>
                                        <li>
                                            PayPal
                                        </li>
                                        <li>
                                            Other payment methods as specified at checkout
                                        </li>
                                    </Box>
                                </p>
                                <p style={{ marginBottom: "20px", fontSize: "18px" }}>
                                    <Box fontWeight="700">
                                        Pricing and Availability
                                    </Box>
                                    <Box>
                                        All prices on the website are listed in [Insert currency] and are subject to change without notice. We strive to provide accurate product and pricing information, but errors may occur.
                                    </Box>
                                </p>
                                <p style={{ marginBottom: "20px", fontSize: "18px" }}>
                                    Join us on this journey, and let’s freeze the moment together. Own your look. Own your story. Own your place in the world.
                                </p>
                            </Box>
                        </Container>
                    </Box>
                </Flex>
            </MenuLayout>
        </>
    )
}

export default Terms;
