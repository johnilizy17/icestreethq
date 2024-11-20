import React from 'react'
import MenuLayout from '../../components/MenuLayout'
import ProductDetail from '../../components/ProductDetails/components/ProductDetail'
import OtherProduct from '../../components/OtherProduct/index'
import { getProductsById } from '../../services'
import toast from 'react-hot-toast'
import SpinLoader from '../../components/Loaders/SpinLoader'
import { Box } from '@chakra-ui/react'
import MenuLayoutProduct from '../../components/MenuLayout/product'
import { useRouter } from 'next/router'

export default function Index() {

    const [data, setData] = React.useState({} as any)
    const [product_id, setProductId] = React.useState<any>("");
    const [loading, setLoading] = React.useState(true);
    const { query } = useRouter()

        const user_id = query.id ?? ""
   
        React.useEffect(() => {
        setProductId(user_id);
    }, [user_id]);

    React.useEffect(() => {
        if (!product_id) return
        (async () => {
            try {
                const response = await getProductsById(product_id);
                setData(response);
                setLoading(false)
            } catch (err) {
                toast.error("Error occured");
            }
        })();
    }, [product_id]);

    return (
        <>
            {loading && (
                <Box className=' w-full pt-32 text-2xl flex justify-center font-Inter-ExtraBold ' >
                    <SpinLoader />
                </Box>
            )}
            {!loading && (
                <MenuLayoutProduct pageName='Ice Street - Product' product={data} menu={false} category={true} >
                    <Box className=' w-full bg-[#F5F5F5] lg:pl-[32px] lg:pr-[32px] ' >
                        <Box className=' w-full  text-black   pt-6 pb-4  ' >
                        </Box>
                        <Box className=' w-full pb-12 ' >
                            <Box className=' w-full' >
                                {product_id && <ProductDetail productId={product_id} data={data} />}
                            </Box>
                            <Box ml={["0px", "0px", "0px", "10px"]} mt={["20px", "20px", "20px", "30px"]} className=' w-full lg:w-full px-4 lg:px-0' >
                                <Box className=' w-full overflow-y-auto ' >
                                    <OtherProduct id={data.category_id && data.category_id._id ? data.category_id._id : ""} />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </MenuLayoutProduct>
            )}
        </>
    )
}
