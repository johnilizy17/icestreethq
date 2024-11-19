import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { closePaymentModal, useFlutterwave } from 'flutterwave-react-v3';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { cashFormat } from '../../../utils/cashFormat';
import { deleteLocalStorageKeysByValue } from '../../../utils/localStorage.utils';
import PaymentOption from './PaymentOption';


type props = {
    isOpen: boolean
    setIsOpen: any
    paymentAmount: number
    paymentFrequency: string
    paymentPlanId: number
    customer: {
        email: string,
        phone_number: string,
        name: string
    }
}

type customerObj = {
    email: string,
    phone_number: string,
    name: string
}

// const getFlutterWaveConfig = (paymentAmount: number, customer: customerObj, payment_plan?: number) => {

//     return {
//         public_key: process.env["NEXT_PUBLIC_FLUTTERWAVE_TEST_KEY_PUBLIC"] ?? '',
//         tx_ref: Date.now().toString(),
//         amount: paymentAmount,
//         currency: 'NGN',
//         payment_options: 'card,mobilemoney,ussd',
//         payment_plan: payment_plan?.toString() ?? undefined,
//         customer: {
//             ...customer
//         },
//         customizations: {
//             title: 'my Payment Title',
//             description: 'Payment for items in cart',
//             logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
//         },
//     }
// }


export default function PaymentModal({ isOpen, setIsOpen, paymentAmount, customer, paymentPlanId }: props) {
    const [paymentMethod, setPaymentMethod] = useState<PaymentOptionKind>("wallet")
    // const config = getFlutterWaveConfig(paymentAmount, customer, paymentPlanId)
    const [cartId, setCartId] = useState<string>()

    const route = useRouter()

    // const handleFlutterPayment = useFlutterwave(config);


    const selectPaymentMethod = (item: PaymentOptionKind) => {
        setPaymentMethod(item)
    }

    const handlePaymentSelected = (option: PaymentOptionKind) => {
        //close modal
        setIsOpen(false)

        // handle payment option selected
        // switch (option) {
        //     case 'flutterwave':
        //         handleFlutterPayment({
        //             callback(response) {
        //                 closePaymentModal()
        //                 route.push("/order-summary")
        //                 deleteLocalStorageKeysByValue(cartId)
        //             },
        //             onClose() {

        //             },
        //         })
        //     default:
        //         toast.error("invalid payment method")
        // }
    }

    useEffect(() => {
        const id = localStorage.getItem("cartId")
        if (!id) return
        setCartId(id)
    }, [])

    return (
        <Modal onClose={setIsOpen} size="2xl" isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader className=' text-center mt-6' >Select any payment option</ModalHeader>
                {/* <ModalCloseButton /> */}
                <ModalBody className=' flex flex-col items-center' >
                    <div className=' lg:px-10 text-xs lg:text-base leading-normal w-full mb-10 space-y-6' >
                        <p className=' font-normal text-center mb-10' >Use one of the payment option below to pay {cashFormat(paymentAmount)} to Massbuy Ltd</p>
                        <PaymentOption
                            imageUrl='/images/icon/wallet.svg'
                            text='Pay from wallet'
                            paymentMethod={"wallet"}
                            activeMethod={paymentMethod}
                            handleClick={selectPaymentMethod} />
                        <PaymentOption
                            imageUrl='/images/icon/wallet.svg'
                            text='Bank transfer, deposit & POS'
                            paymentMethod={"bank_transfer"}
                            activeMethod={paymentMethod}
                            handleClick={selectPaymentMethod} />
                    </div>
                    <button onClick={() => handlePaymentSelected(paymentMethod)} className=' rounded-md w-[200px] text-[15] bg-[#000] h-[40px] font-semibold text-white ' >Continue</button>
                </ModalBody>
                <ModalFooter>
                    {/* <Button onClick={()=> setIsOpen(false)}>Close</Button> */}
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
} 