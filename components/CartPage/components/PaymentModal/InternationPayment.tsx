import { Box, Center, Flex, Img, Radio, useToast } from '@chakra-ui/react';
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { paypal } from '../../../../services/Variable';

export default function InternationPayment({ paymentSuccessfull, userDetails, SumTotalFunction }: any) {

    const initialOptions = {
        clientId: "test",
        currency: "USD",
        intent: "capture",
    };

    return (
        <Box pos="relative">
            <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons />
            </PayPalScriptProvider>
        </Box>
    );
}