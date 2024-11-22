import { Box, Center, Flex, Img, Radio, useToast } from '@chakra-ui/react';
import React from 'react';
import { PaystackButton } from 'react-paystack';

export default function InternationPayment({ paymentSuccessfull, userDetails, SumTotalFunction }: any) {

    const toast = useToast();
    // you can call this function anything

    return (
        <Box >
            <Center cursor="pointer" h="50px" p="10px" justifyContent="space-between" bg="whitesmoke" borderRadius={"14px"}>
                <Center>
                    <Img mr="10px" ml="10px" h="30px" src="/images/paypal.png" />
                    <Box fontWeight="800">
                        PayPal
                    </Box>
                </Center>

                <Radio colorScheme='black' isChecked={false} value='2'></Radio>
            </Center>
        </Box>
    );
}