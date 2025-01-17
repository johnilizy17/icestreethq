import { Box, Center, Flex, Img, Radio, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { paypal } from '../../../../services/Variable';

export default function InternationPayment({ paymentSuccessfull, userDetails, SumTotalFunction }) {

    const [initialOptions, setInitialOptions] = useState({
        clientId: "AUawWQI0GwmlCKSu2xCheH1X8btyru4yip3ajBzpf7-5zxzXNVYV6tHoIXSIPsR1WKm0Skk4ZsJwHcrP",
        currency: "USD",
        intent: "capture",
    })

    const amountToPay = "19.99";

    useEffect(() => {
        console.log(SumTotalFunction, "SumTotalFunction")
        if (localStorage.getItem("currency") === "GBP") {
            setInitialOptions({
                clientId: "AUawWQI0GwmlCKSu2xCheH1X8btyru4yip3ajBzpf7-5zxzXNVYV6tHoIXSIPsR1WKm0Skk4ZsJwHcrP",
                currency: "GBP",
                intent: "capture",
            })
        }
    }, [])

    return (
        <Box pos="relative">
            <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: SumTotalFunction / 100, // Specify the amount to be paid
                                    },
                                },
                            ],
                        });
                    }}
                    onApprove={(data, actions) => {
                        return actions.order.capture().then((details) => {
                            paymentSuccessfull()
                        });
                    }}
                    onError={(err) => {
                        console.error("PayPal Checkout Error", err);
                    }}
                />
            </PayPalScriptProvider>
        </Box>
    );
}