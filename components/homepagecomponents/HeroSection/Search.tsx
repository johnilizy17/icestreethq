import { Box, Center, Flex, IconButton, Input } from '@chakra-ui/react';
import React from 'react';
import { COLORS } from '../../../services/theme/colors';
import { useRouter } from 'next/router';

export default function HeroSearch() {

    const router = useRouter();

    return (
        <div className='lg:px-[32px] pb-[8px] mb-4 lg:mb-0 px-3 lg:pb-[32px]' style={{ position: "relative" }} >
            <Box>
                <Center bg="#F7F7F7" w="full" h={["124px","224px"]}>
                    <Center overflow="hidden" bg={COLORS.white} borderRadius="8px" h="60px" w={["80vw", "80vw", "80vw", "60vw"]}>
                        <input placeholder='' onChange={(e)=>{
                            router.push({pathname:"/search", query:{search:e.target.value}})
                        }} style={{width:"100%", height:60, outline:"none", padding:10}}/>
                        <IconButton aria-label='' bg={COLORS.black} height={"60px"} width="80px" colorScheme='black'>
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 25.5C20.799 25.5 25.5 20.799 25.5 15C25.5 9.20101 20.799 4.5 15 4.5C9.20101 4.5 4.5 9.20101 4.5 15C4.5 20.799 9.20101 25.5 15 25.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M31.5 31.5L22.5 22.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </IconButton>
                    </Center>
                </Center>
            </Box>
        </div>
    )
}