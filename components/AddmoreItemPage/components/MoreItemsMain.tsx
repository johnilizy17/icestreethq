
import { Box, Button, Center, Flex, Image, Img, useToast, useDisclosure, Input } from '@chakra-ui/react'
import React, { useEffect, useReducer, useState } from 'react'
import { MdAddCircleOutline } from 'react-icons/md'
import ProductItem from '../../ProductItem'
import { cashFormat } from '../../utils/cashFormat'
import { calculateNumberPayment, calculatePaymentFrequency } from '../../utils/productDetails.utils'
import SearchProductModal from '../Modals/SearchProductModal'
import { getPackage, updatePackage, updatePackage2 } from '../../../services/UserPackage'
import { getTotalQuantity } from '../../CartPage/components/utils'
import { convertToNumber, getSingularOrPlural } from '../../utils/index.util'
import PaymentFrequency from '../../PaymentFrequency'
import MonthlySelector from '../../MontlySelector'
import { useRouter } from 'next/router'
import SpinLoader from '../../Loaders/SpinLoader'
import { initialState, packageInfoReducer } from '../utils'
import Lottie from 'react-lottie'
import Empty from '../../../assets/lottie/empty.json'
import { guestLogin } from '../../../services'
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
} from '@chakra-ui/react'

const MoreItemsMain = () => {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [packageInfo, packageDispatch] = useReducer(packageInfoReducer, initialState)
    const [loading, setLoading] = useState(true)
    const [loading2, setLoading2] = useState(false)
    const [empty, setEmpty] = useState(false)
    const [userData, setUserData] = React.useState("");
    const [packageId, setPackageId] = useState<string>();
    const [activeTab, setActiveTab] = useState<FrequencyType>("monthly")
    const [SumTotal, setSumTotal] = useState(cashFormat(0))
    const [showForm, setShowForm] = useState(false)
    const route = useRouter()
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Empty,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    const toast = useToast()

    const [paymentInfo, setPaymentInfo] = useState<PaymentInfoType>({
        paymentFrequency: activeTab,
        amount: 1
    })

    async function handleGuest() {
        try {
            setLoading(true)
            const response = await guestLogin({ email: userData })
            localStorage.setItem("user", response?.userID)
            onClose()
            localStorage.setItem("token", response?.access_token)
            toast({
                title: response?.msg,
                position: "bottom",
                status: "success",
                isClosable: true,
            })
            setLoading(false)
        } catch (err: any) {
            setLoading(false)
            toast({
                title: "Email Error",
                description: err.response.data.msg,
                status: "error",
                position: "top-right"
            })
        }
        setLoading(false)
    }


    const handlePaymentFrequencyChanged = (frequency: FrequencyType, amount: number) => {
        setPaymentInfo({
            paymentFrequency: frequency,
            amount
        })
    }

    const handleQuantityChanged = (updateValue: number, price: number, type: "increment" | "decrement", id: number, productQuantity: number) => {
        if (type === "increment") {
            packageDispatch({ type: "INCREMENT", payload: { quantity: updateValue, price, id, productQuantity } })
        } else if (type === "decrement") {
            packageDispatch({ type: "DECREMENT", payload: { quantity: updateValue, price, id, productQuantity } })
        }
    }

    const handleItemAdded = ({ name, imageUrl, price, id }: productSearchResultItem) => {
        //display error msg if product already exists
        for (const product of packageInfo.packageInstance.product_id) {
            if (product.item._id === id) {
                toast({
                    title: "Product is already in your package",
                    status: "error",
                    position: "bottom"
                })
                return
            }
        }

        // add product
        packageDispatch({
            type: "ADD_PRODUCT",
            payload: {
                name,
                imageUrl,
                price,
                id
            },

        })
        //display success message when added
        toast({
            title: "Product added",
            status: "success",
            position: "bottom"
        })
    }

    const handleRemoveProduct = (id: string, quantity: number, price: number) => {
        packageDispatch({ type: 'REMOVE', payload: { quantity, price, id } })
    }

    const handleDurationChanged = (duration: number) => {
        packageDispatch({ type: "CHANGE_DURATION", payload: 1 })
    }

    const addPackageToCart = () => {
        if (!packageId) return
        setLoading2(true)
        const packageData: UpdatePackageProps = {
            duration: 1,
            total: packageInfo.totalAmount,
            payment_frequency: paymentInfo.paymentFrequency,
            category: packageInfo.packageInstance.category,
            numberOfExpectedPayment: calculateNumberPayment(packageInfo.duration, paymentInfo.paymentFrequency),
            product_id: packageInfo.packageInstance.product_id,
            package_id: packageId ?? ""
        }
        updatePackage2(packageData).then(() => {
            localStorage.setItem("cartId", packageId)
            toast({
                title: "Proceed to checkout your order with ease",
                status: "success",
                position: "top-right"
            })
            route.push("/cart")
        }).catch(err => {
            setLoading2(false)
            onOpen()
        })
        // setLoading2(false)
    }

    async function GetAllProduct() {
        const packageId = localStorage.getItem("default_package");

        if (packageId) {
            setPackageId(packageId);

            await getPackage(packageId ?? "")
                .then((_res) => {
                    let res = _res[0]
                    let { dailyPayment: daily_payment, weeklyPayment: weekly_payment, monthlyPayment: monthly_payment } = calculatePaymentFrequency(res.duration, res.total)

                    const pageData: PackageInfoType = {
                        packageInstance: res,
                        duration: 1,
                        totalAmount: parseInt(res.total),
                        totalQuantity: getTotalQuantity(res.product_id),
                        daily_payment,
                        weekly_payment,
                        monthly_payment
                    }
                    packageDispatch({ type: "INIT", payload: pageData })
                    setLoading(false)
                })
            SumTotalFunction()
        } else {
            setEmpty(true)
        }
    }

    useEffect(() => {
        GetAllProduct()
    }, [])


    useEffect(() => {
        let frequency = packageInfo.packageInstance.payment_frequency
        setActiveTab(frequency)
        SumTotalFunction()
    }, [packageInfo.packageInstance.payment_frequency])

    function SumTotalFunction() {
        const products = packageInfo.packageInstance.product_id
        if (products && products.length > 0) {
            const reformat = products.map((a: any, b: number) => {
                return (a.item.price - (a.item.price * a.item.discount) / 100) * a.qty
            })
            const total = reformat.reduce((a: any, b: number) => a + b, 0)

            setSumTotal(cashFormat(total))
        } else {
            setSumTotal(cashFormat(0))
        }
    }

    useEffect(() => {
        SumTotalFunction()
    }, [[]])

    const addPackageToCart2 = () => {
        if (!packageId) return
        const packageData: UpdatePackageProps = {
            duration: 1,
            total: packageInfo.totalAmount,
            payment_frequency: paymentInfo.paymentFrequency,
            category: packageInfo.packageInstance.category,
            numberOfExpectedPayment: calculateNumberPayment(packageInfo.duration, paymentInfo.paymentFrequency),
            product_id: packageInfo.packageInstance.product_id,
            package_id: packageId ?? ""
        }
        updatePackage2(packageData).then(() => {
            localStorage.setItem("cartId", packageId)
            toast({
                title: "Checkout your order with easy",
                status: "success",
                position: "top-right"
            })
        }).catch(err => {
            setLoading2(false)
            onOpen()
        })
    }


    useEffect(() => {
        if (packageInfo && packageInfo.packageInstance && packageInfo.packageInstance.product_id && packageInfo.packageInstance.product_id.length > 0) {
            addPackageToCart2()
        }
    }, [packageInfo && packageInfo.packageInstance && packageInfo.packageInstance.product_id && packageInfo.packageInstance.product_id.length])

    if (loading) return empty ? <Center h="400px"><Box> <Lottie options={defaultOptions}
        height={300}
        width={300} />
        <Box fontWeight="700" textAlign="center" mt="10px" fontSize="24px">
            Empty Cart
        </Box> </Box></Center> : <Center> <SpinLoader /> </Center>
    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    {showForm ?
                        <>
                            <ModalHeader>Guest Details</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Input
                                    placeholder="Enter E-mail"
                                    onChange={(e) => {
                                        setUserData(e.target.value)
                                    }}
                                />
                            </ModalBody>

                            <ModalFooter justifyContent="space-between">
                                <Button
                                    isLoading={loading}
                                    isDisabled={loading}
                                    onClick={() => {
                                        setShowForm(false)
                                        onClose()
                                    }} bg='red' color="white" mr={3}>
                                    Cancel
                                </Button>
                                <Button
                                    isLoading={loading}
                                    isDisabled={loading}
                                    colorScheme="blackAlpha"
                                    bg='black' color="white"
                                    onClick={() => {
                                        handleGuest()
                                    }}
                                >submit</Button>
                            </ModalFooter>
                        </> :
                        <>
                            <ModalHeader>Login</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                Inorder to checkout you have to login
                            </ModalBody>

                            <ModalFooter justifyContent="center">
                                <Button onClick={() => {
                                    route.push("/login")
                                }} bg='black' color="white" mr={3}>
                                    Login
                                </Button>
                            </ModalFooter>
                        </>
                    }
                </ModalContent>
            </Modal>

            <div
                className='w-full bg-white py-4' >
                {/* start of more items heading */}
                <div className=' w-full mt-2 lg:mt-0 flex flex-col lg:flex-row items-start lg:items-center justify-start  border-b py-3 lg:px-4 border-[#D9D9D9] bg-white space-y-4 lg:space-y-0 lg:space-x-8' >
                    <p className=' font-bold text-[24px]' >Add to cart</p>

                    <Center>
                        <button onClick={() => route.push("/")} className='border ml-auto lg:ml-0 rounded-md block border-[#0dadf7] border-b-2 text-[#0dadf7] bg-white h-[30px] text-[13px] w-[120px] ' >
                            Add More Items
                        </button>
                    </Center>
                </div>
                {/* end of more items heading */}

                <div className=' w-full h-full items-center flex flex-col pt-4 lg:px-6 lg:pb-10 bg-white space-y-5'>
                    {packageInfo.packageInstance.product_id.map((productInfo: any, indx: number) => {
                        const product = productInfo.item
                        const totalAmount = productInfo.qty * convertToNumber(product.price)
                        return (
                            <ProductItem
                                id={product._id}
                                key={productInfo._id}
                                imageURL={product.image}
                                products={packageInfo.packageInstance.product_id}
                                index={indx}
                                discount={product.discount}
                                name={product.itemName}
                                quantity={productInfo.qty}
                                handleQuantityChanged={handleQuantityChanged}
                                handleProductRemoved={handleRemoveProduct}
                                handleTotalProductAmountChanged={handlePaymentFrequencyChanged}
                                price={product.price}
                                initialTotalAmount={totalAmount} />
                        )
                    })}

                    {/* */}
                </div>

                <div className='text-center'>
                    <div className='w-full flex flex-col justify-center items-center py-3 lg:px-4 border-[#D9D9D9] ' >
                        <div className='flex w-full pb-5 justify-between lg:justify-center border-b items-baseline mb-7'>
                            <h3 className='font-bold lg:text-lg lg:mr-16' >Item{getSingularOrPlural(packageInfo.totalQuantity)}: <span className=' font-bold ' >{packageInfo.totalQuantity}</span></h3>
                            <div className='text-right'>
                                <h3 className='font-bold text-sm lg:text-xm text-right lg:mt-0 mt-2 lg:text-lg' >Amount: <span className=' font-bold text-[#0dadf7]' >{SumTotal}</span></h3>
                            </div>
                        </div>
                    </div>

                    <div className='w-full flex text-center lg:justify-center space-x-3 lg:space-x-0 mt-7'>
                        <Button isLoading={loading2} isDisabled={loading2} w="full" bg="black" colorScheme='blackAlpha' onClick={addPackageToCart} >
                            Checkout
                        </Button>
                    </div>
                </div>
            </div >
        </>
    )
}

export default MoreItemsMain