import { Box, Center, Flex, Img, Radio, useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { PaystackButton } from 'react-paystack';

export default function PaymentCheckout({ paymentSuccessfull, userDetails, SumTotalFunction }) {

    const toast = useToast();
    // you can call this function anything
    const handlePaystackSuccessAction = (reference) => {
        toast({
            title: "Payment",
            description: "Payment process wait a minute to complete the process",
            position: "top-right",
            status: "success",
            isClosable: true,
        })
        paymentSuccessfull(reference)
    };

    // Config setting
    const config = {
        reference: (new Date()).getTime().toString(),
        email: userDetails && userDetails?.user ? userDetails?.user.email :  userDetails?.user.email,
        amount: SumTotalFunction, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: "pk_live_e0f7f264648d319f3d4352079bb0c2f6cac6b53c"
    };

    // you can call this function anything
    const handlePaystackCloseAction = (e) => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        toast({
            title: "Payment",
            description: "Payment cancel by user",
            position: "top-right",
            status: "error",
            isClosable: true,
        })
    }

    const componentProps = {
        ...config,
        text: '',
        onSuccess: (reference) => handlePaystackSuccessAction(reference),
        onClose: handlePaystackCloseAction,
    };

    return (
        <Box pos="relative">
            <Center cursor="pointer" p="10px" bg="whitesmoke" borderRadius={"14px"}>
                <Center>
                    <Img h="40px" src="/images/download.png" />
                    <Box fontWeight="800">
                        Pay Stack
                    </Box>
                </Center>
            </Center>
            <PaystackButton className="paystack-button" {...componentProps} />
        </Box>
    );
}