import { useRouter } from 'next/router'
import React, { useEffect, useReducer, useState } from 'react'
// import toast from 'react-hot-toast'
import useUserDetails from '../../../hooks/auth.hook'
import { getCartById, PurchaseItem } from '../../../services'
import SpinLoader from '../../Loaders/SpinLoader'
import MonthlySelector from '../../MontlySelector'
import PaymentFrequency from '../../PaymentFrequency'
import ProductItem from '../../ProductItem'
import { cashFormat } from '../../utils/cashFormat'
import { convertToNumber, getSingularOrPlural } from '../../utils/index.util'
import { calculateTotalAmount } from '../../utils/productDetails.utils'
import CartHeader from './CartHeader'
import CartInfoItem from './CartInfoItem'
import PaymentModal from './PaymentModal'
import { cartInfoReducer, cartInitializer, getFrequencyAmount, getTotalQuantity } from './utils'
import { Box, Button, Center, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack, useDisclosure, useToast } from '@chakra-ui/react'
import { createPaymentPlan } from '../../../services/UserPackage'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Formik } from 'formik'
import PaymentMethod from '../../Payment'

type Props = {
    packageInstance: any
}

enum cartInfoActionKind {
    INCREMENT_QUANTITY,
    DECREMENT_QUANTITY,
    INCREMENT_AMOUNT,
    DECREMENT_AMOUNT,
    CHANGE_DURATION
}


export default function CartComponent({ packageInstance }: Props) {
    const [data, setData] = React.useState({})
    const [loading, setLoading] = React.useState(true);
    const [SumTotal, setSumTotal] = useState(cashFormat(0))
    const [SumTotal2, setSumTotal2] = useState(0)
    const { userDetails, isLoggedIn } = useUserDetails()
    const [value, setValue] = useState<any>("")
    const route = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { product_id: _products, ...p } = packageInstance
    const [products, setProducts] = useState(_products)
    const toast = useToast()


    const initialArg = {
        totalQuantity: getTotalQuantity(products),
        totalAmount: convertToNumber(p.total),
        duration: p.duration
    }

    const [cartInfo, dispatchCartAction] = useReducer(cartInfoReducer, initialArg, cartInitializer)

    //current payment frequency info
    const [paymentInfo, setPaymentInfo] = useState<PaymentInfoType>({
        paymentFrequency: packageInstance.payment_frequency,
        amount: getFrequencyAmount(packageInstance.payment_frequency, cartInfo)
    })

    const handleQuantityChanged = (updatedValue: number, price: number, type: quantityAction) => {
        if (type === "increment") {
            dispatchCartAction({ type: cartInfoActionKind.INCREMENT_QUANTITY, payload: { quantity: updatedValue, price } })
        } else if (type === "decrement") {

            dispatchCartAction({ type: cartInfoActionKind.DECREMENT_QUANTITY, payload: { quantity: updatedValue, price } })
        }
    }

    const handleDurationChange = (duration: number) => {
        dispatchCartAction({ type: cartInfoActionKind.CHANGE_DURATION, payload: { duration } })
    }

    const handlePayNowClicked = () => {
        //send cart information
        // const data = createPaymentPlan(paymentInfo.amount, "Your package name", paymentInfo.paymentFrequency, cartInfo.duration)
        // if (!isLoggedIn) route.push("/login")
        // setIsOpen(true)
    }

    const handlePaymentFrequencyChanged = (frequency: FrequencyType, amount: number) => {
        setPaymentInfo({
            paymentFrequency: frequency,
            amount
        })
    }

    const handleProductRemoved = (id: string, qty: number, totalAmount: number) => {
        const newProducts = products.filter((product: any) => product._id !== id)
        handleQuantityChanged(qty, totalAmount, "decrement")
        setProducts(newProducts)
    }

    // update payment info when cart changes
    useEffect(() => {
        SumTotalFunction()
        handlePaymentFrequencyChanged(paymentInfo.paymentFrequency, getFrequencyAmount(paymentInfo.paymentFrequency, cartInfo))
    }, [paymentInfo.paymentFrequency, cartInfo])

    // get user token
    useEffect(() => {
        if (typeof window !== "undefined") {
            // setUserId(localStorage.getItem("user") + "");
        }
    }, []);



    const paymentSuccessfull = async (id: string) => {
        try {
            setLoading(true)
            onClose()
            const package_id = localStorage.getItem("default_package")
            const response = await PurchaseItem({ ...data, payment: id, total: SumTotal2, product_id: products, package_id: package_id });
            localStorage.removeItem("default_package")
            route.push("/dashboard")
            toast({
                title: "Cart",
                description: "Transaction successfully executed",
                position: "top-right",
                status: "success"
            })
            setLoading(false)
        } catch (err) {
            toast({
                title: "Cart",
                description: "Transaction failed to execute",
                position: "top-right",
                status: "error"
            })
            setLoading(false)
        }
    }

    function SumTotalFunction() {
        console.log(products, "product")

        if (products && products.length > 0) {
            const reformat = products.map((a: any, b: number) => {
                return a.item.price * a.qty
            })
            const total = reformat.reduce((a: any, b: number) => a + b, 0)
            setSumTotal2(total)
            setSumTotal(cashFormat(total))
        } else {
            setSumTotal(cashFormat(0))
        }
    }

    useEffect(() => {
        SumTotalFunction()
        setLoading(false)
    }, [])

    return (
        <>
            {loading && (
                <Box className=' w-full pt-32 text-2xl flex justify-center font-Inter-ExtraBold ' >
                    <SpinLoader />
                </Box>
            )}

            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Payment Method</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {isOpen && <PaymentMethod paymentSuccessfull={paymentSuccessfull} />}
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Flex flexDir={["column", "column", "column", "row"]} m="0px 20px" pt="20px" >
                {!loading && (
                    <Box
                        onClick={() => {
                            SumTotalFunction()
                        }}
                        borderRadius="45px" className=' w-full lg:flex h-full items-center flex-col lg:px-6 pb-10 bg-white space-y-5' p={["20px", "30px"]} pt={["10px", "20px"]}>
                        <CartHeader />
                        <ul className='border w-full max-w-4xl flex-col border-[#D0D0D0] rounded-xl py-4 px-5 space-y-5'>
                            {/* <CartInfoItem
                            label='Duration'
                            text={`${cartInfo.duration} month${getSingularOrPlural(cartInfo.duration)}`} /> */}
                            <CartInfoItem label='Total' text={SumTotal} />
                        </ul>

                        {products.map((productInfo: any, idx: number) => {
                            const product = productInfo.item
                            const totalAmount = calculateTotalAmount(convertToNumber(product.price), productInfo.qty)
                            return (
                                <ProductItem
                                    id={productInfo._id}
                                    key={`product-${product._id}`}
                                    imageURL={product.image}
                                    name={product.itemName}
                                    quantity={productInfo.qty}
                                    products={products}
                                    index={idx}
                                    handleQuantityChanged={handleQuantityChanged}
                                    handleProductRemoved={handleProductRemoved}
                                    price={convertToNumber(product.price)}
                                    initialTotalAmount={totalAmount} />
                            )
                        })}

                        {/* start of product list footer */}
                        <Box className=' w-full flex flex-row items-baseline justify-between lg:justify-center lg:border-b py-3 lg:px-4 border-[#D9D9D9] ' >
                            <Box className='w-full max-w-md lg:-ml-20 flex flex-row justify-between lg:justify-center  items-baseline'>
                                <h3 className='font-bold text-sm lg:text-lg lg:mr-14' >Item{getSingularOrPlural(cartInfo.totalQuantity)}: <span className='font-light' >{cartInfo.totalQuantity}</span></h3>
                                <h3 className=' font-bold text-sm lg:text-base lg:mt-0 mt-2 lg:ml-14  ' >Amount: <span className='font-light text-[#0dadf7]' >{SumTotal}</span></h3>
                            </Box>

                        </Box>
                        {/*<Box className='w-full lg:w-11/12 lg:max-w-md flex flex-col space-y-4 lg:space-y-8'>
                            <button onClick={handlePayNowClicked} className='mt-14 self-center inline-block rounded-md w-[200px] text-sm bg-[#069046] h-[40px] font-semibold text-white ' >
                                Pay Now
                            </button>
                        </Box> */}
                    </Box>
                )}
                <Box
                    w={["full", "full", "full", "800px"]}
                    p={["20px", "30px"]} pt={["10px", "20px"]}>
                    <Box pb="10px" mb="20px" fontWeight="600" fontSize="16px" color="#000" borderBottom={"1px solid grey"}>
                        {/* {userDetails && userDetails?.user && userDetails?.user.firstname ? userDetails?.user.lastname + " " + userDetails?.user.firstname : userDetails && userDetails?.user && userDetails?.user.email ? userDetails?.user.email : "Guest"} */}
                    </Box>
                    <Box>
                        <Center>
                            <Box mr="10px" fontWeight="600" fontSize="20px">
                                Delivery Details
                            </Box>
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.5 17C5.5 17.5304 5.71071 18.0391 6.08579 18.4142C6.46086 18.7893 6.96957 19 7.5 19C8.03043 19 8.53914 18.7893 8.91421 18.4142C9.28929 18.0391 9.5 17.5304 9.5 17M5.5 17C5.5 16.4696 5.71071 15.9609 6.08579 15.5858C6.46086 15.2107 6.96957 15 7.5 15C8.03043 15 8.53914 15.2107 8.91421 15.5858C9.28929 15.9609 9.5 16.4696 9.5 17M5.5 17H3.5V13M9.5 17H15.5M15.5 17C15.5 17.5304 15.7107 18.0391 16.0858 18.4142C16.4609 18.7893 16.9696 19 17.5 19C18.0304 19 18.5391 18.7893 18.9142 18.4142C19.2893 18.0391 19.5 17.5304 19.5 17M15.5 17C15.5 16.4696 15.7107 15.9609 16.0858 15.5858C16.4609 15.2107 16.9696 15 17.5 15C18.0304 15 18.5391 15.2107 18.9142 15.5858C19.2893 15.9609 19.5 16.4696 19.5 17M19.5 17H21.5V11M2.5 5H13.5V17M21.5 11H13.5M21.5 11L18.5 6H13.5M3.5 9H7.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </Center>
                        <Box borderRadius="4px" overflow={"hidden"} mt="20px">
                            <div>

                                <Formik
                                    initialValues={{ city: '', country: '', state: "", post: '', address: '' }}
                                    validate={values => {
                                        const errors = {city:"", country:"", post:"", state:"", address:""};
                                        if (!values.city) {
                                            errors.city = 'Required';
                                        } else if (!values.country) {
                                            errors.country = 'Required';
                                        } else if (!values.post) {
                                            errors.post = 'Required';
                                        } else if (!values.state) {
                                            errors.state = 'Required';
                                        } else if (!values.address) {
                                            errors.address = 'Required';
                                        }
                                        return errors;
                                    }}
                                    onSubmit={(values, { setSubmitting }) => {
                                        setTimeout(() => {
                                            setData({ ...values, phone: value })
                                            onOpen()
                                            setSubmitting(false);
                                        }, 400);
                                    }}
                                >
                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                        isSubmitting,
                                        /* and other goodies */
                                    }) => (
                                        <form onSubmit={handleSubmit}>
                                            <Flex flexDir="column">

                                                <Box fontWeight="900" mb="10px" mt="20px">
                                                    Phone Number
                                                </Box>
                                                <Box bg="#fff" borderRadius="4px" border="1px solid #CFCFCF" p="0px 10px">

                                                    <PhoneInput
                                                        className='cartPhoneNumber'
                                                        placeholder="Enter phone number"
                                                        value={value}
                                                        style={{ borderBottom: "1px solid gery", height: "48px", outline: "none" }}
                                                        onChange={(e) => {
                                                            setValue(e)

                                                        }} />
                                                </Box>
                                                <Box fontWeight="900" mt="20px" mb="10px">
                                                    Country
                                                </Box>
                                                <input
                                                    type="country"
                                                    name="country"
                                                    style={{ border: "1px solid #CFCFCF", borderRadius: "7px", height: 50, paddingLeft: 10, paddingRight: 10 }}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.country}
                                                />
                                                {errors.country && touched.country && errors.country}
                                                <Box fontWeight="900" mb="10px" mt="20px">
                                                    State
                                                </Box>
                                                <input
                                                    type="state"
                                                    name="state"
                                                    style={{ border: "1px solid #CFCFCF", borderRadius: "7px", height: 50, paddingLeft: 10, paddingRight: 10 }}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.state}
                                                />
                                                {errors.state && touched.state && errors.state}
                                                <Box fontWeight="900" mt="20px" mb="10px">
                                                    City
                                                </Box>
                                                <input
                                                    type="city"
                                                    name="city"
                                                    style={{ border: "1px solid #CFCFCF", borderRadius: "7px", height: 50, paddingLeft: 10, paddingRight: 10 }}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.city}
                                                />
                                                {errors.city && touched.city && errors.city}
                                                <Box fontWeight="900" mt="20px" mb="10px">
                                                    Home Address
                                                </Box>
                                                <input
                                                    type="address"
                                                    name="address"
                                                    style={{ border: "1px solid #CFCFCF", borderRadius: "7px", height: 50, paddingLeft: 10, paddingRight: 10 }}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.address}
                                                />
                                                {errors.address && touched.address && errors.address}
                                                <Box fontWeight="900" mt="20px" mb="10px">
                                                    Post Code/ Zip code
                                                </Box>
                                                <input
                                                    type="post"
                                                    name="post"
                                                    style={{ border: "1px solid #CFCFCF", borderRadius: "7px", height: 50, paddingLeft: 10, paddingRight: 10 }}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.post}
                                                />
                                                {errors.post && touched.post && errors.post}
                                                <Button isLoading={isSubmitting || loading} isDisabled={isSubmitting} mt="20px" h="50px" bg="#000" color="#fff" type="submit" disabled={isSubmitting}>
                                                    Submit
                                                </Button>
                                            </Flex>
                                        </form>
                                    )}
                                </Formik>
                            </div>
                        </Box>
                    </Box>
                </Box>
            </Flex>
        </>
    )
}


