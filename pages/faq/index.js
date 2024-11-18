
import React from 'react'
import { Box,Text } from '@chakra-ui/react'
import FAQ from '../../components/HomePage/FAQ'
import { driverFaqData } from '../../components/HomePage/FAQData'
import MenuLayout from '../../components/MenuLayout'

const FAQs = () => {
  return (
    <MenuLayout menu={false} category={false}>
        
    <Box bg='#FFF' p={['0 30px', '0 30px', '0 60px']} >       
        <Box 
         fontSize={['12px', '14px', '14px']}
         lineHeight={['20px', '22px', "25px"]}
         color="#7d7e81"
         textAlign="center"
         pt='2rem'
        >{"Have questions? We're here to help"}</Box>
        <Text
                fontSize={['40px', '50px', '60px']}
                lineHeight={['55px', '70px', "90px"]}  
               color="#7d7e81"
               fontWeight="500"
               textAlign="center"
               textTransform='capitalize'
               
            >
                frequently asked <span className='gradient-text'>questions.</span>
        </Text>
        <FAQ faqData={driverFaqData} show/>
    </Box>
    </MenuLayout>
  )
}

export default FAQs
