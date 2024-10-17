import React from 'react'
import { useRouter } from 'next/router'
import { Box, Button, IconButton, Center, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, Image, Img, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react';

export default function CategoryMenu() {

    const router = useRouter() 
    const [routerPath, setRouterPath] = React.useState("")

    const clickHandler =(item: any)=> {
        router.push(item) 
    } 

    React.useEffect(()=> {
        setRouterPath(router.pathname)
    }, [router])
    
    return (
        <Box style={{boxShadow: "0px 0px 2px 0px #00000040"}} className=' w-[80%] lg:relative fixed bottom-[55px] right-0 lg:w-[240px] bg-white lg:h-[390px] rounded-[10px] flex flex-col pt-0 pl-6 lg:pb-[12px] pb-2 p-[12px] ' pt="20px">
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
                        <p onClick={()=> clickHandler("/dashboard")} className={routerPath === "/dashboard" ? ' text-[#0dadf7] cursor-pointer font-medium  mt-[13px] text-sm ': ' text-[#979494] cursor-pointer font-medium  mt-[13px] text-sm '} >Account Information</p>
                        <p onClick={()=> clickHandler("/delivery-address")} className={routerPath === "/delivery-address" ? ' text-[#0dadf7] cursor-pointer font-medium  mt-[13px] text-sm ': ' text-[#979494] cursor-pointer font-medium  mt-[13px] text-sm '}  >Delivery Address</p>
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
                        <p onClick={()=> clickHandler("/active-order")} className={routerPath === "/active-order" ? ' text-[#0dadf7] cursor-pointer font-medium  mt-[13px] text-sm ': ' text-[#979494] cursor-pointer font-medium  mt-[13px] text-sm '} >Active</p>
                        <p onClick={()=> clickHandler("/pending-order")} className={routerPath === "/pending-order" ? ' text-[#0dadf7] cursor-pointer font-medium  mt-[13px] text-sm ': ' text-[#979494] cursor-pointer font-medium  mt-[13px] text-sm '}  >Pending</p>
                        <p onClick={()=> clickHandler("/completed-order")} className={routerPath === "/completed-order" ? ' text-[#0dadf7] cursor-pointer font-medium  mt-[13px] text-sm ': ' text-[#979494] cursor-pointer font-medium  mt-[13px] text-sm '}  >Completed</p>
                        <p onClick={()=> clickHandler("/history-order")} className={routerPath === "/history-order" ? ' text-[#0dadf7] cursor-pointer font-medium  mt-[13px] text-sm ': ' text-[#979494] cursor-pointer font-medium  mt-[13px] text-sm '}  >Order history</p>
                    </Box>
                </Box>
            </Box>
            <Box 
            onClick={()=>{
                localStorage.clear()
                router.push("/")
            }}
            pb="10px" className=' flex lg:pl-0 pl-6 items-center  ' >
                <Image alt="Icon" src='/images/menu/logout.svg' width="17px" />
                <Box className='ml-[38px] flex flex-col ' >
                    <p className=' font-semibold lg:text-xl ' >Logout</p> 
                </Box>
            </Box>
        </Box>
    )
}
