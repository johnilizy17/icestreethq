import { Box, Button, IconButton, Center, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, Image, Img, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsFillCartFill } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import useUserDetails from '../../hooks/auth.hook';
import useCartInfo from '../../hooks/cart.hook';
import SideBar from '../DashboardLayout/components/SideBar';
import CategoryMenu from '../homepagecomponents/CategoryMenu';
import SiteSearch from '../SiteSearch';
import SiteSearchBarModal from './Modals/SiteSearchBarModal';
import dynamic from 'next/dynamic';
const Location = dynamic(import('./components/Location'), { ssr: false });
import { getCategories, getBrand } from '../../services/userCategories'

type props = {
    menu: boolean
}

interface CartBadgeProps {
    loading: boolean
    value: number
    className?: string
}

const CartBadge = ({ loading, value, className }: CartBadgeProps) => {
    // return null if cart is empty
    if (value <= 0)
        return null

    return (
        <span
            className={`absolute p-1 -top-2 -right-2 w-5 h-5 flex items-center justify-center text-[11px] font-bold leading-none text-white 
                transform bg-[red] rounded-full ${className}`}>
            {loading ? "..." : value}
        </span>
    )
}

export default function Navbar({ menu }: props) {
    // const el: any = document.querySelector('html'); 
    const [lastScrollY, setLastScrollY] = React.useState(0);
    const [show, setShow] = React.useState(false)
    const [showModal, setShowModal] = React.useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter()
    const { userDetails, isLoggedIn } = useUserDetails()
    const [searchBarOpen, setSearchBarOpen] = useState<boolean>(false)
    const { cartInfo, cartLoading } = useCartInfo()
    const [categories, setCategories] = useState([])
    const [brand, setBrand] = useState([])
    const navigate = useRouter()
    const closeSearchBarModal = () => {
        setSearchBarOpen(!searchBarOpen)
    }

    async function fetchExistingCategories() {
        const result = await getCategories()
        const brandResult = await getBrand()
        if (brandResult.category) {
            setBrand(brandResult.category)
        }
        if (result.category) {
            setCategories(result.category);
        }
    }

    React.useEffect(() => {
        const el: any = document.querySelector('html');
        if (showModal) {
            el.style.overflow = 'hidden';
        } else {
            el.style.overflow = 'auto';
        }
        fetchExistingCategories()
    }, [showModal])

    const controlNavbar = useCallback(() => {
        if (typeof window !== 'undefined') {
            if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
                setShow(false);
            } else { // if scroll up show the navbar
                setShow(true);
            }
            setLastScrollY(window.scrollY);
        }
    }, [lastScrollY])

    let user = false

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);

            // cleanup function
            return () => {
                window.removeEventListener('scroll', controlNavbar);
                // Perform localStorage action
                if (localStorage.getItem("user")) {
                    user = true
                }
            };
        }
    }, [controlNavbar, lastScrollY]);

    return (
        <nav className=' lg:loginShadow w-full flex px-[11px] lg:px-[35px] h-[70px] lg:h-[89px] justify-between items-center ' >
            <Box className=' flex items-center ' >
                <Button flexDir="column" mt="7px" display={["flex", "flex", "flex", "none"]} colorScheme="white" onClick={() => onOpen()} >
                    <Box bg="black" mb="5px" className='w-[25px] h-[2px]' />
                    <Box bg="black" mb="5px" className='w-[25px] h-[2px]' />
                    <Box bg="black" mb="5px" className='w-[25px] h-[2px]' />
                    {/* <Box className=' w-[25px] h-[2px] bg-black mt-[3px] ' /> */}
                </Button>
                <Center ml="-20px" h={["40px"]} w={["170px", "170px", "170px", "200px"]} onClick={() => Router.push("/")} className={menu ? ' hidden lg:flex items-center ' : ' flex items-center '} >
                    <Box display={["none", "none", "none", "flex"]}>
                        {router.pathname !== "/" ? <AiOutlineArrowLeft color='#0dadf7' /> : ""}
                    </Box>
                    <Img style={{ objectFit: "contain" }} src="/images/logo.png" alt='logo' />
                </Center>
            </Box>
            <Center w="full">
                <Center w="350px" display={["none", "none", "none", "flex"]} justifyContent="space-between">
                    <Button colorScheme="white" color="#000" mr="10px">
                        <Link href="arrival">
                            NEW IN
                        </Link>
                    </Button>
                    <Button colorScheme="white" color="#000" mr="10px">
                        <Link href="men">
                            MEN
                        </Link>
                    </Button>
                    <Button colorScheme="white" color="#000" mr="10px">
                        <Link href="women">
                            WOMEN
                        </Link>
                    </Button>
                    <Button colorScheme="white" color="#000">
                        <Link href="collection">
                            COLLECTIONS
                        </Link>
                    </Button>
                </Center>
            </Center>
            <Box className='hidden lg:flex items-center ml-auto mr-12 ' >
                <Link href={"/cart"} className=' text-sm font-semibold ml-6 flex items-center ' >
                    <Box _hover={{ color: "#0dadf7" }} pos="relative" color={router.pathname === "/cart" ? "#0dadf7" : ""} justifyContent="center" display="flex" alignItems="center">
                        <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.44131 11.1667H23.56C23.9445 11.1666 24.3244 11.2497 24.6738 11.4103C25.0232 11.5708 25.3337 11.805 25.584 12.0968C25.8344 12.3886 26.0187 12.7311 26.1244 13.1008C26.23 13.4705 26.2544 13.8587 26.196 14.2387L24.5226 25.108C24.3774 26.0526 23.8987 26.914 23.1733 27.5362C22.4479 28.1584 21.5237 28.5003 20.568 28.5H11.432C10.4765 28.5 9.55261 28.1579 8.82748 27.5357C8.10235 26.9136 7.62387 26.0524 7.47864 25.108L5.80531 14.2387C5.74687 13.8587 5.77129 13.4705 5.87691 13.1008C5.98254 12.7311 6.16686 12.3886 6.41724 12.0968C6.66761 11.805 6.97813 11.5708 7.3275 11.4103C7.67686 11.2497 8.05682 11.1666 8.44131 11.1667Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12 15.1667V8.5C12 7.43913 12.4214 6.42172 13.1716 5.67157C13.9217 4.92143 14.9391 4.5 16 4.5C17.0609 4.5 18.0783 4.92143 18.8284 5.67157C19.5786 6.42172 20 7.43913 20 8.5V15.1667" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <CartBadge loading={cartLoading} value={cartInfo?.itemsQuantity ?? 0} />
                    </Box>
                </Link>
                <button
                style={{marginLeft:5}}
                    onClick={() => Router.push("/search")}
                    className={`flex items-center flex-col`}  >
                    <svg width="30" height="30" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 25.5C20.799 25.5 25.5 20.799 25.5 15C25.5 9.20101 20.799 4.5 15 4.5C9.20101 4.5 4.5 9.20101 4.5 15C4.5 20.799 9.20101 25.5 15 25.5Z" stroke={showModal ? "#0dadf7" : "#434343"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M31.5 31.5L22.5 22.5" stroke={router.pathname === "/search" ? "#0dadf7" : "#434343"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <Box ml="20px" display={["none", "none", "none", "flex"]} _hover={{ color: "#0dadf7" }} color={router.pathname === "/dashboard" ? "#0dadf7" : ""}>
                    <button onClick={() => { if (!isLoggedIn) { Router.push("/signup") } else { Router.push("/dashboard") } }} className=' text-sm font-semibold ' >{user ? "Login/Sign up" :
                        <Center>
                            <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.224 25.632C8.55401 24.5336 9.22929 23.5709 10.1497 22.8866C11.07 22.2024 12.1865 21.833 13.3333 21.8333H18.6667C19.815 21.8329 20.9328 22.2032 21.8538 22.889C22.7749 23.5749 23.45 24.5397 23.7787 25.64M4 16.5C4 18.0759 4.31039 19.6363 4.91345 21.0922C5.5165 22.5481 6.40042 23.871 7.51472 24.9853C8.62902 26.0996 9.95189 26.9835 11.4078 27.5866C12.8637 28.1896 14.4241 28.5 16 28.5C17.5759 28.5 19.1363 28.1896 20.5922 27.5866C22.0481 26.9835 23.371 26.0996 24.4853 24.9853C25.5996 23.871 26.4835 22.5481 27.0866 21.0922C27.6896 19.6363 28 18.0759 28 16.5C28 14.9241 27.6896 13.3637 27.0866 11.9078C26.4835 10.4519 25.5996 9.12902 24.4853 8.01472C23.371 6.90042 22.0481 6.0165 20.5922 5.41345C19.1363 4.81039 17.5759 4.5 16 4.5C14.4241 4.5 12.8637 4.81039 11.4078 5.41345C9.95189 6.0165 8.62902 6.90042 7.51472 8.01472C6.40042 9.12902 5.5165 10.4519 4.91345 11.9078C4.31039 13.3637 4 14.9241 4 16.5ZM12 13.8333C12 14.8942 12.4214 15.9116 13.1716 16.6618C13.9217 17.4119 14.9391 17.8333 16 17.8333C17.0609 17.8333 18.0783 17.4119 18.8284 16.6618C19.5786 15.9116 20 14.8942 20 13.8333C20 12.7725 19.5786 11.7551 18.8284 11.0049C18.0783 10.2548 17.0609 9.83333 16 9.83333C14.9391 9.83333 13.9217 10.2548 13.1716 11.0049C12.4214 11.7551 12 12.7725 12 13.8333Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </Center>
                    }</button>
                </Box>
            </Box>
            <Box display={["none", "none", "none", "none", "flex"]}>
                <Location />
            </Box>
            {/* start of mobile nav */}
            <Box alignItems="center" className=' lg:hidden flex ml-auto' >
                <Link href={"/cart"} className=' text-sm font-semibold ml-6 flex items-center ' >
                    <Box _hover={{ color: "#0dadf7" }} pos="relative" color={router.pathname === "/cart" ? "#0dadf7" : ""} justifyContent="center" display="flex" alignItems="center">
                        <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.44131 11.1667H23.56C23.9445 11.1666 24.3244 11.2497 24.6738 11.4103C25.0232 11.5708 25.3337 11.805 25.584 12.0968C25.8344 12.3886 26.0187 12.7311 26.1244 13.1008C26.23 13.4705 26.2544 13.8587 26.196 14.2387L24.5226 25.108C24.3774 26.0526 23.8987 26.914 23.1733 27.5362C22.4479 28.1584 21.5237 28.5003 20.568 28.5H11.432C10.4765 28.5 9.55261 28.1579 8.82748 27.5357C8.10235 26.9136 7.62387 26.0524 7.47864 25.108L5.80531 14.2387C5.74687 13.8587 5.77129 13.4705 5.87691 13.1008C5.98254 12.7311 6.16686 12.3886 6.41724 12.0968C6.66761 11.805 6.97813 11.5708 7.3275 11.4103C7.67686 11.2497 8.05682 11.1666 8.44131 11.1667Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12 15.1667V8.5C12 7.43913 12.4214 6.42172 13.1716 5.67157C13.9217 4.92143 14.9391 4.5 16 4.5C17.0609 4.5 18.0783 4.92143 18.8284 5.67157C19.5786 6.42172 20 7.43913 20 8.5V15.1667" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <CartBadge loading={cartLoading} value={cartInfo?.itemsQuantity ?? 0} />
                    </Box>
                </Link>
                <button
                style={{marginLeft:5}}
                    onClick={() => Router.push("/search")}
                    className={`flex items-center flex-col`}  >
                    <svg width="30" height="30" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 25.5C20.799 25.5 25.5 20.799 25.5 15C25.5 9.20101 20.799 4.5 15 4.5C9.20101 4.5 4.5 9.20101 4.5 15C4.5 20.799 9.20101 25.5 15 25.5Z" stroke={showModal ? "#0dadf7" : "#434343"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M31.5 31.5L22.5 22.5" stroke={router.pathname === "/search" ? "#0dadf7" : "#434343"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <Location />
            </Box>
            {
                <Box style={{ boxShadow: "0px -1px 1px 0px #00000033" }} className=' text-xs lg:hidden text-[#434343] font-medium w-full bg-white left-0 right-0 px-[14px] flex justify-between items-center fixed bottom-0 h-[55px] ' >
                    <button className={` flex items-center flex-col`} onClick={() => Router.push("/")}>
                        <svg width="25" height="25" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 22V7.33333L11 0L22 7.33333V22H13.75V13.4444H8.25V22H0Z" fill={router.pathname === "/" ? "#0dadf7" : "#434343"} />
                        </svg>
                        <p className={` mt-[3px] ${router.pathname === "/" ? "text-[#0dadf7]" : "text-[#434343]"}`} >Home</p>
                    </button>
                    <button onClick={() => Router.push("/collection")} className=' flex items-center flex-col ' >
                        <svg width="25" height="25" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 0C17.0748 0 22 4.92525 22 11C22 17.0748 17.0748 22 11 22C4.92525 22 0 17.0748 0 11C0 4.92525 4.92525 0 11 0ZM11 5.5C10.8339 5.50001 10.6734 5.56017 10.5481 5.66937C10.4229 5.77857 10.3415 5.92941 10.3189 6.094L10.3125 6.1875V10.3125H6.1875C6.01331 10.3126 5.84564 10.3787 5.71836 10.4976C5.59108 10.6166 5.51368 10.7794 5.50181 10.9531C5.48994 11.1269 5.54447 11.2987 5.6544 11.4339C5.76432 11.569 5.92144 11.6573 6.094 11.6811L6.1875 11.6875H10.3125V15.8125C10.3126 15.9867 10.3787 16.1544 10.4976 16.2816C10.6166 16.4089 10.7794 16.4863 10.9531 16.4982C11.1269 16.5101 11.2987 16.4555 11.4339 16.3456C11.569 16.2357 11.6573 16.0786 11.6811 15.906L11.6875 15.8125V11.6875H15.8125C15.9867 11.6874 16.1544 11.6213 16.2816 11.5024C16.4089 11.3834 16.4863 11.2206 16.4982 11.0469C16.5101 10.8731 16.4555 10.7013 16.3456 10.5661C16.2357 10.431 16.0786 10.3427 15.906 10.3189L15.8125 10.3125H11.6875V6.1875C11.6875 6.00516 11.6151 5.8303 11.4861 5.70136C11.3572 5.57243 11.1823 5.5 11 5.5Z" fill={router.pathname === "/create-package" ? "#0dadf7" : "#434343"} />
                        </svg>
                        <p className={` mt-[3px] ${router.pathname === "/collection" ? "text-[#0dadf7]" : "text-[#434343]"}`} >Collection</p>
                    </button>
                    <button
                        onClick={() => Router.push("/search")}
                        className={`flex items-center flex-col`}  >
                        <svg width="25" height="25" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 25.5C20.799 25.5 25.5 20.799 25.5 15C25.5 9.20101 20.799 4.5 15 4.5C9.20101 4.5 4.5 9.20101 4.5 15C4.5 20.799 9.20101 25.5 15 25.5Z" stroke={showModal ? "#0dadf7" : "#434343"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M31.5 31.5L22.5 22.5" stroke={router.pathname === "/search" ? "#0dadf7" : "#434343"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p className={` mt-[3px] ${router.pathname === "/search" ? "#0dadf7" : "#434343"}`} >Search</p>
                    </button>
                    <button onClick={() => {
                        localStorage.getItem("user") ?
                            setShowModal(true) :
                            Router.push("/login")
                    }} className=' flex items-center flex-col ' >
                        <svg width="25" height="25" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.21053 5.21053C5.21053 8.08326 7.54832 10.4211 10.4211 10.4211C13.2938 10.4211 15.6316 8.08326 15.6316 5.21053C15.6316 2.33779 13.2938 0 10.4211 0C7.54832 0 5.21053 2.33779 5.21053 5.21053ZM19.6842 22H20.8421V20.8421C20.8421 16.3738 17.2052 12.7368 12.7368 12.7368H8.10526C3.63579 12.7368 0 16.3738 0 20.8421V22H19.6842Z" fill={router.pathname === "/dashboard" ? "#0dadf7" : "#434343"} />
                        </svg>
                        <p className={` mt-[3px] ${showModal ? "text-[#0dadf7]" : "text-[#434343]"}`} > Account
                        </p>
                    </button>
                </Box>

            }
            {/* end of footer nav */}
            <Box>
                <Drawer
                    isOpen={isOpen}
                    placement='left'
                    onClose={onClose}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerBody>
                            <SideBar show={setShow} />
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Box>
            {
                showModal && (
                    <Box onClick={() => setShowModal(false)} className=' fixed w-0 h-0 z-50 before:fixed before:inset-0 before:bg-gray-900 before:w-screen before:h-screen before:opacity-5' >
                        <CategoryMenu />
                    </Box>
                )
            }
            {/* modals */}
            <SiteSearchBarModal isOpen={searchBarOpen} onClose={closeSearchBarModal} />
        </nav >
    )
} 