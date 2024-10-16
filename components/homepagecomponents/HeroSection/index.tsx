import { CategoryData } from '../../../assets/dataBank';
import IconComponent from '../IconComponent';
import { Box, Button, Center, Flex, IconButton, Img, useRadio } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required swiper modules
import { Autoplay } from 'swiper';
import SwiperImage from './components/SwiperImage';
import { COLORS } from '../../../services/theme/colors';
import { useRouter } from 'next/router';

export default function HeroSection() {

    const router = useRouter()

    return (
        <div className=' flex lg:flex-row flex-col w-full lg:px-[32px] pb-[8px] mb-4 lg:mb-0 px-3 lg:pb-[32px]' style={{ position: "relative" }} >
            <IconButton display={["none", "none", "none", "flex"]} h="30px" bg={COLORS.white} colorScheme='white' aria-label='' pos="absolute" zIndex={2} right="110px" top="30px">
                <svg width="7" height="15" viewBox="0 0 10 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 1.42996L1 10.2993L9 19.1687" fill="white" />
                    <path d="M9 1.42996L1 10.2993L9 19.1687" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </IconButton>
            <IconButton display={["none", "none", "none", "flex"]} h="30px" bg={COLORS.white} colorScheme='white' aria-label='' pos="absolute" zIndex={2} right="60px" top="30px">
                <svg width="7" height="15" viewBox="0 0 10 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.42996L9 10.2993L1 19.1687" fill="white" />
                    <path d="M1 1.42996L9 10.2993L1 19.1687" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </IconButton>
            <IconButton display={["flex", "flex", "flex", "none"]} bg={COLORS.white} colorScheme='white' aria-label='' pos="absolute" zIndex={2} right="70px" top="20px">
                <svg width="7" height="18" viewBox="0 0 10 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 1.42996L1 10.2993L9 19.1687" fill="white" />
                    <path d="M9 1.42996L1 10.2993L9 19.1687" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </IconButton>
            <IconButton display={["flex", "flex", "flex", "none"]} bg={COLORS.white} colorScheme='white' aria-label='' pos="absolute" zIndex={2} right="25px" top="20px">
                <svg width="7" height="18" viewBox="0 0 10 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.42996L9 10.2993L1 19.1687" fill="white" />
                    <path d="M1 1.42996L9 10.2993L1 19.1687" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </IconButton>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay]}
                className="w-full"
            >
                <SwiperSlide>
                    <Flex bg="#EFE3D7" justifyContent={"space-between"} flexDir={["column", "column", "column", "row"]} pt="30px" pr="30px" borderRadius="24px" h={["auto", "auto", "auto", "600px"]}>
                        <Center flexDir="column" alignItems={"self-start"} p="20px">
                            <Box mt={["20px", "0px"]} lineHeight={["40px", "40px", "40px", "70px"]} fontWeight="bolder" fontSize={["32px", "38px", "38px", "58px"]}>
                                Styles With Elegance Collection
                            </Box>
                            <Box fontStyle="italic" mt="16px" fontSize={["16px", "16px", "28px", "36px"]}>
                                50% Discount Promo
                            </Box>
                            <Button onClick={()=>router.push("/brand")} h="53px" p={["12px 24px"]} colorScheme='blackAlpha' bg="black" mt="16px">
                                <Box mr="10px">
                                    Shop Now
                                </Box>
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.6667 1.66666L1 13.3333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M2.16669 1.66666H12.6667V12.1667" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </Button>
                        </Center>
                        <Img src='/images/slider/1.png' />
                    </Flex>
                </SwiperSlide>
                <SwiperSlide>
                    <Flex bg="#d7dcef" justifyContent={"space-between"} flexDir={["column", "column", "column", "row"]} pt="30px" pr="30px" borderRadius="24px" h={["auto", "auto", "auto", "600px"]}>
                        <Center flexDir="column" alignItems={"self-start"} p="20px">
                            <Box mt={["20px", "0px"]} lineHeight={["40px", "40px", "40px", "70px"]} fontWeight="bolder" fontSize={["32px", "38px", "38px", "58px"]}>
                            Freeze the Moment Own the Look
                            </Box>
                            <Box fontStyle="italic" mt="16px" fontSize={["16px", "16px", "28px", "36px"]}>
                                30% Discount Promo
                            </Box>
                            <Button onClick={()=>router.push("/collection")} h="53px" p={["12px 24px"]} colorScheme='blackAlpha' bg="black" mt="16px">
                                <Box mr="10px">
                                    Shop Now
                                </Box>
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.6667 1.66666L1 13.3333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M2.16669 1.66666H12.6667V12.1667" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </Button>
                        </Center>
                        <Img src='/images/slider/1.png' />
                    </Flex>
                </SwiperSlide>
                <SwiperSlide>
                    <Flex bg="#d7efdc" justifyContent={"space-between"} flexDir={["column", "column", "column", "row"]} pt="30px" pr="30px" borderRadius="24px" h={["auto", "auto", "auto", "600px"]}>
                        <Center flexDir="column" alignItems={"self-start"} p="20px">
                            <Box mt={["20px", "0px"]} lineHeight={["40px", "40px", "40px", "70px"]} fontWeight="bolder" fontSize={["32px", "38px", "38px", "58px"]}>
                            Savor the Season{"`"}s Hottest Looks!
                            </Box>
                            <Box fontStyle="italic" mt="16px" fontSize={["16px", "16px", "28px", "36px"]}>
                                30% Discount Promo
                            </Box>
                            <Button onClick={()=>router.push("/collection")} h="53px" p={["12px 24px"]} colorScheme='blackAlpha' bg="black" mt="16px">
                                <Box mr="10px">
                                    Shop Now
                                </Box>
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.6667 1.66666L1 13.3333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M2.16669 1.66666H12.6667V12.1667" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </Button>
                        </Center>
                        <Img src='/images/slider/1.png' />
                    </Flex>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

