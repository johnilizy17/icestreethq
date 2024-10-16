import { Avatar, Box , Text, Img} from '@chakra-ui/react'
import React from 'react'
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const ReviewsBox = ({data}) => {
    const {text, img, name} = data
    const exampleVariant = {
      visible: {y: [-50, -70, 0],  transition:{ type:"spring",duration: 2, ease: "linear", bounce:0.2}},
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
    <Box border='1px solid rgba(137, 65, 255, 1)' transition="all .6s linear"
        bg='#021E2A' borderRadius='18px' p="40px 20px" _hover={{transform: "scale(1.1)",boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)",}} >
        <Avatar src={img}/>
        <Text 
         fontWeight="700"
         ffontSize={['12px',"15px","17px"]}
         lineHeight={['20px',"22px","25px"]}
         color="#ffffff"
         p="10px 0"
        >{name}</Text>
        <Text
          fontWeight="400"
          fontSize={['12px',null,"14px"]}
          lineHeight={['20px',null,"25px"]}
          color="#ffffff"
        >{text}</Text>
    </Box>
  )
}

export default ReviewsBox
