import Head from 'next/head'
import MenuLayout from '../../components/MenuLayout'
import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast";
import { Box, Button, Center, Flex, Grid, Img, Input, Spinner } from '@chakra-ui/react';
import Image from 'next/image';
import { COLORS } from '../../services/theme/colors';
import ProductDisplay from '../../components/homepagecomponents/Electronics/ProductDisplay';
import Lottie from 'react-lottie';
import Empty from '../../assets/lottie/empty.json'
import { getSearchResult } from '../../services/productService';
import { useRouter } from 'next/router';

export default function Home() {

    const [data, setData] = useState([]);
    const [value, setValue] = useState("")
    const [loading, setLoading] = useState(false)
    const [disabled, setDisable] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const { query } = useRouter()
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Empty,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    async function SearchProduct() {
        setDisable(false)
        setLoading(true);
        const result = await getSearchResult(value)
        setData(result)
        setLoading(false)
    }

    async function SearchProduct2() {
        setLoading(true);
        const result = await getSearchResult(value)
        setData(result)
        setLoading(false)
    }

    return (
        <>
            <Head>
                <title>Home</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#0dadf7" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Box bg={COLORS.white}>
                    <MenuLayout menu={false} category={false}>
                        <Box p={["20px", "20px", "20px", "30px"]}>
                            <Center borderRadius={["8px", "16px", "24px"]} p={["26px", "28px", "28px", "48px"]} bg="#EDEFEF" h="auto" w="full">
                                <Center zIndex={1} h="full" w="full" flexDir="column">
                                    <Box fontWeight="700" p="10px" fontSize={["24px", "24px", "24px", "48px"]} >
                                        Search Products
                                    </Box>
                                    <Box fontWeight="400" textAlign="center" fontSize={["12px", "12px", "12px", "16px"]}>
                                        Be the first to know when we have new stocks and collections
                                    </Box>
                                    <Flex flexDir={["column", "column", "column", "row"]} w={["100%", "100%", "100%", "50%"]} borderRadius="10px" mt={["15px", "15px", "18px", "36px"]} h={["auto", "auto", "auto", "50px"]} overflow="hidden" pos="relative" bg={["transparent", "transparent", "transparent", COLORS.white]}>
                                        <Input
                                            value={value}
                                            variant="unstyled"
                                            onChange={(e: any) => {
                                                SearchProduct()
                                                setDisable(false)
                                                setValue(e.target.value)
                                            }} bg={COLORS.white} w="full" h="50px" p="10px" mb={["20px", "20px", "20px", "0px"]} borderColor="white" />
                                        <Button
                                            display={["none", "none", "none", "flex"]}
                                            isLoading={loading}
                                            colorScheme='blackAlpha'
                                            onClick={() => { SearchProduct2() }}
                                            bg={COLORS.black} h="50px">
                                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15 25.5C20.799 25.5 25.5 20.799 25.5 15C25.5 9.20101 20.799 4.5 15 4.5C9.20101 4.5 4.5 9.20101 4.5 15C4.5 20.799 9.20101 25.5 15 25.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M31.5 31.5L22.5 22.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </Button>
                                        <Button
                                            display={["flex", "flex", "flex", "none"]}
                                            isLoading={loading}
                                            colorScheme='blackAlpha'
                                            onClick={() => { SearchProduct2() }}
                                            bg={COLORS.black} h="50px">
                                            <Box mr="10px">
                                                Search
                                            </Box>
                                            <svg width="24" height="24" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15 25.5C20.799 25.5 25.5 20.799 25.5 15C25.5 9.20101 20.799 4.5 15 4.5C9.20101 4.5 4.5 9.20101 4.5 15C4.5 20.799 9.20101 25.5 15 25.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M31.5 31.5L22.5 22.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </Button>
                                    </Flex>
                                    <Center w={["100%", "50%"]} pos="relative">
                                        <Box pos="absolute" left="0px" bg="red" bottom="-10px" h="full" w="full">
                                            {!disabled && data.map((a: any, b: number) => (
                                                <Flex
                                                    key={b}
                                                    onClick={() => {
                                                        setValue(a.itemName)
                                                        setDisable(true)
                                                    }}
                                                    bg="#fff" cursor="pointer" justifyContent="space-between" alignItems="center" p="10px" borderRadius="10px">
                                                    <Box w="full">
                                                        {a.itemName}
                                                    </Box>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                                                    </svg>
                                                </Flex>
                                            ))}
                                        </Box>
                                    </Center>
                                </Center>
                                {/* <Img src={} h={["250px", "auto"]} alt="search_banner" /> */}
                            </Center>
                            <Center fontSize={["24px", "32px", "47px", "57px"]} h={["106px", "76px", "156px", "256px"]} fontWeight="700" >
                                Search Result
                            </Center>
                        </Box>
                        {loading ?
                            <Center h="300px" w="full">
                                <Spinner size="xl" />
                            </Center> :
                            data.length < 1 ?
                                <Center flexDir="column" p="20px" w="full">
                                    <Lottie options={defaultOptions}
                                        height={300}
                                        width={300} />
                                    <Box fontWeight="700" mt="10px" fontSize="24px">
                                        No Result
                                    </Box>
                                </Center>
                                :
                                <Grid templateColumns={['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(5, 1fr)']} gap={[4, 2, 3, 4]}>
                              {
                                data?.map((item: any, index: number) => {
                                    return (
                                    <Box key={index} mb="20px">
                                        <ProductDisplay item={item} index={index} />
                                    </Box>
                                    )
                                })
                                }
                                
                                </Grid>
}
                    </MenuLayout>
                </Box>
            </main>
        </>
    )
}
