import React from 'react';
import { Box, Center, Flex, Grid, Image, Spinner } from '@chakra-ui/react'
import Lottie from 'react-lottie';
import Loading from '../../assets/lottie/loading.json'

export default function LoadingPage({ display }) {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Loading,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <Center display={display ? "flex" : "none"} zIndex={9000} background="#000" pos="fixed" top="0px" h="100vh" w="100vw">
            <Box display={["block", "none"]}>
                <Box>
                <svg width="200" height="64" viewBox="0 0 124 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M69 1.54744C70.3943 1.53879 71.7885 1.53015 73.225 1.52124C73.8814 1.51551 73.8814 1.51551 74.5511 1.50967C74.9013 1.50845 75.2514 1.50738 75.6016 1.5065C75.7807 1.50436 75.9598 1.50221 76.1444 1.5C77.4734 1.49962 78.7655 1.604 79.8105 2.52565C80.8351 3.82098 81.046 5.07464 80.9053 6.71795C80.6931 7.69664 80.3127 8.59254 79.5368 9.23334C79.0935 9.49969 78.6409 9.72511 78.1684 9.93205C78.2446 9.99006 78.3208 10.0481 78.3993 10.1078C80.2336 11.6203 81.1067 14.1959 82 16.3603C82 16.4064 82 16.4525 82 16.5C80.4195 16.5 78.8389 16.5 77.2105 16.5C77.0407 16.1332 76.8708 15.7665 76.6958 15.3886C76.5295 15.0327 76.3626 14.6772 76.1957 14.3216C76.0803 14.075 75.9655 13.828 75.8514 13.5807C75.6868 13.2247 75.5201 12.8699 75.353 12.5151C75.3027 12.4049 75.2523 12.2947 75.2004 12.1811C74.9069 11.5645 74.656 11.1333 74.0632 10.7705C73.7471 10.6783 73.4309 10.5861 73.1053 10.491C73.1053 12.474 73.1053 14.4569 73.1053 16.5C71.7505 16.5 70.3958 16.5 69 16.5C69 11.5657 69 6.63131 69 1.54744ZM73.1053 4.6218C73.1053 5.63634 73.1053 6.65087 73.1053 7.69616C74.8951 7.80482 74.8951 7.80482 76.4836 7.08205C76.7807 6.71081 76.7763 6.34749 76.8 5.87949C76.6948 5.44994 76.5894 5.24299 76.2783 4.93622C75.619 4.55149 74.8965 4.60436 74.1572 4.61306C73.6365 4.61739 73.6365 4.61739 73.1053 4.6218Z" fill="white" />
                    <path d="M98 1.5C101.586 1.5 105.171 1.5 108.866 1.5C108.866 2.56402 108.866 3.62804 108.866 4.7243C106.652 4.7243 104.439 4.7243 102.159 4.7243C102.159 5.46449 102.159 6.20467 102.159 6.96729C104.195 6.96729 106.231 6.96729 108.329 6.96729C108.329 7.98505 108.329 9.0028 108.329 10.0514C106.293 10.0514 104.257 10.0514 102.159 10.0514C102.159 11.0229 102.159 11.9944 102.159 12.9953C104.416 12.9953 106.674 12.9953 109 12.9953C109 14.1519 109 15.3084 109 16.5C105.37 16.5 101.74 16.5 98 16.5C98 11.55 98 6.6 98 1.5Z" fill="white" />
                    <path d="M84 1.5C87.5857 1.5 91.1715 1.5 94.8659 1.5C94.8659 2.56402 94.8659 3.62804 94.8659 4.7243C92.6524 4.7243 90.439 4.7243 88.1585 4.7243C88.1585 5.46449 88.1585 6.20467 88.1585 6.96729C90.1949 6.96729 92.2312 6.96729 94.3293 6.96729C94.3293 7.98505 94.3293 9.0028 94.3293 10.0514C92.2929 10.0514 90.2566 10.0514 88.1585 10.0514C88.1585 11.0229 88.1585 11.9944 88.1585 12.9953C90.4162 12.9953 92.6739 12.9953 95 12.9953C95 14.1519 95 15.3084 95 16.5C91.37 16.5 87.74 16.5 84 16.5C84 11.55 84 6.6 84 1.5Z" fill="white" />
                    <path d="M21 1.5C24.9117 1.5 28.8234 1.5 32.8537 1.5C32.8537 2.56402 32.8537 3.62804 32.8537 4.7243C30.439 4.7243 28.0244 4.7243 25.5366 4.7243C25.5366 5.46449 25.5366 6.20467 25.5366 6.96729C27.758 6.96729 29.9795 6.96729 32.2683 6.96729C32.2683 7.98505 32.2683 9.0028 32.2683 10.0514C30.0468 10.0514 27.8254 10.0514 25.5366 10.0514C25.5366 11.0229 25.5366 11.9944 25.5366 12.9953C27.9995 12.9953 30.4624 12.9953 33 12.9953C33 14.1519 33 15.3084 33 16.5C29.04 16.5 25.08 16.5 21 16.5C21 11.55 21 6.6 21 1.5Z" fill="white" />
                    <path d="M50.9792 1.59161C51.9076 2.41 52.3593 3.50237 52.5406 4.74598C52.4822 5.07603 52.4822 5.07603 52.4048 5.31306C51.1314 5.42622 49.8811 5.47308 48.6032 5.45482C48.5121 5.24837 48.4217 5.04156 48.3317 4.83458C48.2813 4.71945 48.2309 4.60432 48.1789 4.4857C48.0601 4.1789 48.0601 4.1789 48.0601 3.89536C46.8867 3.5798 46.8867 3.5798 45.752 3.89536C45.4487 4.29352 45.4487 4.29352 45.455 4.73712C45.5697 5.17482 45.5697 5.17482 45.8495 5.32309C46.6376 5.67293 47.4279 5.92734 48.2553 6.15481C49.8212 6.60686 51.4407 7.12444 52.3465 8.64906C52.9662 9.90621 53.1736 11.1535 52.8455 12.5555C52.4087 13.8612 51.7187 15.0906 50.5067 15.7359C48.5022 16.6205 45.9627 16.7901 43.9037 15.9635C42.7252 15.3834 41.8691 14.4488 41.3776 13.1835C41.1786 12.5142 41.0554 11.824 41 11.1256C41.4385 10.6677 43.0659 10.8438 43.7001 10.8332C44.1126 10.8332 44.5249 10.8355 44.9374 10.8421C44.9671 10.9464 44.9969 11.0508 45.0275 11.1583C45.3063 12.0538 45.4951 12.6375 46.2951 13.1104C46.9125 13.2963 47.4489 13.3214 48.0516 13.0749C48.494 12.8539 48.494 12.8539 48.739 12.4015C48.8466 11.5829 48.8466 11.5829 48.4595 10.8985C48.0092 10.5151 47.5925 10.3562 47.0418 10.2041C46.8476 10.1453 46.6535 10.086 46.4595 10.0263C46.3632 9.99707 46.2669 9.9678 46.1677 9.93766C44.3432 9.36413 42.7687 8.67975 41.8109 6.89633C41.3427 5.82619 41.381 4.51892 41.7552 3.42575C42.3196 2.16084 43.1448 1.40116 44.3943 0.918208C46.4548 0.258339 49.1532 0.306476 50.9792 1.59161Z" fill="white" />
                    <path d="M12.8415 1.50415C12.9671 1.50278 13.0928 1.50141 13.2222 1.5C14.809 1.51989 16.1031 2.00574 17.2907 3.0253C18.0901 3.83533 18.6594 5.01285 18.8626 6.10941C18.3475 6.24421 17.832 6.37753 17.3165 6.51059C17.1703 6.54886 17.0242 6.58713 16.8736 6.62656C16.7328 6.66276 16.5919 6.69896 16.4468 6.73626C16.3173 6.76987 16.1877 6.80349 16.0543 6.83812C15.7017 6.91178 15.7017 6.91178 15.152 6.91178C15.1187 6.84075 15.0854 6.76973 15.0511 6.69656C14.614 5.75351 14.614 5.75351 13.7557 5.20204C13.0308 5.01996 12.4221 4.99046 11.7222 5.26891C11.0423 5.68507 10.7245 6.29089 10.5009 7.02513C10.182 8.64004 10.1479 10.8033 11.0291 12.2609C11.5161 12.7132 11.9813 12.8908 12.6574 12.9426C13.361 12.9115 13.968 12.7094 14.5078 12.2693C14.8685 11.6322 15.0753 10.9498 15.2894 10.255C16.1641 10.4305 16.9965 10.6578 17.8404 10.9403C17.9529 10.9774 18.0653 11.0145 18.1811 11.0526C18.4542 11.1428 18.7271 11.2337 19 11.3248C18.7767 12.8535 18.1472 14.2974 16.9386 15.3366C15.1934 16.5818 13.0993 16.6389 11.0059 16.3679C9.50401 16.0836 8.34708 15.3039 7.47319 14.0997C6.95923 13.3506 6.59561 12.5959 6.35658 11.726C6.32593 11.6189 6.29529 11.5119 6.26371 11.4016C5.83194 9.56381 5.94544 7.50604 6.49401 5.70822C6.53068 5.5879 6.56735 5.46758 6.60513 5.34361C7.11636 3.91534 8.159 2.81255 9.51744 2.09756C10.6084 1.59009 11.6497 1.51415 12.8415 1.50415Z" fill="white" />
                    <path d="M111 1.5C115.29 1.5 119.58 1.5 124 1.5C124 2.74907 124 3.99813 124 5.28505C122.539 5.28505 121.077 5.28505 119.571 5.28505C119.571 8.98598 119.571 12.6869 119.571 16.5C118.157 16.5 116.743 16.5 115.286 16.5C115.286 12.7991 115.286 9.09813 115.286 5.28505C113.871 5.28505 112.457 5.28505 111 5.28505C111 4.03598 111 2.78692 111 1.5Z" fill="white" />
                    <path d="M55 1.5C58.96 1.5 62.92 1.5 67 1.5C67 2.74907 67 3.99813 67 5.28505C65.651 5.28505 64.302 5.28505 62.9121 5.28505C62.9121 8.98598 62.9121 12.6869 62.9121 16.5C61.6066 16.5 60.3011 16.5 58.956 16.5C58.956 12.7991 58.956 9.09813 58.956 5.28505C57.6505 5.28505 56.3451 5.28505 55 5.28505C55 4.03598 55 2.78692 55 1.5Z" fill="white" />
                    <path d="M0 1.5C1.32 1.5 2.64 1.5 4 1.5C4 6.45 4 11.4 4 16.5C2.68 16.5 1.36 16.5 0 16.5C0 11.55 0 6.6 0 1.5Z" fill="white" />
                </svg>
                </Box>
                {/* <Box textAlign="center" mt="10px" fontSize="20px" fontWeight="900" color="#FFF">
                    Loading...
                </Box> */}
            </Box>
            <Box display={["none", "block"]}>
               <svg width="154" height="37" viewBox="0 0 124 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M69 1.54744C70.3943 1.53879 71.7885 1.53015 73.225 1.52124C73.8814 1.51551 73.8814 1.51551 74.5511 1.50967C74.9013 1.50845 75.2514 1.50738 75.6016 1.5065C75.7807 1.50436 75.9598 1.50221 76.1444 1.5C77.4734 1.49962 78.7655 1.604 79.8105 2.52565C80.8351 3.82098 81.046 5.07464 80.9053 6.71795C80.6931 7.69664 80.3127 8.59254 79.5368 9.23334C79.0935 9.49969 78.6409 9.72511 78.1684 9.93205C78.2446 9.99006 78.3208 10.0481 78.3993 10.1078C80.2336 11.6203 81.1067 14.1959 82 16.3603C82 16.4064 82 16.4525 82 16.5C80.4195 16.5 78.8389 16.5 77.2105 16.5C77.0407 16.1332 76.8708 15.7665 76.6958 15.3886C76.5295 15.0327 76.3626 14.6772 76.1957 14.3216C76.0803 14.075 75.9655 13.828 75.8514 13.5807C75.6868 13.2247 75.5201 12.8699 75.353 12.5151C75.3027 12.4049 75.2523 12.2947 75.2004 12.1811C74.9069 11.5645 74.656 11.1333 74.0632 10.7705C73.7471 10.6783 73.4309 10.5861 73.1053 10.491C73.1053 12.474 73.1053 14.4569 73.1053 16.5C71.7505 16.5 70.3958 16.5 69 16.5C69 11.5657 69 6.63131 69 1.54744ZM73.1053 4.6218C73.1053 5.63634 73.1053 6.65087 73.1053 7.69616C74.8951 7.80482 74.8951 7.80482 76.4836 7.08205C76.7807 6.71081 76.7763 6.34749 76.8 5.87949C76.6948 5.44994 76.5894 5.24299 76.2783 4.93622C75.619 4.55149 74.8965 4.60436 74.1572 4.61306C73.6365 4.61739 73.6365 4.61739 73.1053 4.6218Z" fill="white" />
                    <path d="M98 1.5C101.586 1.5 105.171 1.5 108.866 1.5C108.866 2.56402 108.866 3.62804 108.866 4.7243C106.652 4.7243 104.439 4.7243 102.159 4.7243C102.159 5.46449 102.159 6.20467 102.159 6.96729C104.195 6.96729 106.231 6.96729 108.329 6.96729C108.329 7.98505 108.329 9.0028 108.329 10.0514C106.293 10.0514 104.257 10.0514 102.159 10.0514C102.159 11.0229 102.159 11.9944 102.159 12.9953C104.416 12.9953 106.674 12.9953 109 12.9953C109 14.1519 109 15.3084 109 16.5C105.37 16.5 101.74 16.5 98 16.5C98 11.55 98 6.6 98 1.5Z" fill="white" />
                    <path d="M84 1.5C87.5857 1.5 91.1715 1.5 94.8659 1.5C94.8659 2.56402 94.8659 3.62804 94.8659 4.7243C92.6524 4.7243 90.439 4.7243 88.1585 4.7243C88.1585 5.46449 88.1585 6.20467 88.1585 6.96729C90.1949 6.96729 92.2312 6.96729 94.3293 6.96729C94.3293 7.98505 94.3293 9.0028 94.3293 10.0514C92.2929 10.0514 90.2566 10.0514 88.1585 10.0514C88.1585 11.0229 88.1585 11.9944 88.1585 12.9953C90.4162 12.9953 92.6739 12.9953 95 12.9953C95 14.1519 95 15.3084 95 16.5C91.37 16.5 87.74 16.5 84 16.5C84 11.55 84 6.6 84 1.5Z" fill="white" />
                    <path d="M21 1.5C24.9117 1.5 28.8234 1.5 32.8537 1.5C32.8537 2.56402 32.8537 3.62804 32.8537 4.7243C30.439 4.7243 28.0244 4.7243 25.5366 4.7243C25.5366 5.46449 25.5366 6.20467 25.5366 6.96729C27.758 6.96729 29.9795 6.96729 32.2683 6.96729C32.2683 7.98505 32.2683 9.0028 32.2683 10.0514C30.0468 10.0514 27.8254 10.0514 25.5366 10.0514C25.5366 11.0229 25.5366 11.9944 25.5366 12.9953C27.9995 12.9953 30.4624 12.9953 33 12.9953C33 14.1519 33 15.3084 33 16.5C29.04 16.5 25.08 16.5 21 16.5C21 11.55 21 6.6 21 1.5Z" fill="white" />
                    <path d="M50.9792 1.59161C51.9076 2.41 52.3593 3.50237 52.5406 4.74598C52.4822 5.07603 52.4822 5.07603 52.4048 5.31306C51.1314 5.42622 49.8811 5.47308 48.6032 5.45482C48.5121 5.24837 48.4217 5.04156 48.3317 4.83458C48.2813 4.71945 48.2309 4.60432 48.1789 4.4857C48.0601 4.1789 48.0601 4.1789 48.0601 3.89536C46.8867 3.5798 46.8867 3.5798 45.752 3.89536C45.4487 4.29352 45.4487 4.29352 45.455 4.73712C45.5697 5.17482 45.5697 5.17482 45.8495 5.32309C46.6376 5.67293 47.4279 5.92734 48.2553 6.15481C49.8212 6.60686 51.4407 7.12444 52.3465 8.64906C52.9662 9.90621 53.1736 11.1535 52.8455 12.5555C52.4087 13.8612 51.7187 15.0906 50.5067 15.7359C48.5022 16.6205 45.9627 16.7901 43.9037 15.9635C42.7252 15.3834 41.8691 14.4488 41.3776 13.1835C41.1786 12.5142 41.0554 11.824 41 11.1256C41.4385 10.6677 43.0659 10.8438 43.7001 10.8332C44.1126 10.8332 44.5249 10.8355 44.9374 10.8421C44.9671 10.9464 44.9969 11.0508 45.0275 11.1583C45.3063 12.0538 45.4951 12.6375 46.2951 13.1104C46.9125 13.2963 47.4489 13.3214 48.0516 13.0749C48.494 12.8539 48.494 12.8539 48.739 12.4015C48.8466 11.5829 48.8466 11.5829 48.4595 10.8985C48.0092 10.5151 47.5925 10.3562 47.0418 10.2041C46.8476 10.1453 46.6535 10.086 46.4595 10.0263C46.3632 9.99707 46.2669 9.9678 46.1677 9.93766C44.3432 9.36413 42.7687 8.67975 41.8109 6.89633C41.3427 5.82619 41.381 4.51892 41.7552 3.42575C42.3196 2.16084 43.1448 1.40116 44.3943 0.918208C46.4548 0.258339 49.1532 0.306476 50.9792 1.59161Z" fill="white" />
                    <path d="M12.8415 1.50415C12.9671 1.50278 13.0928 1.50141 13.2222 1.5C14.809 1.51989 16.1031 2.00574 17.2907 3.0253C18.0901 3.83533 18.6594 5.01285 18.8626 6.10941C18.3475 6.24421 17.832 6.37753 17.3165 6.51059C17.1703 6.54886 17.0242 6.58713 16.8736 6.62656C16.7328 6.66276 16.5919 6.69896 16.4468 6.73626C16.3173 6.76987 16.1877 6.80349 16.0543 6.83812C15.7017 6.91178 15.7017 6.91178 15.152 6.91178C15.1187 6.84075 15.0854 6.76973 15.0511 6.69656C14.614 5.75351 14.614 5.75351 13.7557 5.20204C13.0308 5.01996 12.4221 4.99046 11.7222 5.26891C11.0423 5.68507 10.7245 6.29089 10.5009 7.02513C10.182 8.64004 10.1479 10.8033 11.0291 12.2609C11.5161 12.7132 11.9813 12.8908 12.6574 12.9426C13.361 12.9115 13.968 12.7094 14.5078 12.2693C14.8685 11.6322 15.0753 10.9498 15.2894 10.255C16.1641 10.4305 16.9965 10.6578 17.8404 10.9403C17.9529 10.9774 18.0653 11.0145 18.1811 11.0526C18.4542 11.1428 18.7271 11.2337 19 11.3248C18.7767 12.8535 18.1472 14.2974 16.9386 15.3366C15.1934 16.5818 13.0993 16.6389 11.0059 16.3679C9.50401 16.0836 8.34708 15.3039 7.47319 14.0997C6.95923 13.3506 6.59561 12.5959 6.35658 11.726C6.32593 11.6189 6.29529 11.5119 6.26371 11.4016C5.83194 9.56381 5.94544 7.50604 6.49401 5.70822C6.53068 5.5879 6.56735 5.46758 6.60513 5.34361C7.11636 3.91534 8.159 2.81255 9.51744 2.09756C10.6084 1.59009 11.6497 1.51415 12.8415 1.50415Z" fill="white" />
                    <path d="M111 1.5C115.29 1.5 119.58 1.5 124 1.5C124 2.74907 124 3.99813 124 5.28505C122.539 5.28505 121.077 5.28505 119.571 5.28505C119.571 8.98598 119.571 12.6869 119.571 16.5C118.157 16.5 116.743 16.5 115.286 16.5C115.286 12.7991 115.286 9.09813 115.286 5.28505C113.871 5.28505 112.457 5.28505 111 5.28505C111 4.03598 111 2.78692 111 1.5Z" fill="white" />
                    <path d="M55 1.5C58.96 1.5 62.92 1.5 67 1.5C67 2.74907 67 3.99813 67 5.28505C65.651 5.28505 64.302 5.28505 62.9121 5.28505C62.9121 8.98598 62.9121 12.6869 62.9121 16.5C61.6066 16.5 60.3011 16.5 58.956 16.5C58.956 12.7991 58.956 9.09813 58.956 5.28505C57.6505 5.28505 56.3451 5.28505 55 5.28505C55 4.03598 55 2.78692 55 1.5Z" fill="white" />
                    <path d="M0 1.5C1.32 1.5 2.64 1.5 4 1.5C4 6.45 4 11.4 4 16.5C2.68 16.5 1.36 16.5 0 16.5C0 11.55 0 6.6 0 1.5Z" fill="white" />
                </svg>
                {/* <Box textAlign="center" mt="10px" fontSize="20px" fontWeight="900" color="#FFF">
                    Loading...
                </Box> */}
            </Box>
        </Center>
    )
}