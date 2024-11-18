import { Box, Center, Flex, Grid, Image, Spinner } from '@chakra-ui/react'
import Router from 'next/router'
import React, { useEffect, useState } from 'react'
import { getCollection } from '../../services/productService';
import ProductDisplay from '../homepagecomponents/Electronics/ProductDisplay';
import Lottie from 'react-lottie';
import Empty from '../../assets/lottie/empty.json'

export default function OtherProduct({ id }: { id: string }) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Empty,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    async function SearchProduct() {
        setLoading(true);
        const brandArray = await getCollection(id)
        setData(brandArray)
        setLoading(false)
    }

    useEffect(() => {
        SearchProduct()
    }, [])
    return (
        <Box className=' w-full pb-[20px]' >
            <Box className=' pb-3 mb-3 border-b border-[#D9D9D9] ' >
                <p className='font-bold text-xl'>Other Products</p>
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
                    <Grid mt="30px" templateColumns={['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(5, 1fr)']} gap={[4, 2, 3, 10]} w="full">
                   { data?.map((item: any, index: number) => {
                        return (
                            <ProductDisplay key={index} item={item} index={index} />
                        )
                    })}
                    </Grid>
                    }
        </Box>
    )
} 