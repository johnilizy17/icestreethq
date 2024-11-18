import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import MenuLayout from '../../components/MenuLayout'
import OtherProduct from '../../components/OtherProduct'
import CartComponent from '../../components/CartPage/components/CartComponent'
import { getPackage } from '../../services/UserPackage'
import { Box, Center, Spinner } from '@chakra-ui/react'
import Lottie from 'react-lottie';
import Empty from '../../assets/lottie/empty.json'

export default function Cart() {
    const [packageInstance, setPackageInstance] = useState<[{product_id:any}]>()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        let cartId = localStorage.getItem("default_package")
        if (cartId) {
            getPackage(cartId)
                .then((data) => {
                    setLoading(false)
                    setPackageInstance(data)
                }).catch((err) => {
                    setLoading(false)
                })
        } else {
            setLoading(false)
        }
    }, [])

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Empty,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };


    return (
        <MenuLayout pageName='Ice Street - cart' menu={false} category={true} >
            <Box className=' w-full bg-white lg:bg-[#F5F5F5] pl-4 pr-4 lg:pl-[32px] lg:pr-[32px] ' >
                <Box className=' w-full flex pb-12 ' >
                    <Box className=' w-full lg:pr-5 ' >
                        {loading ?
                            <Center flexDir="column" h="80vh">
                                <Spinner size="xl" colorScheme='blackAlpha' />
                                <Box fontWeight="bold" mt="30px">
                                    Loading ...
                                </Box>
                            </Center>
                            :
                            packageInstance && !loading && packageInstance[0].product_id && packageInstance[0].product_id.length > 0  ?
                                <CartComponent packageInstance={packageInstance[0]} />
                                :
                                <Center flexDir="column" p="20px" w="full">
                                    <Lottie options={defaultOptions}
                                        height={300}
                                        width={300} />
                                </Center>
                        }
                        {!packageInstance && !loading && <Center fontWeight="900"><h1>Your Cart is empty</h1></Center>}
                        {(packageInstance && !loading && packageInstance[0].product_id.length <= 0) &&
                            <Center fontWeight="900">
                                <h1>Your Cart is empty</h1>
                            </Center>
                        }
                    </Box>
                </Box>
            </Box>
        </MenuLayout>
    )
} 