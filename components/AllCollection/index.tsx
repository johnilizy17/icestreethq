import React, { useEffect } from 'react'
import { Box, Button, Flex, Image, Img } from '@chakra-ui/react'
import CategoryLabel from '../CategoryLabel'
import { getProducts } from '../../services'
import { toast } from 'react-hot-toast'
import { cashFormat } from '../utils/cashFormat'
import { imagePath } from '../../services/Variable'
import { getBrand } from '../../services/userCategories'
import { useRouter } from 'next/router'
import { getCollections } from '../../services/productService'

type props = {
    label: boolean
}

export default function AllCollection({ label }: props) {

    const [isHover, setIsHover] = React.useState(-1)

    const [data, setData] = React.useState([] as any)

    const router = useRouter()

    const Items = [
        {
            name: "Fridge",
            image: "/images/items/e1.png"
        },
        {
            name: "Smart Phone",
            image: "/images/items/e2.png"
        },
        {
            name: "Iron",
            image: "/images/items/e3.png"
        },
        {
            name: "Iron",
            image: "/images/items/e4.png"
        },
        {
            name: "Iron",
            image: "/images/items/e4.png"
        },
    ]

    React.useEffect(() => {
        (async () => {
            try {
                const response = await getCollections(3);
                // console.log(response,"response")
                setData(response);
            } catch (err) {
                toast.error("Error occured");
            }

        })();
    }, []);

    return (
        <Box p={["10px", "10px", "10px", "30px"]}>
            <Box bg={"white"} borderRadius={"24px"} overflow="hidden">
                <CategoryLabel label={label} type={{ Header_Color: "#000", color: "#fff", title: "All Collections" }} title="All Collection" />
                <Box overflow="scroll">
                    <Flex h="390px" w="auto" pl={["20px", "20px", "20px", "30px"]} pt="32px" pr={["20px", "20px", "20px", "30px"]} overflow={"scroll"} __css={
                        {
                            '::-webkit-scrollbar': {
                                display: 'none'
                            }
                        }
                    }>

                        {data?.map((item: any, index: number) => {
                            return (
                                <Box key={index}>
                                    <Box w="275px" mr="20px" pos="relative" overflow="hidden" _hover={{ w: ["280px", "480px"], transition: "0.5s ease-in-out" }} cursor="pointer" bg="black" borderRadius={["8px","16px","24px"]} h="320px" key={index}>
                                        <Box w="500px" h="full">
                                            <img style={{ width: 500, objectFit: "cover", height: "100%" }} src={item.image ? imagePath + "/" + item.image : "/banner/collectionBanner.png"} />
                                            <Button
                                                onClick={() => {
                                                    router.push(`/collection?id=${item._id}&name=${item.title}`)
                                                }}
                                                borderRadius={["8px","16px","24px"]}
                                                pos="absolute" bottom="20px" left="20px" fontSize="20px" h="53px">
                                                {item.title}
                                                <svg style={{ marginLeft: 10 }} width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.6667 1.66675L1 13.3334" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M2.16666 1.66675H12.6667V12.1667" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            )
                        })}
                    </Flex>
                </Box>
            </Box>
        </Box>
    )
}  