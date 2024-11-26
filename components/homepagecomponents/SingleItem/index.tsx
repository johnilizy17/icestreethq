import { Box, Center, Flex, Grid, Image, Img, useToast } from '@chakra-ui/react'
import Router, { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import toast from "react-hot-toast";
import { getCategories, getProducts } from '../../../services';
import { cashFormat } from '../../utils/cashFormat';
import CategoryLabel from '../../CategoryLabel';
import { imagePath } from '../../../services/Variable'
type props = {
    title: string,
    category: string,
    label: string,
    createdBy: string,
    type: string,
    product?: any
}

export default function SingleItem({ title, category, type, createdBy, label, product }: any) {


    const [isHover, setIsHover] = React.useState(-1)
    const navigate = useRouter()
    const [data, setData] = React.useState([] as any)

    React.useEffect(() => {
        if (product) {
            setData(product)
        } else {
            (async () => {
                try {
                    const response = await getProducts({
                        category: category
                    });

                    setData(response);
                } catch (err) {
                    toast.error("Error occured");
                }
                // setLoading(false);
            })();
        }
    }, [category]);

    const clickHandler = (item: any) => {
        localStorage.setItem("product", item._id)
        navigate.push(`/product-details?product=${item.itemName}&price=${cashFormat(item.price)}&id=${item._id}`);
    }

    return (
        <>
            {data.length !== 0 && (
                <Box p={["10px", "10px", "10px", "30px"]}>
                    <Box pt={"40px"} borderRadius={"24px"} overflow="hidden">
                        <CategoryLabel color='790252' type={type} label={label} createdBy={createdBy} title={category?.title} />
                        <Center>
                            <Grid mt="30px" templateColumns={['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(5, 1fr)']} gap={[4, 2, 3, 4]} w="full">
                                {data?.map((item: any, index: number) => {
                                    return (
                                        <Box mb="80px" _hover={{ transform: "scale(1.05)", transition: "0.5s ease-in-out" }} cursor="pointer" onClick={() => clickHandler(item)} key={index} onMouseOver={() => setIsHover(index)} onMouseOut={() => setIsHover(-1)} role="button" w={["95%", "100%"]}>
                                            <Center h={["160px", "90%"]} w="full" borderRadius={["8px", "16px", "24px"]} overflow="hidden">
                                                <Img h="100%" src={imagePath + "/" + item?.image} objectFit="cover" alt={item?.name} />
                                            </Center>
                                            <Box>
                                                <Flex mt="20px" flexDir={"column"} justifyContent="space-between">
                                                    <Box
                                                        fontSize="14px"
                                                    >{item?.itemName.length > 20 ? (item?.itemName).slice(0, 20) + "..." : item?.itemName}
                                                    </Box>
                                                    <Box display="flex">
                                                        <Box mr="10px">
                                                            <p className='  font-bold text-sm ' >{cashFormat(item?.price - (item?.price * item?.discount / 100))}</p>
                                                        </Box>
                                                        {item?.discount > 0 && <Box mr="10px" textDecoration="line-through" color="grey" className='font-bold text-sm' >{cashFormat(item?.price)}</Box>}
                                                    </Box>
                                                </Flex>
                                            </Box>
                                        </Box>
                                    )
                                })}
                            </Grid>
                        </Center>
                    </Box>
                </Box>
            )}
        </>
    )
} 