import { Box, Button, Center, Flex, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Lottie from 'react-lottie';
import Empty from '../../assets/lottie/success.json'
import { cashFormat2 } from "../../components/utils/cashFormat";

export default function Successful_payment() {

    const [data, setData] = useState<any>({
        phone: "",
        total: 0,
        shipping: 0,
        package_id: "",
        country: ""
    })
    const { query } = useRouter()
    const router = useRouter()
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    const [loading, setLoading] = useState(true)
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Empty,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };


    useEffect(() => {
        if (query.city) {
            setData(query)
            setLoading(false)
        }
    }, [query.city && query.city])
    return (
        <>
            {
                loading ?
                    <Center h="400px" w="full">
                        <Spinner size="xl" />
                    </Center>
                    :
                    <Center flexDir={"column"} p={["20px", "20px", "20px", "30px"]}>

                        <Lottie options={defaultOptions}
                            height={300}
                            width={300} />
                        <Box w="full" padding="10px" border="1px solid gray" borderBottom="none">
                            <Flex>
                                <Center justifyContent={"start"} h="50px" w="full">
                                    Phone Number:
                                </Center>
                                <Center justifyContent={"start"} h="50px" w="full">
                                    {data.phone}
                                </Center>
                            </Flex>
                        </Box>
                        <Box w="full" padding="10px" border="1px solid gray" borderBottom="none">
                            <Flex>
                                <Center justifyContent={"start"} h="50px" w="full">
                                    Amount:
                                </Center>
                                <Center justifyContent={"start"} h="50px" w="full">
                                    {cashFormat2(data.total,data.country)}
                                </Center>
                            </Flex>
                        </Box>
                        <Box w="full" padding="10px" border="1px solid gray" borderBottom="none">
                            <Flex>
                                <Center justifyContent={"start"} h="50px" w="full">
                                    Shipping Fee and transaction fee:
                                </Center>
                                <Center justifyContent={"start"} h="50px" w="full">
                                    {cashFormat2(data.shipping,data.country)}
                                </Center>
                            </Flex>
                        </Box>
                        <Box w="full" padding="10px" border="1px solid gray" borderBottom="none">
                            <Flex>
                                <Center justifyContent={"start"} h="50px" w="full">
                                    Transaction_id:
                                </Center>
                                <Center justifyContent={"start"} h="50px" w="full">
                                    {data.package_id}
                                </Center>
                            </Flex>
                        </Box>
                        <Box w="full" padding="10px" border="1px solid gray" borderBottom="none">
                            <Flex>
                                <Center justifyContent={"start"} h="50px" w="full">
                                    Country:
                                </Center>
                                <Center justifyContent={"start"} h="50px" w="full">
                                    {data.country}
                                </Center>
                            </Flex>
                        </Box>
                        <Box w="full" padding="10px" border="1px solid gray">
                            <Flex>
                                <Center justifyContent={"start"} h="50px" w="full">
                                    Date:
                                </Center>
                                <Center justifyContent={"start"} h="50px" w="full">
                                    {day}-{month}-{year}
                                </Center>
                            </Flex>
                        </Box>
                        <Button onClick={() => router.push("/active-order")} colorScheme="blackAlpha" bg="black" mt="30px" >
                            Go to dashboard
                        </Button>
                    </Center>
            }
        </>

    )
}