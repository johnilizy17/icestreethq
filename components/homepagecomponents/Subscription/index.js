import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast";
import { Box, Button, Center, Flex, Img, Input, Spinner, useToast } from '@chakra-ui/react';
import { COLORS } from '../../../services/theme/colors';
import { brevoApIkEY } from '../../../services/Variable';


export default function Subscription() {

    const [data, setData] = useState([]);
    const [value, setValue] = useState("")
    const [loading, setLoading] = useState(false)
    const toaster = useToast()


    async function handler(req, res) {
        setLoading(true)
        if (value.length > 5) {
            try {
                const response = await fetch('https://api.brevo.com/v3/contacts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'api-key': brevoApIkEY, // Store your Brevo API key in an environment variable
                    },
                    body: JSON.stringify({
                        email: value,
                        listIds:  [123456], // Replace with your list ID
                        updateEnabled: true, // To update contact if it already exists
                    }),
                });
                if (response.status === 201) {
                    toaster({
                        title: "Email",
                        description: "Email Successfully delivered",
                        status: "success"
                    })
                } else {
                    toaster({
                        title: "Email",
                        description: "Email already Exist",
                        status: "error"
                    })
                }
            } catch (error) {
                toaster({
                    title: "Email",
                    description: "An error occur",
                    status: "warning"
                })
            }
            setLoading(false)
        } else {
            setLoading(false)
            toaster({
                title: "Email",
                description: "Please enter a valid email",
                status: "warning"
            })
        }
    }


    return (
        <>

            <Box p={["20px", "20px", "20px", "30px"]} pb="80px">
                <Center borderRadius={["8px", "16px", "24px"]} p={["26px", "28px", "28px", "48px"]} bg="#C3DFEE" h="auto" w="full">
                    <Center zIndex={1} h="full" w="full" flexDir="column">
                        <Box textAlign="center" fontWeight="700" p="10px" fontSize={["24px", "24px", "24px", "48px"]} >
                            GET 10% OFF YOUR FIRST ORDER                        </Box>
                        <Box fontWeight="400" textAlign="center" fontSize={["12px", "12px", "12px", "16px"]}>
                            Sign up to our newsletter and be the first to know about our launches, exclusive discounts, special offers, and more!
                        </Box>
                        <Flex flexDir={["column", "column", "column", "row"]} w={["100%", "100%", "100%", "50%"]} borderRadius="10px" mt={["15px", "15px", "18px", "36px"]} h={["auto", "auto", "auto", "50px"]} pos="relative">
                            <Input
                                value={value}
                                bg={COLORS.white}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder='Enter your Email'
                                mr={["0px", "0px", "0px", "12px"]}
                                w="full" h="50px" p="10px" borderColor="white" />
                            <Button
                                display={["none", "none", "none", "flex"]}
                                isLoading={loading}
                                isDisabled={loading}
                                onClick={() => handler()}
                                p="12px 24px"
                                colorScheme='blackAlpha'
                                // onClick={() => { SearchProduct2() }}
                                bg={COLORS.black} h="50px">
                                Subscribe Now
                            </Button>
                            <Button
                                display={["flex", "flex", "flex", "none"]}
                                isLoading={loading}
                                isDisabled={loading}
                                onClick={() => handler()}
                                mt="20px"
                                colorScheme='blackAlpha'
                                // onClick={() => { SearchProduct2() }}
                                bg={COLORS.black} h="50px">
                                Subscribe Now
                            </Button>
                        </Flex>

                    </Center>
                </Center>
            </Box>
            <Center mt="30px" flexDir={["column", "column", "column", "row"]} alignItems={"self-start"}  >
                <Center flexDir="column">
                    <svg width="26" height="32" viewBox="0 0 26 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.6667 1V12.6667H24.6667L11.3333 31V19.3333H1.33334L14.6667 1Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <Box mt="22px" fontWeight="700" fontSize="24px" textAlign="center">
                        Express Delivery
                    </Box>
                    <Box w={["100%", "100%", "100%", "350px"]} textAlign="center" p={["16px", "16px", "16px", "12px"]}>
                        We prioritize speed and efficiency with our express delivery service, ensuring that your package reaches its destination swiftly
                    </Box>
                </Center>
                <Center mt={["30px", "30px", "30px", "0px"]} flexDir="column">
                    <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.66667 16.6667C2.20833 20.8867 4.80167 24.635 8.33333 26.6667M28.3333 13.3337C27.9257 10.4007 26.5651 7.68309 24.4611 5.59948C22.357 3.51588 19.6263 2.18186 16.6895 1.80291C13.7526 1.42397 10.7727 2.02113 8.20867 3.5024C5.64464 4.98367 3.63875 7.26688 2.5 10.0003M1.66667 3.33333V10H8.33333M15 20H18.3333C18.7754 20 19.1993 20.1756 19.5118 20.4882C19.8244 20.8007 20 21.2246 20 21.6667V23.3333C20 23.7754 19.8244 24.1993 19.5118 24.5118C19.1993 24.8244 18.7754 25 18.3333 25H16.6667C16.2246 25 15.8007 25.1756 15.4882 25.4882C15.1756 25.8007 15 26.2246 15 26.6667V28.3333C15 28.7754 15.1756 29.1993 15.4882 29.5118C15.8007 29.8244 16.2246 30 16.6667 30H20M25 20V23.3333C25 23.7754 25.1756 24.1993 25.4882 24.5118C25.8007 24.8244 26.2246 25 26.6667 25H28.3333M30 20V30" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <Box mt="22px" fontWeight="700" fontSize="24px" textAlign="center">
                        Free Return
                    </Box>
                    <Box w={["100%", "100%", "100%", "350px"]} textAlign="center" p={["16px", "16px", "16px", "12px"]}>
                        {"We offer hassle-free returns at no extra cost, giving you peace of mind with every purchase."}
                    </Box>
                </Center>
                <Center mt={["30px", "30px", "30px", "0px"]} flexDir="column">
                    <svg width="32" height="26" viewBox="0 0 32 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 9.66683H31M7.66667 18.0002H7.68333M14.3333 18.0002H17.6667M1 6.3335C1 5.00741 1.52678 3.73564 2.46447 2.79796C3.40215 1.86028 4.67392 1.3335 6 1.3335H26C27.3261 1.3335 28.5979 1.86028 29.5355 2.79796C30.4732 3.73564 31 5.00741 31 6.3335V19.6668C31 20.9929 30.4732 22.2647 29.5355 23.2024C28.5979 24.14 27.3261 24.6668 26 24.6668H6C4.67392 24.6668 3.40215 24.14 2.46447 23.2024C1.52678 22.2647 1 20.9929 1 19.6668V6.3335Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <Box mt="22px" fontWeight="700" fontSize="24px" textAlign="center">
                        Flexible Payment
                    </Box>
                    <Box w={["100%", "100%", "100%", "350px"]} textAlign="center" p={["16px", "16px", "16px", "12px"]}>
                        {"We provide flexible payment solutions to suit your needs, allowing you to choose from a variety of methods."}
                    </Box>
                </Center>
            </Center>
        </>
    )
}