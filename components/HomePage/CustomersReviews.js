 import { Box, Flex ,Img, SimpleGrid, Text} from '@chakra-ui/react'
import React from 'react'
import ReviewsBox from './ReviewsBox'
import { data } from './FAQData'
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

 const CustomersReviews = () => {
  const exampleVariant = {
    visible: {y: [-20, 50, 0],  transition:{ type:"spring",duration: 2, ease: "linear", bounce:0.2}},
     hidden: {y: 0},
  }

  const control = useAnimation()
  const [ref, inView] = useInView()

  useEffect(()=>{
    if(inView){
      control.start("visible")
    }else{
      control.start("hidden")
    }

  }, [control, inView])
   return (
    
     <Flex flexDir={['column','column','row']} bg='#000' p={["100px 30px", null,"100px 0px"]}>
        <Box bgImage='url(/icons/blur.svg)' w={['100%', null,'40%']}
         bgRepeat='no-repeat'
          bgSize='contain'
          h={['unset', null,'500px']}
          pl={['0', null,'60px']}
          >
           
              <Text
               fontWeight='500'
               fontSize={['25px',null,'40px']}
               lineHeight={['35px',null,'55px']}
               color='#ffffff'
               mb={['100px', null,'unset']}
               maxW={['100%',null,'400px']}
               textAlign={['center', null,'unset']}  
               textTransform="capitalize"       
             >
                What our <span style={{fontWeight:"700"}}>customers are saying?</span>
             </Text>
        </Box>
       <SimpleGrid columns={[1, 2, 2]} spacing={10}  w={['100%', null,'60%']} pr={['0', null,'60px']}>
          {data.map((item, index)=>{
            return (
                <ReviewsBox key={index} data={item}/>
            )
          })}
       </SimpleGrid>
     </Flex>
   )
 }
 
 export default CustomersReviews
 