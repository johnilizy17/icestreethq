import { Box, Center, Flex, Img, Radio, useToast } from '@chakra-ui/react';
import React from 'react';
import { PaystackButton } from 'react-paystack';

export default function PaymentCheckout({ paymentSuccessfull, userDetails, SumTotalFunction }) {

    const toast = useToast();
    // you can call this function anything

    return (
        <Box >
            <Center cursor="pointer" p="10px" justifyContent="space-between" bg="whitesmoke" borderRadius={"14px"}>
                <Center>
                    <Img h="40px" src="/images/download.png" />
                    <Box fontWeight="800">
                        Pay Stack
                    </Box>
                </Center>

                <Radio colorScheme='black' isChecked={false} value='2'></Radio>
            </Center>
        </Box>
    );
}