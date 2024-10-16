import React, { useEffect, useState } from 'react'
import MenuLayout from '../../components/MenuLayout'
import { Image, Input, Select, UseNumberInputProps, useToast } from '@chakra-ui/react'
import { calculatePaymentFrequency, isSingleItem } from '../../components/utils/productDetails.utils'
import PackageProductItem from '../../components/CreatePackagePage/components/PackageProductItem'
import SearchProductAutoComplete from '../../components/SearchProductsAutoComplete'
import { cashFormat } from '../../components/utils/cashFormat'
import { createPackage } from '../../services/UserPackage'
import { useRouter } from 'next/router'

interface PackageState {
    items: packageProductItem[]
    totalQuantity: number
}

export default function Create() {
    // package state
    const [packageName, setPackageName] = useState<string>("My Package")
    const [duration, setDuration] = useState(12)
    const [packageState, setPackageState] = useState<PackageState>({
        totalQuantity: 0,
        items: []
    })
    const [dailyPayment, setDailyPayment] = useState<number>(0)
    const toast = useToast()

    // page state
    const [tab, setTab] = React.useState(false)
    const router = useRouter()

    const addProduct = ({ name, imageUrl, id, price }: packageProductItem) => {
        // check if item exists in package
        if (!packageState) return
        for (let item of packageState?.items) {
            if (item.id === id) {
                toast({
                    title: "Product is already in your package",
                    position: "bottom",
                    status: "error",
                    duration: 1000,
                    isClosable: true,
                })
                return
            }
        }

        setPackageState({
            totalQuantity: packageState.totalQuantity + 1,
            items: [
                ...packageState.items,
                {
                    name,
                    imageUrl,
                    id,
                    price,
                    qty: 1
                }
            ]
        })

        toast({
            title: "Product added",
            status: "success",
            duration: 1000,
            position: "bottom"
        })
    }

    function removeProduct(id: string, productQuantity: number) {
        if (!packageState) return

        const updatedItems = packageState?.items.filter(item => item.id !== id);
        setPackageState({
            items: [
                ...updatedItems
            ],
            totalQuantity: packageState.totalQuantity - productQuantity
        });

    }


    const incrementPackage = (updatedValue: number, id: string, newQuantity: number) => {
        if (!packageState) return

        const newProducts = packageState.items.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    qty: newQuantity
                }
            }

            return item
        })

        setPackageState({
            items: newProducts,
            totalQuantity: packageState.totalQuantity + updatedValue
        })
    }
    const decrementPackage = (updatedValue: number, id: string, newQuantity: number) => {
        if (!packageState) return

        const newProducts = packageState.items.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    qty: newQuantity
                }
            }

            return item
        })

        setPackageState({
            items: newProducts,
            totalQuantity: packageState.totalQuantity - updatedValue
        })
    }

    const totalPrice = packageState?.items.reduce((total, product) => total + product.price * product.qty, 0);

    const postPackage = async () => {
        if (!packageState) return
        // get package data
        const products = packageState.items.map((item) => {
            return {
                item: item.id.toString(),
                qty: item.qty
            }
        })

        if (!totalPrice) return

        const data: CreatePackageProps = {
            duration,
            total: totalPrice,
            product_id: products,
            payment_frequency: "daily",
            numberOfExpectedPayment: duration,
            category: "63bfc18556a75b80998393f5"
        }

        const result = await createPackage(data)
        if (result._id) {
            localStorage.setItem("cartId", result._id)
            router.push("/cart")
        }

    }


    const handleQuantityChanged = (updatedValue: number, price: number, type: quantityAction, id: string, newQuantity: number) => {
        if (type === "increment") {
            incrementPackage(updatedValue, id, newQuantity)
        } else if (type == "decrement") {
            decrementPackage(updatedValue, id, newQuantity)
        }
    }

    // get monthly duration
    useEffect(() => {

        const { dailyPayment } = calculatePaymentFrequency(duration, totalPrice)
        setDailyPayment(dailyPayment)
    }, [duration, totalPrice])


    return (
        <MenuLayout menu={false} category={true} >
            <div className=' w-full bg-white lg:bg-[#F5F5F5] lg:pl-[32px] lg:pr-[32px] pl-4 pr-4 ' >
                <div className={!tab ? ' w-full  text-black flex items-center justify-between pt-3 lg:pt-6 lg:pb-4  ' : ' w-full  text-black hidden lg:flex items-center justify-between pt-3 lg:pt-6 lg:pb-4  '} >
                    <p className=' font-semibold lg:text-base text-sm text-gray-900 ' >Create Package</p>
                    <button onClick={() => setTab(true)} className=' font-medium lg:hidden text-white h-[30px] text-xs px-4 bg-[#0dadf7] rounded ' >View {packageState?.totalQuantity} items</button>
                </div>
                <div className=' w-full flex pb-8 ' >
                    <div className={!tab ? ' w-full bg-white py-6 lg:py-[44px] lg:px-[63px] ' : ' w-full lg:flex flex-col hidden bg-white py-6 lg:py-[44px] lg:px-[63px] '} >
                        <SearchProductAutoComplete handleProductClicked={addProduct} />
                    </div>
                    <div className={tab ? ' w-full lg:w-fit ' : ' w-full hidden lg:flex flex-col lg:w-fit '} >
                        <div className=' lg:w-[400px] w-full bg-white lg:ml-8 pb-12 ' >
                            {/* Package Display Heading */}
                            <div className=' border-b border-[#D9D9D9] w-full lg:mt-0 mt-4 h-[43px] flex items-center lg:justify-center ' >
                                <Image onClick={() => setTab(false)} src='/images/icon/backarrow.svg' className=' cursor-pointer lg:hidden ' alt='Arrow' width="16px" />
                                <p className=' font-semibold lg:ml-0 ml-2 ' >{packageName === "" ? "My Package" : packageName}</p>
                            </div>
                            {/* end of Package Display */}
                            {/* Package filter Section */}
                            <div className=' w-full flex lg:flex-row flex-col items-center lg:px-6 lg:mb-4 py-4 ' >
                                <div className=' w-full lg:w-[60%] ' >
                                    <p className=' font-semibold text-sm mb-2 lg:block flex flex-row justify-between' >Package Name <span className=' font-normal ' >(Optional)</span></p>
                                    <Input
                                        height="40px"
                                        border="1px solid #D9D9D9"
                                        backgroundColor="#fff"
                                        onChange={(e) => setPackageName(e.target.value)} />
                                </div>
                                <div className=' w-full lg:w-[30%] lg:mt-0 mt-3 lg:ml-3 font-medium ' >
                                    <p className=' font-semibold text-sm mb-2 ' >Duration</p>
                                    <Select placeholder='Select Duration' defaultValue={duration} fontSize="sm" height="40px" border="1px solid #D9D9D9" backgroundColor="#fff" onChange={(e) => setDuration(parseInt(e.target.value))}>
                                        {/* created a loop to count 12 months */}
                                        {[...new Array(12)].map((value, index) => (
                                            <option key={`option-${index}`}
                                                value={index + 1}>{index + 1} month{isSingleItem(index + 1) ? null : "s"}
                                            </option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            {/* end of package filter section*/}

                            <div className=''>
                                {
                                    packageState?.items.map((item, idx) => {
                                        return (
                                            <PackageProductItem
                                                key={idx}
                                                name={item.name}
                                                id={item.id}
                                                qty={item.qty}
                                                price={item.price}
                                                imageUrl={item.imageUrl}
                                                handleQuantityChanged={handleQuantityChanged}
                                                onRemove={removeProduct} />
                                        )
                                    })
                                }
                            </div>



                            <div className=' flex  py-4  border-b lg:px-6 justify-between border-[#D9D9D9] ' >
                                <p className=' font-normal text-[13px] ' >Items
                                    <span className=' ml-2 font-bold ' >{packageState?.totalQuantity}</span></p>
                                <div className='  ' >
                                    <p className=' font-normal text-[13px] ' >Amount <span className=' ml-2 font-bold text-[#0dadf7] ' >{cashFormat(totalPrice)}</span></p>
                                    <p className=' font-normal text-[13px] mt-4 ' >Daily <span className=' ml-2 font-bold text-[#0dadf7] ' >{cashFormat(dailyPayment)}</span></p>
                                </div>
                            </div>
                            <div className=' w-full flex justify-center pt-8 ' >
                                <button onClick={postPackage} className=' font-medium text-white h-[40px] text-sm w-[150px] bg-[#0dadf7] rounded ' >Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MenuLayout>
    )
} 