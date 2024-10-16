import { Box, Center, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

const CartHeader = () => {

    const router = useRouter()
    return (
        <Box pb={["20px","30px"]} justifyContent="space-between" alignItems="center" className='w-full flex flex-row  lg:items-center lg:border-b lg:pb-3 pb-4 py-3 lg:px-4 lg:border-[#D9D9D9] ' >
            {/* <span className='font-medium text-base' >Christmas</span> */}
            <Center onClick={()=>router.back()} w="35px" h="35px" borderRadius="40px" background="black">
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5H15M1 5L5 9M1 5L5 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </Center>
            <Center>
                <b className='font-extrabold inline-block mx-auto'>Cart Summary</b>
                <svg style={{marginLeft:10}} width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 15C3.53043 15 4.03914 15.2107 4.41421 15.5858C4.78929 15.9609 5 16.4696 5 17C5 17.5304 4.78929 18.0391 4.41421 18.4142C4.03914 18.7893 3.53043 19 3 19C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17C1 16.4696 1.21071 15.9609 1.58579 15.5858C1.96086 15.2107 2.46957 15 3 15ZM3 15H10M3 15V1H1M3 3L17 4L16.425 8.022M11.5 11H3M18 13H15.5C15.1022 13 14.7206 13.158 14.4393 13.4393C14.158 13.7206 14 14.1022 14 14.5C14 14.8978 14.158 15.2794 14.4393 15.5607C14.7206 15.842 15.1022 16 15.5 16H16.5C16.8978 16 17.2794 16.158 17.5607 16.4393C17.842 16.7206 18 17.1022 18 17.5C18 17.8978 17.842 18.2794 17.5607 18.5607C17.2794 18.842 16.8978 19 16.5 19H14M16 19V20M16 12V13" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </Center>
            <Box />
        </Box>
    )
}

export default CartHeader