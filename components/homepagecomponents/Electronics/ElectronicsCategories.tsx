import React, { useEffect } from 'react'
import { Box, Grid, Image } from '@chakra-ui/react'
import CategoryLabel from '../../CategoryLabel'
import { getCategoriesById, getProducts } from '../../../services'
import { toast } from 'react-hot-toast'
import { cashFormat } from '../../utils/cashFormat'
import { useRouter } from 'next/router'
import { imagePath } from '../../../services/Variable'
import ProductDisplay from './ProductDisplay'

type props = {
    id?: any,
    title?: any,
    type?: any
}


export default function ElectronicsCategories({ id, title, type }: props) {

    const [isHover, setIsHover] = React.useState(-1)

    const [data, setData] = React.useState([] as any)

    const router = useRouter()

    useEffect(() => {

        (async () => {
            try {
                const response = await getCategoriesById(id)

                setData(response);
            } catch (err) {
                toast.error("Error occured");
            }
            // setLoading(false);
        })();
    }, [data, id])

    const navigateToProductDetails = (id: number) => {
        localStorage.setItem("product", id.toString())
        router.push("/product-details")
    }

    return (
        <div className=' w-full cursor-pointer' >
           <Box fontWeight="bold" fontSize="20px" pl={["20px","20px","20px","30px"]} pt={["20px","20px","20px","30px"]} pr={["20px","20px","20px","30px"]}>
            {title}
           </Box>
            <Box p={["20px","20px","20px","30px"]}>
                <Grid templateColumns={['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(5, 1fr)']} gap={[4, 2, 3, 10]}>
                    {data?.map((item: any, index: number) => {
                        return (
                            <Box key={index} mb="20px">
                                <ProductDisplay item={item} index={index} />
                            </Box>
                        )
                    })}
                </Grid>
            </Box>
        </div >
    )
}  