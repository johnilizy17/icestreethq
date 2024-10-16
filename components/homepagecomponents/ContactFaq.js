import React from 'react'
import { Box, Flex, Text, Stack } from '@chakra-ui/react'
import {BsFillTelephoneFill} from 'react-icons/bs'
import {IoLocation} from 'react-icons/io'
import {MdLocationPin} from 'react-icons/md'
import { AiFillAccountBook } from 'react-icons/ai'

const ContactFaq = () => {
  return (
    <Box justifyContent="center" opacity={1} p={['10rem 30px 0 30px', '10rem 30px 0 30px', '10rem 60px 0 60px']}>
            <Text
              fontSize={['12px', '14px', '15px']}
              lineHeight={['20px', '22px', "25px"]}
              color="rgba(137, 65, 255, 1)"
              textAlign="center"
            >
                REACH OUT
            </Text>
            <Text
               fontSize={['30px', '38px', '60px']}
               lineHeight={['40px', '60px', "90px"]}
               color="#ffffff"
               fontWeight="500"
               textAlign="center"
               textTransform='capitalize'
            >
                Do you have any <span className='gradient-text'>questions ?</span>
            </Text>
            <Stack spacing={['24px']}  m='30px auto' justify={['center']} direction={['column', 'row', 'row']}>
                <Flex maxW={['100%','33%']} alignItems="center">
                     <Box display="flex" alignItems="center" justifyContent="center" w='30px' h='30px' fontSize={['14px', '16px', '18px']} bg="rgba(137, 65, 255, 1)" color="#ffffff"><BsFillTelephoneFill/></Box>
                    <Text color="#ffffff" fontSize={['12px', '14px', '15px']} lineHeight={['20px', '22px', "25px"]} ml='10px'>+234 706 270 6933</Text>
                </Flex>
                <Flex maxW={['100%','33%']} alignItems="center">
                  <Box display="flex" alignItems="center" justifyContent="center" w='30px' h='30px' fontSize={['14px', '16px', '18px']} bg="rgba(137, 65, 255, 1)" color="#ffffff"><AiFillAccountBook/></Box>
                  <Text color="#ffffff" fontSize={['12px', '14px', '15px']} lineHeight={['20px', '22px', "25px"]} ml='10px'>hello@awefun.io</Text>
                </Flex>
                <Flex maxW={['100%','33%']} alignItems="center">
                    <Box display="flex" alignItems="center" justifyContent="center" w='55px' h='35px' fontSize={['14px', '16px', '18px']} bg="rgba(137, 65, 255, 1)" color="#ffffff">
                    <MdLocationPin/></Box><Text color="#ffffff" fontSize={['12px', '14px', '15px']} lineHeight={['20px', '22px', "25px"]} ml='10px'>Lagos, Nigeria</Text>

                </Flex>

            </Stack>
        </Box>
  )
}

export default ContactFaq
