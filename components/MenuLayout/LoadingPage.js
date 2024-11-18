import React from 'react';
import { Box, Center, Flex, Grid, Image, Spinner } from '@chakra-ui/react'
import Lottie from 'react-lottie';
import Loading from '../../assets/lottie/loading.json'

export default function LoadingPage({display}) {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Loading,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <Center display={display?"flex":"none"} zIndex={9000} background="#000" pos="fixed" top="0px" h="100vh" w="100vw">
            <Box display={["block", "none"]}>
                <Lottie options={defaultOptions}
                    height={300}
                    width={300} />
                <Box textAlign="center" fontSize="20px" fontWeight="900" color="#FFF">
                    Loading...
                </Box>
            </Box>
            <Box display={["none", "block"]}>
                <Lottie options={defaultOptions}
                    height={450}
                    width={450} />
                <Box textAlign="center" fontSize="20px" fontWeight="900" color="#FFF">
                    Loading...
                </Box>
            </Box>
        </Center>
    )
}