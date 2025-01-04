import { Box, HStack, Input, Img, Text, Textarea, Flex, Center, Button, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { brevoApIkEY } from '../../services/Variable';

const ContactForm = () => {

   const [loading, setLoading] = useState(false);
   const [data, setData] = useState({})

   const toast = useToast()
   async function ContactFuntion() {
      try {
         setLoading(true)
         const response = await axios.post(
            'https://api.brevo.com/v3/smtp/email',
            {
               sender: { name: `${data.last},${data.first}`, email: data.email },
               to: [{ email: "support@icestreethq.com", name: `${data.last},${data.first}` }],
               subject: `New Contact Us Message from ${data.last},${data.first}`,
               htmlContent: `<p><strong>Name:</strong> ${data.last} ${data.first}</p>
                      <p><strong>Email:</strong> ${data.email}</p>
                      <p><strong>Message:</strong></p>
                      <p>${data.message}</p>`,
            },
            {
               headers: {
                  'Content-Type': 'application/json',
                  'api-key': brevoApIkEY
               },
            }
         );
         setData({})

         toast({
            title: "Message successfully sent",
            status: "success",
            position: "top-right"
         })
         setLoading(false)
      } catch (error) {
         console.error('Error sending email:', error.response?.data || error.message);
         setLoading(false)
      }
   }



   return (
      <Flex justifyContent="center" pb="40px" pos="relative" mt='50px'>
         <Box pos="absolute" w='70%' left={0} top={0} h='30rem'><Img src="/icons/blur.svg" h='100%' objectFit="contain" /></Box>
         <Box w={['100%', '80%', null, '60%']} boxShadow='lg' p={["30px 30px", "30px 40px", null, "30px 80px"]}>
            <HStack m='20px 0' spacing={[4, 4, 8]} >
               <Input
                  placeholder='first name'
                  borderRadius={0}
                  _focus={{ border: '1px solid blue' }}
                  border={"1px solid black"}
                  value={data.first}
                  onChange={(e) => {
                     setData({ ...data, "first": e.target.value })
                  }}
                  color="#000"
                  fontSize={['10px', '12px', '14px']}
                  lineHeight={['15px', '18px', "20px"]}
               >
               </Input>
               <Input
                  placeholder='last name'
                  borderRadius={0}
                  value={data.last}
                  onChange={(e) => {
                     setData({ ...data, "last": e.target.value })
                  }}
                  _focus={{ border: '1px solid blue' }}
                  border={"1px solid black"}
                  color="#000"
                  fontSize={['10px', '12px', '14px']}
                  lineHeight={['20px', '22px', "25px"]}
               >
               </Input>

            </HStack>
            <HStack m='20px 0' spacing={[4, 4, 8]}>
               <Input
                  placeholder='phone number'
                  borderRadius={0}
                  value={data.number}
                  onChange={(e) => {
                     setData({ ...data, "number": e.target.value })
                  }}
                  _focus={{ border: '1px solid blue' }}
                  border={"1px solid black"}
                  color="#000"
                  fontSize={['10px', '12px', '14px']}
                  lineHeight={['20px', '22px', "25px"]}
               >
               </Input>
               <Input
                  placeholder='email'
                  borderRadius={0}
                  value={data.email}
                  onChange={(e) => {
                     setData({ ...data, "email": e.target.value })
                  }}
                  _focus={{ border: '1px solid blue' }}
                  border={"1px solid black"}
                  color="#000"
                  fontSize={['10px', '12px', '14px']}
                  lineHeight={['20px', '22px', "25px"]}
               >
               </Input>

            </HStack>
            <Textarea
               placeholder='message'
               borderRadius={0}
               onChange={(e) => {
                  setData({ ...data, "message": e.target.value })
               }}
               _focus={{ border: '1px solid blue' }}
               border={"1px solid black"}
               color="#000"
               h='15rem'
               fontSize={['10px', '12px', '14px']}
               lineHeight={['20px', '22px', "25px"]}
            />
            <Center m='70px 0 20px 0'>
               <Button
                  alignItems='center'
                  bg='black'
                  w="250px"
                  borderRadius='10px'
                  p="8px 15px"
                  onClick={() => ContactFuntion()}
                  isLoading={loading}
                  color='white'>
                  <Text
                     fontFamily="THICCCBOI"
                     fontSize="14px"
                     lineHeight="25px"
                     cursor="pointer"
                     pr={2}
                  >submit</Text>
               </Button>
            </Center>
         </Box>
      </Flex>
   )
}

export default ContactForm
