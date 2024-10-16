import { Input, Select, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import * as yup from 'yup'
import { useFormik } from 'formik';
import { UserAddress } from '../../../services/userDashboardServices';
import SpinLoader from '../../Loaders/SpinLoader';
import { WalletServices } from '../../../services/UserWalletServices';

export default function FundWallet({ getAmount }) {

    const [isShown, setIsShown] = React.useState("")
    const toast = useToast()
    const [loading, setLoading] = useState(false)
    console.log(process.env.FLUTTERWAVE_TEST_KEY_PUBLIC)
    const [data, setData] = useState({ email: "", phone: "", firstname: "", lastname: "" })
    const { AddFundFlotterwave } = WalletServices()

    const loginSchema = yup.object({
        amount: yup.string().required('Your amount is required')
    })

    const formik = useFormik({
        initialValues: { amount: 0 },
        validationSchema: loginSchema,
        onSubmit: () => { },
    });


    const config = {
        public_key: "FLWPUBK_TEST-e65723ed5ea79c6dbbd28cdaf25fa359-X",
        tx_ref: JSON.stringify(Date.now()),
        amount: formik.values.amount,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: data.email,
            phone_number: data.phone,
            name: `${data.lastname} ${data.firstname}`
        },
        customizations: {
            title: 'Add Funds',
            description: 'Adding money to the Wallet',
            logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
    };
    let handleFlutterPayment = useFlutterwave(config);

    // useEffect(() => {
    //     if (typeof window === 'object') {
    //         handleFlutterPayment 
    //     }
    // })

    async function AddFund(p) {

        const response = await AddFundFlotterwave(p)
        await getAmount()
        if (response?.status === 200) {
            toast({
                title: `you have added ${p.amount}`,
                position: "bottom",
                status: "success",
                isClosable: true,
            })

        } else {
            toast({
                title: response?.data?.msg ? response?.data?.msg : "Error occured",
                position: "bottom",
                status: "error",
                isClosable: true,
            })
        }
    }

    function handleSubmit() {
        setLoading(true)
        if (isShown) {

            if (!formik.dirty) {
                // toast.error("Please Enter Your Email And Password") 
                toast({
                    title: "You have to fill in the form to continue",
                    position: "bottom",
                    status: "error",
                    isClosable: true,
                })
            } else if (!formik.isValid) {
                toast({
                    title: "You have to fill in the form to continue",
                    position: "bottom",
                    status: "error",
                    isClosable: true,
                })
            } else {
                handleFlutterPayment({
                    callback: (response) => {
                        AddFund({
                            amount: response.amount, "transaction_title": "adding fund with flutterwave",
                            "referrence": response.flw_ref
                        })
                        closePaymentModal() // this will close the modal programmatically
                    },
                    onClose: () => { },
                })
            }
        } else {

        }
        setLoading(false)
    }



    const { getUserInfo } = UserAddress()
    let refresh

    useEffect(() => {
        refresh = []
        const getProfile = async () => {

            let user
            if (typeof window !== 'undefined') {
                user = localStorage.getItem("user")
            }
            try {
                const response = await getUserInfo(user)
                setData(response.data)

            } catch {
                console.log("error")
            }
        }
        getProfile()
    }, [refresh])

    return (
        <div className=' pt-[20px] pb-[40px] w-full flex flex-col items-center bg-white rounded-[5px] ' >
            <div className=' lg:w-[350px] w-full  ' >
                <p className=' font-bold text-xl ' >Fund Wallet</p>
                <div className=' w-full mt-[30px] ' >
                    <p className=' mb-2 font-medium ' >Enter Amount</p>
                    <Input placeholder='0'
                        onChange={formik.handleChange}
                        name="amount"
                        onFocus={() =>
                            formik.setFieldTouched("amount", true, true)
                        }
                        height="45px" fontSize="sm" border="1px solid #D9D9D9" />
                </div>
                <div className=' mt-4 w-full ' >
                    <p className=' mb-2 font-medium ' >Funding method</p>
                    <Select onChange={(e) => setIsShown(e.target.value)} placeholder='Select method' height="45px" fontSize="sm" border="1px solid #D9D9D9" >
                        <option>Online - Paystack</option>
                        <option>Bank Deposit, POS, Bank Transfer</option>
                    </Select>
                </div>
                {isShown === "Bank Deposit, POS, Bank Transfer" && (
                    <>

                        <div className=' bg-[#06904633] p-[18px] mt-4 text-[15px] font-semibold w-full rounded-[5px] ' >
                            <div className=' flex items-center ' >
                                <p className=' text-[#6C6C6C]  w-32 ' >Bank:</p>
                                <p>Zenith Bank</p>
                            </div>
                            <div className=' flex items-center py-2 ' >
                                <p className=' text-[#6C6C6C]  w-32 ' >Acct Number:</p>
                                <p>2034095253</p>
                            </div>
                            <div className=' flex items-center ' >
                                <p className=' text-[#6C6C6C]  w-32 ' >Name:</p>
                                <p>Massbuy Ltd</p>
                            </div>
                            <p className=' mt-4 font-normal text-[14px] ' >Make payment to Massbuy Ltd and upload the proof of payment here</p>
                        </div>
                        <p className=' font-normal mt-[18px] mb-2 ' >Upload Proof of payment</p>
                        <Input type="file" height="40px" paddingTop="5.5px" border="1px solid #D9D9D9" fontSize="sm" />
                    </>
                )}
                <button disabled={loading} onClick={() => handleSubmit()} className=' mt-6 rounded-md w-full text-[15px] bg-[#069046] h-[45px] font-bold text-white ' >{loading ? <SpinLoader size="xs" /> : "Submit"}</button>
            </div>
        </div>
    )
} 