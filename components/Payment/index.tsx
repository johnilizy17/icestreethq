import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { usePaystackPayment } from 'react-paystack';
import useUserDetails from "../../hooks/auth.hook";

export default function PaymentMethod({ paymentSuccessfull }: { paymentSuccessfull: any }) {

    const [payment, setPayment] = useState("")
    const { userDetails } = useUserDetails()
    const config = {
        reference: (new Date()).getTime().toString(),
        email: userDetails&& userDetails?.user ?userDetails?.user.email:"",
        amount: 20000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: 'pk_live_e0f7f264648d319f3d4352079bb0c2f6cac6b53c',
    };

    // you can call this function anything
    const onSuccess = (reference: any) => {
        // Implementation for whatever you want to do with reference and after success call.
        console.log(reference);
    };

    // you can call this function anything
    const onClose = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
    }

    const initializePayment = usePaystackPayment(config);

    useEffect(() => {
        if (payment === "1") {
            initializePayment(onSuccess, onClose)
        } else if (payment === "2") {
            paymentSuccessfull(payment)
        }
        //  {
        //     paymentSuccessfull(payment)
        // }
    }, [payment])

    return (
        <RadioGroup onChange={setPayment} value={payment}>
            <Stack direction='column'>
                <Radio
                    value='1'>Paystack</Radio>
                <Radio value='2'>Strip</Radio>
                {/* <Radio value='3'>Third</Radio> */}
            </Stack>
        </RadioGroup>
    )


}