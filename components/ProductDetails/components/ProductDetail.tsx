import { Box, Button, Center, Flex, Image, Img, useToast, useDisclosure, Input, color } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useReducer, useState } from 'react'
import { createPackage, updatePackage } from '../../../services/UserPackage'
import SpinLoader from '../../Loaders/SpinLoader'
import MonthlySelector from '../../MontlySelector'
import PaymentFrequency from '../../PaymentFrequency'
import QuantityBtns from '../../QuantityBtns'
import { cashFormat } from '../../utils/cashFormat'
import { calculateNumberPayment, isSingleItem, productInfoReducer, productInitializer } from '../../utils/productDetails.utils'
import { productDetailsProp } from './type'
import { imagePath } from '../../../services/Variable'
import { Rating } from 'react-simple-star-rating'
import HTMLState from './htmlRender';
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
} from '@chakra-ui/react'
import { guestLogin } from '../../../services'
import { RWebShare } from "react-web-share";

enum productActionKind {
    INCREMENT_QUANTITY = 'INCREASE',
    DECREMENT_QUANTITY = 'DECREASE',
    CHANGE_DURATION = 'duration'
}


export default function ProductDetail({ data, productId }: productDetailsProp) {
    const productInitializerArg = {
        quantity: 1,
        price: data?.price ?? "0",
    }

    const [loading, setLoading] = React.useState(false);
    const [loading2, setLoading2] = React.useState(false);
    const toast = useToast()
    const [showForm, setShowForm] = useState(false)
    const [user_id, setUserId] = React.useState<any>("");
    const [userData, setUserData] = React.useState("");
    const [colorScheme, setColorScheme] = React.useState("Main Color");
    const [productInfo, productInfoDispatch] = useReducer(productInfoReducer, productInitializerArg, productInitializer)
    const [packageId, setPackageId] = useState<string>("")
    const [paymentInfo, setPaymentInfo] = useState<PaymentInfoType>({
        paymentFrequency: "monthly",
        amount: 123
    })
    const [size, setSize] = useState("")
    const [packageData, setPackageData] = useState<any>()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const route = useRouter()
    const { query, pathname } = useRouter()
    const pathnameLink = imagePath + pathname

    useEffect(() => {
        const userQuery = query.id ?? ""
        setUserId(userQuery);
    }, []);

    // initialize packageData
    useEffect(() => {
        const defaultPackageId = localStorage.getItem("default_package")

        if (!defaultPackageId) {
            const packageData = {
                duration: productInfo.duration,
                category: data.category_id,
                numberOfExpectedPayment: calculateNumberPayment(productInfo.duration, paymentInfo.paymentFrequency),
                product_id: [
                    {
                        item: productId.toString(),
                        qty: productInfo.quantity
                    }
                ],
                payment_frequency: paymentInfo.paymentFrequency,
                total: productInfo.total_amount
            }
            setPackageData(packageData)
            createPackage(packageData)
                .then((res) => {
                    setPackageId(res._id)
                    localStorage.setItem("default_package", res._id)
                })
                .catch(err => true)

        } else {
            setPackageId(defaultPackageId ?? "")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const defaultPackageId = localStorage.getItem("default_package")
        if (!defaultPackageId) return

        const packageData = {
            duration: productInfo.duration,
            category: data.category_id,
            numberOfExpectedPayment: calculateNumberPayment(productInfo.duration, paymentInfo.paymentFrequency),
            product_id: [
                {
                    item: productId.toString(),
                    qty: productInfo.quantity
                }
            ],
            payment_frequency: paymentInfo.paymentFrequency,
            total: productInfo.total_amount
        }

        setPackageData(packageData)
    }, [data.category_id, paymentInfo.paymentFrequency, productId, productInfo.duration, productInfo.quantity, productInfo.total_amount])


    const handleQuantityClicked = (type: ("increment" | "decrement")) => {
        // this function sends a request to  increments or decrement to product quantity 

        if (type === "increment") {
            productInfoDispatch({ type: productActionKind.INCREMENT_QUANTITY })
        }

        else if (type === "decrement") {
            productInfoDispatch({ type: productActionKind.DECREMENT_QUANTITY })
        }
    }

    const handleDurationChanged = (duration: number) => {
        productInfoDispatch({ type: productActionKind.CHANGE_DURATION, payload: { duration } })
    }

    const handlePayNowClicked = () => {
        updatePackage({
            ...packageData,
            package_id: packageId
        })
            .then(() => {
                localStorage.setItem("cartId", packageId)
                route.push("cart")
            })

    }

    const handlePaymentFrequencyChanged = (frequency: FrequencyType, amount: number) => {
        setPaymentInfo({
            paymentFrequency: frequency,
            amount
        })
    }

    async function handleGuest() {
        try {

            setLoading(true)
            const response = await guestLogin({ email: userData })
            localStorage.setItem("user", response?.userID)
            onClose()
            localStorage.setItem("token", response?.access_token)
            route.reload()
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

    const handleAddItemClicked = () => {
        setLoading(true)
        const defaultPackageId = localStorage.getItem("default_package")
        if (size.length > 0) {
            if (!defaultPackageId) {
                const packageData = {
                    duration: productInfo.duration,
                    size: size,
                    color:colorScheme,
                    category: data.category_id,
                    numberOfExpectedPayment: calculateNumberPayment(productInfo.duration, paymentInfo.paymentFrequency),
                    product_id: [
                        {
                            item: productId.toString(),
                            qty: productInfo.quantity
                        }
                    ],
                    payment_frequency: paymentInfo.paymentFrequency,
                    total: productInfo.total_amount
                }
                setPackageData(packageData)
                createPackage(packageData)
                    .then((res) => {
                        setPackageId(res._id)
                        localStorage.setItem("default_package", res._id)
                        setLoading(false)
                        toast({
                            title: "Product",
                            description: "Product Successfully added to cart",
                            status: "success",
                            position: "top-right"
                        })

                    })
                    .catch(err => {
                        setLoading(false)
                        toast({
                            title: "Token",
                            description: "Token has expire kindly login",
                            status: "error",
                            position: "top-right"
                        })
                        onOpen()
                    })
            } else {
                updatePackage({
                    ...packageData,
                    package_id: packageId
                }).then((res) => {
                    toast({
                        title: "Product",
                        description: "Product Successfully added to cart",
                        status: "success",
                        position: "top-right"
                    })
                    setLoading(false)
                }).catch((res: any) => {
                    setLoading(false)
                    toast({
                        title: "Token",
                        description: "Token has expire kindly login",
                        status: "error",
                        position: "top-right"
                    })
                    onOpen()
                })

            }
        } else {
            toast({
                title: "Product",
                description: "Please in a size to your stock",
                status: "warning",
                position: "top-right"
            })
            setLoading(false)
        }
    }

    const handleAddItemClicked2 = () => {
        setLoading2(true)
        const defaultPackageId = localStorage.getItem("default_package")
        if (size.length > 0) {
            if (!defaultPackageId) {
                const packageData = {
                    duration: productInfo.duration,
                    size: size,
                    color:colorScheme,
                    category: data.category_id,
                    numberOfExpectedPayment: calculateNumberPayment(productInfo.duration, paymentInfo.paymentFrequency),
                    product_id: [
                        {
                            item: productId.toString(),
                            qty: productInfo.quantity
                        }
                    ],
                    payment_frequency: paymentInfo.paymentFrequency,
                    total: productInfo.total_amount
                }
                setPackageData(packageData)
                createPackage(packageData)
                    .then((res) => {
                        setPackageId(res._id)
                        localStorage.setItem("default_package", res._id)
                        route.push("/add-more-items")
                        toast({
                            title: "Product",
                            description: "Product Successfully added to cart",
                            status: "success",
                            position: "top-right"
                        })
                    })
                    .catch(err => {
                        setLoading2(false)
                        toast({
                            title: "Token",
                            description: "Token has expire kindly login",
                            status: "error",
                            position: "top-right"
                        })
                        onOpen()
                    })
            } else {
                updatePackage({
                    ...packageData,
                    color:colorScheme,
                    package_id: packageId
                }).then((res) => {
                    toast({
                        title: "Product",
                        description: "Product Successfully added to cart",
                        status: "success",
                        position: "top-right"
                    })
                    route.push("/add-more-items")
                }).catch((res: any) => {
                    setLoading2(false)
                    toast({
                        title: "Token",
                        description: "Token has expire kindly login",
                        status: "error",
                        position: "top-right"
                    })
                    onOpen()
                })

            }
        } else {
            toast({
                title: "Product",
                description: "Please in a size to your stock",
                status: "warning",
                position: "top-right"
            })
            setLoading2(false)
        }
    }

    const countSize = ["XS", "S", "M", "L", "XL", "XXL"]

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
                                Do you want to Log in or explore has a guest
                            </ModalBody>

                            <ModalFooter justifyContent="space-between">
                                <Button onClick={() => {
                                    route.push("/login")
                                }} bg='black' color="white" mr={3}>
                                    Login
                                </Button>
                                <Button
                                    onClick={() => {
                                        setShowForm(true)
                                    }}
                                    colorScheme='green'>Guest</Button>
                            </ModalFooter>
                        </>
                    }
                </ModalContent>
            </Modal>
            <Box className=' w-full' >
                <Box className=' w-full flex items-start lg:flex-row flex-col justify-around lg:py-8  lg:bg-white ' p={["20px", "20px", "20px", "30px"]} >
                    <Flex flexDir={["row", "row", "row", "column"]} w={["full", "full", "full", "auto"]} justifyContent={["space-between"]} overflow={["scroll", "scroll", "hidden", "hidden"]} >
                        <Image src={imagePath + "/" + data?.image} mr={["10px", "10px", "10px", "0px"]} mb="10px" w={["150px", "150px", "180px", "180px"]} alt="TopOne" />
                        {data?.image_2 && data?.image_2.length > 2 ? <Image src={imagePath + "/" + data?.image_2} mr={["10px", "10px", "10px", "0px"]} mb="10px" w={["150px", "150px", "180px", "180px"]} alt="TopOne" />
                        :<Image src={imagePath + "/" + data?.image} mr={["10px", "10px", "10px", "0px"]} mb="10px" w={["150px", "150px", "180px", "180px"]} alt="TopOne" />
                        }
                        {data?.image_3 && data?.image_3.length > 2 ? <Image src={imagePath + "/" + data?.image_3} mr={["10px", "10px", "10px", "0px"]} mb="10px" w={["150px", "150px", "180px", "180px"]} alt="TopOne" />
                        :<Image src={imagePath + "/" + data?.image} mr={["10px", "10px", "10px", "0px"]} mb="10px" w={["150px", "150px", "180px", "180px"]} alt="TopOne" />
                        }
                        </Flex>
                    <Center flexDir="column" alignItems={["start"]} h={["auto", "auto", "auto", "auto"]} justifyContent={"flex-start"}>
                        <Box w={["100%", "100%", "100%", "500px"]}>
                            <Img w="full" src={imagePath + "/" + data?.image} alt="TopOne" />
                        </Box>
                        <RWebShare
                            data={{
                                text: data?.itemName,
                                url: pathnameLink + "/" + `?product=${data?.itemName}&id=${user_id}`,
                                title: "Ice Street",
                            }}
                            onClick={() => {
                                toast({
                                    title: "product successfully shared",
                                    position: "top-right",
                                    status: "success",
                                    isClosable: true,
                                })
                            }}
                        >
                            <Center justifyContent="end" cursor="pointer" mt="20px" w="full" >
                                <Box mr="10px">
                                    Share
                                </Box>
                                <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5" />
                                </svg>
                            </Center>
                        </RWebShare>
                    </Center>
                    <Box className='bg-white lg:mt-0 mt-6 lg:w-4/12 lg:py-0 py-6 lg:px-0 px-[14px] w-full space-y-8' >
                        <Box className='space-y-4'>
                            <p className=' font-medium text-lg' >{data?.itemName}</p>
                            <Flex>
                                {data?.discount > 0 && <Box textDecoration="line-through" mr="15px" color="grey" className='text-lg font-bold' >{cashFormat(productInfo.total_amount)}</Box>}
                                <p className=' text-lg font-bold ' style={{ color: "rgba(5, 0, 224, 1)" }} >{cashFormat(data?.price - (data?.price * data.discount / 100))}</p>
                            </Flex>
                            <Flex h="20px" alignItems="center">
                                <Rating emptyStyle={{ marginRight: 44 }} SVGclassName={'inline-block'} disableFillHover={true} readonly={true} size={22} iconsCount={5} initialValue={data.rate - 1} />
                                <Box color="rgba(30, 30, 30, 1)" fontSize="14px" fontWeight="500">({data.comment ? data.comment : 0} Reviews)</Box>
                            </Flex>
                            <Flex>
                                <svg style={{ marginRight: 12 }} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="24" height="24" rx="12" fill="#D5D5FF" />
                                    <path d="M7.3335 12L10.6668 15.3333L17.3335 8.66666" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <Box>
                                    In Stock <span>{data.stock ? data.stock : 1}</span>
                                </Box>
                            </Flex>
                            <Flex mt="20px">
                                {countSize.map((a: string, b) => (
                                    <Button
                                        onClick={() => {
                                            setSize(a)
                                        }}
                                        colorScheme={size == a ? "blackAlpha" : 'gray'}
                                        fontSize={"12px"}
                                        bg={size == a ? "#000" : "#E8E8E8"}
                                        color={size == a ? "white" : "black"}
                                        key={b} borderRadius="6px" mr="10px" w="34px" h="34px">
                                        {a}
                                    </Button>
                                ))}
                            </Flex>
                            <Flex mt="20px">
                                {data.color.map((a: string, b:number) => (
                                    <Box p="5px" key={b} borderRadius="5px"  mr="2px" border={colorScheme === a ?"1px solid lightblue":""}>
                                        <Box
                                            onClick={() => {
                                                setColorScheme(a)
                                            }}
                                            bg={a}
                                            borderRadius="3px"
                                            key={b} w="28px" h="28px">

                                        </Box>
                                    </Box>
                                ))}
                            </Flex>
                            <Box className=' my-3 flex items-center'>
                                <QuantityBtns
                                    text='-'
                                    color={`${isSingleItem(productInfo.quantity) ? '#979494' : '#D3321C'}`}
                                    handleClick={handleQuantityClicked} />

                                <p className=' mx-5 font-normal text-[13px] ' >{productInfo.quantity}</p>
                                <QuantityBtns text='+' color='#D3321C' handleClick={handleQuantityClicked} />
                                <p className=' ml-3 font-normal text-[13px] '>
                                    ( {productInfo.quantity} {`item${isSingleItem(productInfo.quantity) ? '' : 's'} added`} )
                                </p>
                            </Box>
                        </Box>
                        <Box>
                            {data?.details && (
                                <Box className=' w-full bg-white lg:mt-8 ' >
                                    <p className=' font-bold ' style={{ marginBottom: 13 }} >Product details</p>
                                    <p className=' font-normal text-justify text-[15px] ' style={{ marginBottom: 13 }}>{data?.details}</p>
                                </Box>
                            )}

                            {data?.spec && (
                                <Box className=' w-full bg-white  mt-6 lg:mt-8 ' >
                                    <p className=' font-bold' >Specification</p>
                                    <p className=' font-normal text-justify text-[15px] ' >
                                        <HTMLState
                                            item={data?.spec}
                                        />
                                    </p>
                                </Box>
                            )}
                        </Box>

                        <Box className=" mt-6" >
                            <button style={{ marginBottom: 10 }} disabled={loading} onClick={() => {
                                if (localStorage.getItem("user")) {
                                    handleAddItemClicked()
                                } else {
                                    onOpen()
                                }
                            }} className=' w-full inline-flex justify-center items-center mr-2 rounded-[4px] text-black border border-black font-semibold h-[50px] ' >
                                {loading ? <SpinLoader size='md' /> : "Add items"}
                            </button>
                            <button disabled={loading2} onClick={() => {
                                if (localStorage.getItem("user")) {
                                    handleAddItemClicked2()
                                } else {
                                    onOpen()
                                }
                            }} className='w-full inline-flex items-center justify-center rounded-[4px] text-white bg-[#000] h-[50px] '
                            >
                                {loading2 ? <SpinLoader size='md' /> : "Pay Now"}
                            </button>
                        </Box>
                    </Box>
                </Box>
            </Box>

        </>
    )
} 