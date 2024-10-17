import { Box, Button, Center, Select, useDisclosure, useToast } from '@chakra-ui/react'
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

const MoreItemsMain = () => {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [packageInfo, packageDispatch] = useReducer(packageInfoReducer, initialState)
    const [loading, setLoading] = useState(true)
    const [empty, setEmpty] = useState(true)
    const [packageId, setPackageId] = useState<string>();
    const [activeTab, setActiveTab] = useState<FrequencyType>("monthly")
    const [SumTotal, setSumTotal] = useState(cashFormat(0))
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
        packageDispatch({ type: "CHANGE_DURATION", payload: duration })
    }

    const addPackageToCart = () => {
        if (!packageId) return
        setLoading(true)
        const packageData: UpdatePackageProps = {
            duration: packageInfo.duration,
            total: packageInfo.totalAmount,
            payment_frequency: paymentInfo.paymentFrequency,
            category: packageInfo.packageInstance.category,
            numberOfExpectedPayment: calculateNumberPayment(packageInfo.duration, paymentInfo.paymentFrequency),
            product_id: packageInfo.packageInstance.product_id,
            package_id: packageId ?? ""
        }
        updatePackage2(packageData)
            .then(() => {
                localStorage.setItem("cartId", packageId)
                route.push("/cart")
            })
            setLoading(false)
    }


    useEffect(() => {
        const packageId = localStorage.getItem("default_package");

        if (packageId) {
            setPackageId(packageId);

            getPackage(packageId ?? "")
                .then((_res) => {
                    let res = _res[0]
                    let { dailyPayment: daily_payment, weeklyPayment: weekly_payment, monthlyPayment: monthly_payment } = calculatePaymentFrequency(res.duration, res.total)

                    const pageData: PackageInfoType = {
                        packageInstance: res,
                        duration: res.duration,
                        totalAmount: parseInt(res.total),
                        totalQuantity: getTotalQuantity(res.product_id),
                        daily_payment,
                        weekly_payment,
                        monthly_payment
                    }
                    packageDispatch({ type: "INIT", payload: pageData })
                    setLoading(false)
                })
        } else {
            setEmpty(true)
        }
    }, [route])


    useEffect(() => {
        let frequency = packageInfo.packageInstance.payment_frequency
        setActiveTab(frequency)
    }, [packageInfo.packageInstance.payment_frequency])
    function SumTotalFunction() {
        const products = packageInfo.packageInstance.product_id
        console.log(products, "products")
        if (products && products.length > 0) {
            const reformat = products.map((a: any, b: number) => {
                return a.item.price * a.qty
            })
            const total = reformat.reduce((a: any, b: number) => a + b, 0)

            setSumTotal(cashFormat(total))
        } else {
            setSumTotal(cashFormat(0))
        }
    }

    useEffect(() => {
        SumTotalFunction()
    }, [])



    if (loading) return empty ? <Center h="400px"><Box> <Lottie options={defaultOptions}
        height={300}
        width={300} />
        <Box fontWeight="700" textAlign="center" mt="10px" fontSize="24px">
            Empty Cart
        </Box> </Box></Center> : <Center> <SpinLoader /> </Center>
    return (
        <div
            onClick={() => SumTotalFunction()}
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
                            name={product.itemName}
                            quantity={productInfo.qty}
                            handleQuantityChanged={handleQuantityChanged}
                            handleProductRemoved={handleRemoveProduct}
                            handleTotalProductAmountChanged={handlePaymentFrequencyChanged}
                            price={convertToNumber(product.price)}
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
                    {/* <button onClick={onOpen} className='w-2/6 py-2 px-2 inline-flex lg:hidden items-center justify-between border border-[#0dadf7] text-[#0dadf7] bg-white text-sm font-semibold rounded-md' >
                        <MdAddCircleOutline color='#0dadf7' />
                        Add Items
                    </button> */}
                    <Button isLoading={loading} isDisabled={loading} w="full" bg="black" colorScheme='blackAlpha' onClick={addPackageToCart} >
                        Checkout
                    </Button>
                </div>
            </div>
            <SearchProductModal isOpen={isOpen} onClose={onClose} handleClick={handleItemAdded} />
        </div >
    )
}

export default MoreItemsMain