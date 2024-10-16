import { Box, HStack, Input, Img, Text, Textarea, Flex, Center } from '@chakra-ui/react'
import React from 'react'
import CustomInput from '../Form/CustomInput';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const ContactForm = () => {
  return (
    <Flex  justifyContent="center" pos="relative" mt='50px'>
        <Box pos="absolute"  w='70%' left={0} top={0} h='30rem'><Img src="/icons/blur.svg" h='100%' objectFit="contain"/></Box>
      <Box w={['100%', '80%', null, '60%']}  bg='#03141c' boxShadow='lg' p={["30px 30px", "30px 40px", null, "30px 80px"]}>
        <HStack m='20px 0' spacing={[4,4,8]} >
            <Input 
               placeholder='first name'
               borderRadius={0}
               _focus={{ border:'1px solid white'}}
               color="#ffffff"
               fontSize={['10px', '12px', '14px']} 
               lineHeight={['15px', '18px', "20px"]}
            >
            </Input>
            <Input 
               placeholder='last name'
               borderRadius={0}
               _focus={{ border:'1px solid white'}}
               color="#ffffff"
               fontSize={['10px', '12px', '14px']} 
               lineHeight={['20px', '22px', "25px"]}
            >
            </Input>

        </HStack>
        <HStack m='20px 0' spacing={[4,4,8]}>
            <Input 
               placeholder='phone number'
               borderRadius={0}
               _focus={{ border:'1px solid white'}}
               color="#ffffff"
               fontSize={['10px', '12px', '14px']} 
               lineHeight={['20px', '22px', "25px"]}
            >
            </Input>
            <Input 
               placeholder='email'
               borderRadius={0}
               _focus={{ border:'1px solid white'}}
               color="#ffffff"
               fontSize={['10px', '12px', '14px']}  
               lineHeight={['20px', '22px', "25px"]}
            >
            </Input>

        </HStack>
        <Textarea
          placeholder='message'
          borderRadius={0}
          _focus={{ border:'1px solid white'}}
          color="#ffffff"
          h='15rem'
          fontSize={['10px', '12px', '14px']} 
         lineHeight={['20px', '22px', "25px"]}
        />
        <Center m='70px 0 20px 0'><Flex alignItems='center' bg='rgba(137, 65, 255, 1)' borderRadius='24.5px' p="8px 15px" color='white'>
           <Text
            fontFamily="THICCCBOI"
            fontSize="14px"
            lineHeight="25px"
            cursor="pointer"
            pr={2}
            >submit</Text>
          <ArrowForwardIcon />
       </Flex>
       </Center>
    </Box>
    </Flex>
  )
}

export default ContactForm
