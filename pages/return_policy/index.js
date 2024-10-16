
import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import FAQ from '../../components/HomePage/FAQ'
import { advertiserFaqData } from '../../components/HomePage/FAQData'
import MenuLayout from '../../components/MenuLayout'

const ReturnPolicy = () => {
    return (
        <MenuLayout menu={false} category={false}>

            <Box bg='#FFF' p={['0 30px', '0 30px', '0 60px']} >
                <Text
                    fontSize={['12px', '14px', '14px']}
                    lineHeight={['20px', '22px', "25px"]}
                    fontFamily="THICCCBOI"
                    color="#000"
                    textAlign="center"
                    pt='10rem'
                >{"Have questions? We're here to help"}</Text>
                <Text
                    fontSize={['40px', '50px', '60px']}
                    lineHeight={['55px', '70px', "90px"]}
                    fontFamily="THICCCBOI"
                    color="#000"
                    fontWeight="900"
                    textAlign="center"
                    textTransform='capitalize'

                >
                    Return <span className='gradient-text'>Policy.</span>
                </Text>
                <Text
                    fontSize={'17px'}
                    color="#000">
             {"At Ice Street, we want you to love your purchase. If you're not completely satisfied with your order, we offer a hassle-free return process to ensure your shopping experience remains smooth and enjoyable."}
                </Text>
                <Text
                    color="#000"
                    mb="-50px"
                    mt="50px"
                    fontWeight="500"
                    fontSize={['40px', '50px', '60px']}
                >
                    Eligibility for Returns
                </Text>
                <FAQ faqData={advertiserFaqData} show />
                <Text
                    fontSize={'17px'}
                    color="#000"
                    pb="100px"
                    >
                    If you checked out as a guest, you can visit our Returns page and enter your order number and email address to begin the return process.
                </Text>
            </Box>
        </MenuLayout>
    )
}

export default ReturnPolicy
