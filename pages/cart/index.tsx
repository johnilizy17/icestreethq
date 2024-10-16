import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import MenuLayout from '../../components/MenuLayout'
import OtherProduct from '../../components/OtherProduct'
import CartComponent from '../../components/CartPage/components/CartComponent'
import { getPackage } from '../../services/UserPackage'
import { Box } from '@chakra-ui/react'

export default function Cart() {
    const [packageInstance, setPackageInstance] = useState<packageInstanceType[]>()

    useEffect(() => {
        let cartId = localStorage.getItem("default_package")
        if (!cartId) return

        getPackage(cartId)
            .then((data) => {
                console.log(data, "cartid")
                setPackageInstance(data)
            })
    }, [])

    return (
        <MenuLayout pageName='Ice Street - cart' menu={false} category={true} >
            <Box className=' w-full bg-white lg:bg-[#F5F5F5] pl-4 pr-4 lg:pl-[32px] lg:pr-[32px] ' >
                <Box className=' w-full flex pb-12 ' >
                    <Box className=' w-full lg:pr-5 ' >
                        {packageInstance && <CartComponent packageInstance={packageInstance[0]} />}
                        {(packageInstance && packageInstance[0].product_id.length <= 0) && <h1>Your Cart is empty</h1>}
                    </Box>
                    {/* <Box className=' lg:flex flex-col hidden w-fit' >
                        <Box className=' w-[400px] overflow-y-auto ' >
                            <OtherProduct />
                        </Box>
                    </Box> */}
                </Box>
            </Box>
        </MenuLayout>
    )
} 