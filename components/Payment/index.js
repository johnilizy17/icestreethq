import { Box, Center, Flex, Img, Radio, useToast } from '@chakra-ui/react';
import React from 'react';
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
        paymentSuccessfull()
    };

    // Config setting
    const config = {
        reference: (new Date()).getTime().toString(),
        email: userDetails && userDetails?.user ? userDetails?.user.email : "johnabrahamtosin@gmail.com",
        amount: SumTotalFunction, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: 'pk_test_05010684d9dbcd82b2b931fa886f9b01904e5d78',
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
            <Center cursor="pointer" p="10px" justifyContent="space-between" bg="whitesmoke" borderRadius={"14px"}>
                <Center>
                    <Img h="40px" src="/images/download.png" />
                    <Box fontWeight="800">
                        Pay Stack
                    </Box>
                </Center>

                <Radio colorScheme='black' isChecked={false} value='2'></Radio>
            </Center>
            <PaystackButton className="paystack-button" {...componentProps} />
        </Box>
    );
}