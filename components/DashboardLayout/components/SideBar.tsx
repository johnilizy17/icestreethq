import React from 'react'
import { CategoryData } from '../../../assets/dataBank'
import IconComponent from '../../homepagecomponents/IconComponent'
import { useRouter } from 'next/router'
import { Box, Center, Flex, Image, Img, useToast } from '@chakra-ui/react'

type props = {
    show: Function
}

export default function SideBar({ show }: props) {

    const router = useRouter()
    const [routerPath, setRouterPath] = React.useState("")

    const clickHandler = (item: any) => {
        router.push(item.toLowerCase())
        show(false)
    }

    React.useEffect(() => {
        setRouterPath(router.pathname)
    }, [router])

    return (
        <>
            <Box display={["block", "none", "none", "none"]}>
                <Box className=' lg:w-[350px] lg:pt-[37px] pt-[55px] rounded-[10px] py-[37px] lg:px-[41px] bg-white ' >
                    {CategoryData.map((item: string) => {
                        return (
                            <button onClick={() => {
                                clickHandler(item)
                            }} key={item} className=' flex text-[15px] items-center py-4 ' >
                                <IconComponent name={item} />
                                <p className={item === "All Categories" ? ' ml-4 text-[#0dadf7] ' : ' ml-4'} >{item}</p>
                            </button>
                        )
                    })}
                </Box>
            </Box>
            <Box bg="red" display={["none", "none", "none", "block"]}>
                <Box className=' lg:w-[350px] lg:pt-[37px] pt-[55px] rounded-[10px] py-[37px] lg:px-[41px] bg-white ' >
                    <Box className=' border-b lg:pl-0 pl-6 border-[#D9D9D9] pb-[20px] mb-[20px] ' >
                        <Box className=' flex items-center ' >
                            <Box className=' w-14 ' >
                                <Image alt="Icon" src='/images/menu/person.svg' width="17px" />
                            </Box>
                            <p className=' font-semibold lg:text-xl ' >Profile</p>
                        </Box>
                        <Box className=' flex items-center ' >
                            <Box className=' w-14 ' />
                            <Box className=' flex flex-col ' >
                                <p onClick={() => clickHandler("/dashboard")} className={routerPath === "/dashboard" ? ' text-[#0dadf7] cursor-pointer font-medium  mt-[13px] text-sm ' : ' text-[#979494] cursor-pointer font-medium  mt-[13px] text-sm '} >Account Information</p>
                                <p onClick={() => clickHandler("/delivery-address")} className={routerPath === "/delivery-address" ? ' text-[#0dadf7] cursor-pointer font-medium  mt-[13px] text-sm ' : ' text-[#979494] cursor-pointer font-medium  mt-[13px] text-sm '}  >Delivery Address</p>
                            </Box>
                        </Box>
                    </Box>
                    <Box className=' border-b lg:pl-0 pl-6 border-[#D9D9D9] pb-[20px] mb-[20px] ' >
                        <Box className=' flex items-center ' >
                            <Box className=' w-14 ' >
                                <Image alt="Icon" src='/images/menu/cart.svg' width="17px" />
                            </Box>
                            <p className=' font-semibold lg:text-xl ' >Order</p>
                        </Box>
                        <Box className=' flex items-center ' >
                            <Box className=' w-14 ' />
                            <Box className=' flex flex-col ' >
                                <p onClick={() => clickHandler("/active-order")} className={routerPath === "/active-order" ? ' text-[#0dadf7] cursor-pointer font-medium  mt-[13px] text-sm ' : ' text-[#979494] cursor-pointer font-medium  mt-[13px] text-sm '} >Active</p>
                                <p onClick={() => clickHandler("/pending-order")} className={routerPath === "/pending-order" ? ' text-[#0dadf7] cursor-pointer font-medium  mt-[13px] text-sm ' : ' text-[#979494] cursor-pointer font-medium  mt-[13px] text-sm '}  >Pending</p>
                                <p onClick={() => clickHandler("/completed-order")} className={routerPath === "/completed-order" ? ' text-[#0dadf7] cursor-pointer font-medium  mt-[13px] text-sm ' : ' text-[#979494] cursor-pointer font-medium  mt-[13px] text-sm '}  >Completed</p>
                                <p onClick={() => clickHandler("/history-order")} className={routerPath === "/history-order" ? ' text-[#0dadf7] cursor-pointer font-medium  mt-[13px] text-sm ' : ' text-[#979494] cursor-pointer font-medium  mt-[13px] text-sm '}  >Order history</p>
                            </Box>
                        </Box>
                    </Box>
                    <Box className=' border-b lg:pl-0 pl-6 border-[#D9D9D9] pb-[20px] mb-[20px]' >
                        <Box className=' flex items-center ' >
                            <Box className=' w-14 ' >
                                <Image alt="Icon" src='/images/menu/wallet.svg' width="17px" />
                            </Box>
                            <p className=' font-semibold lg:text-xl ' >Payment</p>
                        </Box>
                        <Box className=' flex items-center ' >
                            <Box className=' w-14 ' />
                            <Box className=' flex flex-col ' >
                                <p onClick={() => clickHandler("/wallet")} className={routerPath === "/wallet" ? ' text-[#0dadf7] cursor-pointer font-medium  mt-[13px] text-sm ' : ' text-[#979494] cursor-pointer font-medium  mt-[13px] text-sm '} >Wallet</p>
                                <p onClick={() => clickHandler("/transactions")} className={routerPath === "/transactions" ? ' text-[#0dadf7] cursor-pointer font-medium  mt-[13px] text-sm ' : ' text-[#979494] cursor-pointer font-medium  mt-[13px] text-sm '}  >Transactions</p>
                            </Box>
                        </Box>
                    </Box>
                    <Box cursor="pointer" onClick={() => {
                        localStorage.clear()
                        router.push("/")
                    }} className=' flex lg:pl-0 pl-6 items-center  ' >
                        <Image alt="Icon" src='/images/menu/logout.svg' width="17px" />
                        <Box className='ml-[38px] flex flex-col ' >
                            <p className=' font-semibold lg:text-xl ' >Logout</p>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
} 