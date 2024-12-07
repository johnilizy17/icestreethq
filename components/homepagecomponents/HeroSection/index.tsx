import { CategoryData } from '../../../assets/dataBank';
import IconComponent from '../IconComponent';
import { Box, Button, Center, Flex, IconButton, Img, useRadio } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required swiper modules
import { Swiper as SwiperType, Navigation, Autoplay } from 'swiper';
import SwiperImage from './components/SwiperImage';
import { COLORS } from '../../../services/theme/colors';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { getBanner } from '../../../services/productService';
import { imagePath } from '../../../services/Variable';

export default function HeroSection() {

    const router = useRouter()
    const [banner, setBanner] = useState([])
    const swiperRef = useRef<SwiperType>();

    const [windowSize, setWindowSize] = useState(2);
    const [size, setSize] = useState(false);

    useEffect(() => {
        // Function to update the window size
        const handleResize = () => {
            if (window.innerWidth > 900) {
                setSize(false)
                setWindowSize(2);
            } else {
                setSize(true)
                setWindowSize(1);
            }

        };

        // Set the initial window size
        handleResize();

        // Add resize event listener
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    async function FetchBannerApi() {
        const data = await getBanner()
        setBanner(data)
    }

    useEffect(() => {
        FetchBannerApi()
    }, [])

    return (
        <div className=' flex lg:flex-row flex-col w-full lg:px-[32px] pb-[8px] mb-4 lg:mb-0 px-3 lg:pb-[32px]' style={{ position: "relative" }} >
            <IconButton
                onClick={() => swiperRef.current?.slidePrev()}
                className="#js-prev1"
                display={["none", "none", "none", "flex"]} h="30px" bg={COLORS.white} colorScheme='white' aria-label='' pos="absolute" zIndex={2} right="110px" top="30px">
                <svg width="7" height="15" viewBox="0 0 10 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 1.42996L1 10.2993L9 19.1687" fill="white" />
                    <path d="M9 1.42996L1 10.2993L9 19.1687" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </IconButton>
            <IconButton
                onClick={() => swiperRef.current?.slideNext()}
                className="#js-prev1" display={["none", "none", "none", "flex"]} h="30px" bg={COLORS.white} colorScheme='white' aria-label='' pos="absolute" zIndex={2} right="60px" top="30px">
                <svg width="7" height="15" viewBox="0 0 10 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.42996L9 10.2993L1 19.1687" fill="white" />
                    <path d="M1 1.42996L9 10.2993L1 19.1687" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </IconButton>
            <IconButton
                onClick={() => swiperRef.current?.slidePrev()}
                className="#js-prev1" display={["flex", "flex", "flex", "none"]} bg={COLORS.white} colorScheme='white' aria-label='' pos="absolute" zIndex={2} right="70px" top="20px">
                <svg width="7" height="18" viewBox="0 0 10 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 1.42996L1 10.2993L9 19.1687" fill="white" />
                    <path d="M9 1.42996L1 10.2993L9 19.1687" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </IconButton>
            <IconButton
                onClick={() => swiperRef.current?.slideNext()}
                className="#js-prev1" display={["flex", "flex", "flex", "none"]} bg={COLORS.white} colorScheme='white' aria-label='' pos="absolute" zIndex={2} right="25px" top="20px">
                <svg width="7" height="18" viewBox="0 0 10 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.42996L9 10.2993L1 19.1687" fill="white" />
                    <path d="M1 1.42996L9 10.2993L1 19.1687" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </IconButton>
            <Swiper
                slidesPerView={windowSize} // Display 2 slides per view
                centeredSlides={size} // Align slides to the start
                spaceBetween={30}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                slideNextClass='js-prev1'
                modules={[Autoplay, Navigation]}
                className="w-full"
                onBeforeInit={(swiper: any) => {
                    swiperRef.current = swiper;
                }}
            >
                {banner.map((a: any, b: number) => (
                    <SwiperSlide key={b}>
                        <Flex bg={a.color} color={a.text_color} justifyContent={"space-between"} flexDir={["column", "column", "column", "column"]} pt="30px" pr="30px" borderRadius={["8px", "16px", "24px"]} h={["auto", "auto", "auto", "auto"]}>
                            <Center flexDir="column" alignItems={"self-start"} p="20px">
                                <Box mt={["20px", "0px"]} lineHeight={["40px", "40px", "40px", "70px"]} fontWeight="bolder" fontSize={["32px", "38px", "38px", "58px"]}>
                                    {a.title}
                                </Box>
                                <Box fontStyle="italic" mt="16px" fontSize={["16px", "16px", "28px", "36px"]}>
                                    {a.discount}
                                </Box>
                                <Button onClick={() => router.push("/brand")} h="53px" p={["12px 24px"]} colorScheme='blackAlpha' bg="black" mt="16px">
                                    <Box mr="10px">
                                        {a.button}
                                    </Box>
                                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.6667 1.66666L1 13.3333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M2.16669 1.66666H12.6667V12.1667" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </Button>
                            </Center>
                            <Img src={imagePath + "/" + a.image} ml="20px" />
                        </Flex>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

