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
                <Button flexDir="column" mt="7px" mr="20px" display={["flex", "flex", "flex", "none"]} colorScheme="white" onClick={() => onOpen()} >
                    <Box bg="black" mb="5px" className='w-[25px] h-[2px]' />
                    <Box bg="black" mb="5px" className='w-[25px] h-[2px]' />
                    <Box bg="black" mb="5px" className='w-[25px] h-[2px]' />
                    {/* <Box className=' w-[25px] h-[2px] bg-black mt-[3px] ' /> */}
                </Button>
                <Center ml="-20px" h={["50px"]} w={["170px", "170px", "170px", "250px"]} onClick={() => Router.push("/")} className={menu ? ' hidden lg:flex items-center ' : ' flex items-center '} >
                    <svg width="203" height="120" viewBox="0 0 183 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M69 35.5474C70.3943 35.5388 71.7885 35.5301 73.225 35.5212C73.8814 35.5155 73.8814 35.5155 74.5511 35.5097C74.9013 35.5084 75.2514 35.5074 75.6016 35.5065C75.7807 35.5044 75.9598 35.5022 76.1444 35.5C77.4734 35.4996 78.7655 35.604 79.8105 36.5256C80.8351 37.821 81.046 39.0746 80.9053 40.718C80.6931 41.6966 80.3127 42.5925 79.5368 43.2333C79.0935 43.4997 78.6409 43.7251 78.1684 43.9321C78.2446 43.9901 78.3208 44.0481 78.3993 44.1078C80.2336 45.6203 81.1067 48.1959 82 50.3603C82 50.4064 82 50.4525 82 50.5C80.4195 50.5 78.8389 50.5 77.2105 50.5C77.0407 50.1332 76.8708 49.7665 76.6958 49.3886C76.5295 49.0327 76.3626 48.6772 76.1957 48.3216C76.0803 48.075 75.9655 47.828 75.8514 47.5807C75.6868 47.2247 75.5201 46.8699 75.353 46.5151C75.3027 46.4049 75.2523 46.2947 75.2004 46.1811C74.9069 45.5645 74.656 45.1333 74.0632 44.7705C73.7471 44.6783 73.4309 44.5861 73.1053 44.491C73.1053 46.474 73.1053 48.4569 73.1053 50.5C71.7505 50.5 70.3958 50.5 69 50.5C69 45.5657 69 40.6313 69 35.5474ZM73.1053 38.6218C73.1053 39.6363 73.1053 40.6509 73.1053 41.6962C74.8951 41.8048 74.8951 41.8048 76.4836 41.082C76.7807 40.7108 76.7763 40.3475 76.8 39.8795C76.6948 39.4499 76.5894 39.243 76.2783 38.9362C75.619 38.5515 74.8965 38.6044 74.1572 38.6131C73.6365 38.6174 73.6365 38.6174 73.1053 38.6218Z" fill="black" />
                        <path d="M98 35.5C101.586 35.5 105.171 35.5 108.866 35.5C108.866 36.564 108.866 37.628 108.866 38.7243C106.652 38.7243 104.439 38.7243 102.159 38.7243C102.159 39.4645 102.159 40.2047 102.159 40.9673C104.195 40.9673 106.231 40.9673 108.329 40.9673C108.329 41.985 108.329 43.0028 108.329 44.0514C106.293 44.0514 104.257 44.0514 102.159 44.0514C102.159 45.0229 102.159 45.9944 102.159 46.9953C104.416 46.9953 106.674 46.9953 109 46.9953C109 48.1519 109 49.3084 109 50.5C105.37 50.5 101.74 50.5 98 50.5C98 45.55 98 40.6 98 35.5Z" fill="black" />
                        <path d="M84 35.5C87.5857 35.5 91.1715 35.5 94.8659 35.5C94.8659 36.564 94.8659 37.628 94.8659 38.7243C92.6524 38.7243 90.439 38.7243 88.1585 38.7243C88.1585 39.4645 88.1585 40.2047 88.1585 40.9673C90.1949 40.9673 92.2312 40.9673 94.3293 40.9673C94.3293 41.985 94.3293 43.0028 94.3293 44.0514C92.2929 44.0514 90.2566 44.0514 88.1585 44.0514C88.1585 45.0229 88.1585 45.9944 88.1585 46.9953C90.4162 46.9953 92.6739 46.9953 95 46.9953C95 48.1519 95 49.3084 95 50.5C91.37 50.5 87.74 50.5 84 50.5C84 45.55 84 40.6 84 35.5Z" fill="black" />
                        <path d="M21 35.5C24.9117 35.5 28.8234 35.5 32.8537 35.5C32.8537 36.564 32.8537 37.628 32.8537 38.7243C30.439 38.7243 28.0244 38.7243 25.5366 38.7243C25.5366 39.4645 25.5366 40.2047 25.5366 40.9673C27.758 40.9673 29.9795 40.9673 32.2683 40.9673C32.2683 41.985 32.2683 43.0028 32.2683 44.0514C30.0468 44.0514 27.8254 44.0514 25.5366 44.0514C25.5366 45.0229 25.5366 45.9944 25.5366 46.9953C27.9995 46.9953 30.4624 46.9953 33 46.9953C33 48.1519 33 49.3084 33 50.5C29.04 50.5 25.08 50.5 21 50.5C21 45.55 21 40.6 21 35.5Z" fill="black" />
                        <path d="M50.9792 35.5916C51.9076 36.41 52.3593 37.5024 52.5406 38.746C52.4822 39.076 52.4822 39.076 52.4048 39.3131C51.1314 39.4262 49.8811 39.4731 48.6032 39.4548C48.5121 39.2484 48.4217 39.0416 48.3317 38.8346C48.2813 38.7195 48.2309 38.6043 48.1789 38.4857C48.0601 38.1789 48.0601 38.1789 48.0601 37.8954C46.8867 37.5798 46.8867 37.5798 45.752 37.8954C45.4487 38.2935 45.4487 38.2935 45.455 38.7371C45.5697 39.1748 45.5697 39.1748 45.8495 39.3231C46.6376 39.6729 47.4279 39.9273 48.2553 40.1548C49.8212 40.6069 51.4407 41.1244 52.3465 42.6491C52.9662 43.9062 53.1736 45.1535 52.8455 46.5555C52.4087 47.8612 51.7187 49.0906 50.5067 49.7359C48.5022 50.6205 45.9627 50.7901 43.9037 49.9635C42.7252 49.3834 41.8691 48.4488 41.3776 47.1835C41.1786 46.5142 41.0554 45.824 41 45.1256C41.4385 44.6677 43.0659 44.8438 43.7001 44.8332C44.1126 44.8332 44.5249 44.8355 44.9374 44.8421C44.9671 44.9464 44.9969 45.0508 45.0275 45.1583C45.3063 46.0538 45.4951 46.6375 46.2951 47.1104C46.9125 47.2963 47.4489 47.3214 48.0516 47.0749C48.494 46.8539 48.494 46.8539 48.739 46.4015C48.8466 45.5829 48.8466 45.5829 48.4595 44.8985C48.0092 44.5151 47.5925 44.3562 47.0418 44.2041C46.8476 44.1453 46.6535 44.086 46.4595 44.0263C46.3632 43.9971 46.2669 43.9678 46.1677 43.9377C44.3432 43.3641 42.7687 42.6797 41.8109 40.8963C41.3427 39.8262 41.381 38.5189 41.7552 37.4258C42.3196 36.1608 43.1448 35.4012 44.3943 34.9182C46.4548 34.2583 49.1532 34.3065 50.9792 35.5916Z" fill="black" />
                        <path d="M12.8415 35.5041C12.9671 35.5028 13.0928 35.5014 13.2222 35.5C14.809 35.5199 16.1031 36.0057 17.2907 37.0253C18.0901 37.8353 18.6594 39.0129 18.8626 40.1094C18.3475 40.2442 17.832 40.3775 17.3165 40.5106C17.1703 40.5489 17.0242 40.5871 16.8736 40.6266C16.7328 40.6628 16.5919 40.699 16.4468 40.7363C16.3173 40.7699 16.1877 40.8035 16.0543 40.8381C15.7017 40.9118 15.7017 40.9118 15.152 40.9118C15.1187 40.8408 15.0854 40.7697 15.0511 40.6966C14.614 39.7535 14.614 39.7535 13.7557 39.202C13.0308 39.02 12.4221 38.9905 11.7222 39.2689C11.0423 39.6851 10.7245 40.2909 10.5009 41.0251C10.182 42.64 10.1479 44.8033 11.0291 46.2609C11.5161 46.7132 11.9813 46.8908 12.6574 46.9426C13.361 46.9115 13.968 46.7094 14.5078 46.2693C14.8685 45.6322 15.0753 44.9498 15.2894 44.255C16.1641 44.4305 16.9965 44.6578 17.8404 44.9403C17.9529 44.9774 18.0653 45.0145 18.1811 45.0526C18.4542 45.1428 18.7271 45.2337 19 45.3248C18.7767 46.8535 18.1472 48.2974 16.9386 49.3366C15.1934 50.5818 13.0993 50.6389 11.0059 50.3679C9.50401 50.0836 8.34708 49.3039 7.47319 48.0997C6.95923 47.3506 6.59561 46.5959 6.35658 45.726C6.32593 45.6189 6.29529 45.5119 6.26371 45.4016C5.83194 43.5638 5.94544 41.506 6.49401 39.7082C6.53068 39.5879 6.56735 39.4676 6.60513 39.3436C7.11636 37.9153 8.159 36.8125 9.51744 36.0976C10.6084 35.5901 11.6497 35.5142 12.8415 35.5041Z" fill="black" />
                        <path d="M111 35.5C115.29 35.5 119.58 35.5 124 35.5C124 36.7491 124 37.9981 124 39.285C122.539 39.285 121.077 39.285 119.571 39.285C119.571 42.986 119.571 46.6869 119.571 50.5C118.157 50.5 116.743 50.5 115.286 50.5C115.286 46.7991 115.286 43.0981 115.286 39.285C113.871 39.285 112.457 39.285 111 39.285C111 38.036 111 36.7869 111 35.5Z" fill="black" />
                        <path d="M55 35.5C58.96 35.5 62.92 35.5 67 35.5C67 36.7491 67 37.9981 67 39.285C65.651 39.285 64.302 39.285 62.9121 39.285C62.9121 42.986 62.9121 46.6869 62.9121 50.5C61.6066 50.5 60.3011 50.5 58.956 50.5C58.956 46.7991 58.956 43.0981 58.956 39.285C57.6505 39.285 56.3451 39.285 55 39.285C55 38.036 55 36.7869 55 35.5Z" fill="black" />
                        <path d="M0 35.5C1.32 35.5 2.64 35.5 4 35.5C4 40.45 4 45.4 4 50.5C2.68 50.5 1.36 50.5 0 50.5C0 45.55 0 40.6 0 35.5Z" fill="black" />
                    </svg>
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
                    style={{ marginLeft: 5 }}
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