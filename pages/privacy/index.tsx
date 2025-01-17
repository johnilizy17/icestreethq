import { Box, Center, Container, Flex, Heading, Image, Img, ListItem, OrderedList, Square, Stack, Text } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import MenuLayout from '../../components/MenuLayout'

function Privacy() {
    return (
        <>
            <Head>
                <title>Ice Street - Privacy</title>
                <meta property="og:title" content="Ice Street - Privacy" key="title" />
                <meta
                    property="og:description"
                    content="Ice Street"
                    key="description"
                />
            </Head>
            <MenuLayout menu={false} category={false}>

                <Flex minH="100vh" pt="40px" bg="#FFF" flexDir="column">
                    <Box flex="1" h="full">
                        <Center pos="relative" overflow="hidden" h={["200px", "400px", "400px", "400px"]} mb="40px" color="#fff" fontWeight="900" fontSize="60px">
                            <Img src="banner/aboutUs.png" objectPosition={"center"} objectFit="cover" />
                            <Center top="0px" w="full" pos="absolute" h="full">
                                Privacy Policy.
                            </Center>
                        </Center>
                        <Container color="#7d7e81" maxW="container.lg">
                            <OrderedList>
                                <ListItem fontWeight="800" fontSize="18px"> About this Notice</ListItem>
                                <Box mt="10px" mb="10px">
                                    This Privacy Notice provides information on how Ice Street collects and processes your personal data when you visit our website or mobile applications. It sets out what we do with your personal data and how we keep it secure and explains the rights that you have in relation to your personal data.
                                </Box>
                                <ListItem fontWeight="800" fontSize="18px"> Who We Are</ListItem>
                                <Box mt="10px" mb="10px">
                                    <Box mt="10px" mb="10px">
                                        Ice Street is the leading pan-African e-commerce platform. Our platform consists of our marketplace, which connects sellers with consumers, our logistics service, which enables the shipment and delivery of packages from sellers to consumers, and our payment service, which facilitates transactions among participants active on our platform in selected markets.
                                    </Box>
                                    <Box mt="10px" mb="10px">
                                        This website and/or mobile app is operated by a member of the Ice Street group of companies, the ultimate holding company of which is Ice Street Technologies AG. Information on our subsidiaries can be found on our website.
                                    </Box>
                                    <Box mt="10px" mb="10px">
                                        Any personal data provided or collected by Ice Street is controlled by the subsidiary that the website and/or mobile app relates to.
                                    </Box>
                                </Box>
                                <ListItem fontWeight="800" fontSize="18px">The Data We Collect About You?</ListItem>
                                <Box mt="10px" mb="10px">
                                    Personal data means any information that can be used to identify directly or indirectly a specific individual. We collect your personal data in order to provide tailored products and services and in order to analyse and continually improve our products and services. We may collect, use, store and transfer different kinds of personal data for marketing and personal data optimization purposes. Ice Street also uses Google Digital Marketing to propose targeted offers for certain products and services to our customers.
                                </Box>
                                <ListItem fontWeight="800" fontSize="18px">
                                    Cookies and other Identifiers
                                </ListItem>
                                <Box mt="10px" mb="10px">
                                    A cookie is a small file of letters and numbers that we put on your computer, mobile phone or tablet if you agree. Cookies allow us to distinguish you from other users of our website and mobile applications, which helps us to provide you with an enhanced browsing experience. For more information about cookies and how we use them, please read our Cookie Notice:
                                </Box>
                                <ListItem fontWeight="800" fontSize="18px"> Data Security</ListItem>
                                <Box mt="10px" mb="10px">
                                    We have put in place security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed.
                                </Box>
                                <Box mt="10px" mb="10px">
                                    In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.
                                </Box>
                                <Box mt="10px" mb="10px">
                                    We have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so
                                </Box>
                                <ListItem fontWeight="800" fontSize="18px">Data Controllers & Contact</ListItem>
                                <Box pb="80px" mt="10px" mb="10px">
                                    {"If you have any questions or concerns about Ice Street's Privacy Notice or you are looking for more information on how we process your personal data, or wish to exercise your legal rights in respect of your personal data, please contact the Data Privacy Officer by email at  compliance.alert@icestreet. ."}
                                </Box>
                            </OrderedList>
                        </Container>
                    </Box>
                </Flex>
            </MenuLayout>
        </>
    )
}

export default Privacy;
