import React, { useEffect } from 'react'
import { Box, Flex, Image } from '@chakra-ui/react'
import CategoryLabel from '../../CategoryLabel'
import { getProducts } from '../../../services'
import { toast } from 'react-hot-toast'
import { cashFormat } from '../../utils/cashFormat'
import { imagePath } from '../../../services/Variable'
import ProductDisplay from './ProductDisplay2'

type props = {
    label: boolean,
    category: string,
    createdBy: string,
    type: { color: string, Header_Color: string, title: string },
    product?: any
}

export default function Electronic({ label, type, category, createdBy, product }: props) {

    const [isHover, setIsHover] = React.useState(-1)

    const [data, setData] = React.useState([] as any)

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
        if (product) {
            console.log(product, "item")
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
            })();
        }
    }, [category]);

    return (
        <Box p={["10px", "10px", "10px", "30px"]}>
            <Box bg={type && type.color ? type.color : ""} borderRadius={"24px"} overflow="hidden">
                <CategoryLabel label={label} type={type} title="Electronic" createdBy={createdBy} />
                <Box pl="10px" pr="10px">
                    <Box overflow="scroll">
                        <Flex h="390px" w="auto" pl={["20px", "20px", "20px", "30px"]} pt="32px" pr={["20px", "20px", "20px", "30px"]}>
                            {data?.map((item: any, index: number) => {
                                return (
                                    <Box key={index}>
                                        <ProductDisplay item={item} index={index} />
                                    </Box>
                                )
                            })}
                        </Flex>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}  