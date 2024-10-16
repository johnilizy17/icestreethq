import { Image } from '@chakra-ui/react'
import React, { useState } from 'react'
import QuantityBtns from './QuantityBtns'
import { cashFormat } from './utils/cashFormat'
import { isLessThanOrEqualOne } from './utils/index.util'
import { calculateTotalAmount } from './utils/productDetails.utils'

interface productItemProp {
    imageURL: string
    name: string,
    initialTotalAmount: number,
    quantity: number,
    price: number
    handleQuantityChanged: Function
    handleTotalProductAmountChanged?: Function
}

const ProductItemPayNow = ({ imageURL, name, initialTotalAmount, quantity, handleQuantityChanged, handleTotalProductAmountChanged, price }: productItemProp) => {
    const [stateQuantity, setStateQuantity] = useState<number>(quantity)
    const [totalAmount, setTotalAmount] = useState<number>(initialTotalAmount)

    const handleIncrementQuantity = () => {
        //calculate new quantity
        let updatedValue = 1
        const newQuantity = stateQuantity + 1
        setStateQuantity(newQuantity)
        setTotalAmount(calculateTotalAmount(price, newQuantity))


        // alert parent about the change in quantity
        handleQuantityChanged(updatedValue, price, "increment")


    }

    const handleDecrementQuantity = () => {
        //calculate new quantity
        let updatedValue = isLessThanOrEqualOne(stateQuantity) ? 0 : 1
        let newQuantity = isLessThanOrEqualOne(stateQuantity) ? 1 : stateQuantity - updatedValue
        setStateQuantity(newQuantity)

        // change total amount
        setTotalAmount(calculateTotalAmount(price, newQuantity))

        if (!isLessThanOrEqualOne(stateQuantity))
            handleQuantityChanged(updatedValue, price, "decrement")
    }

    return (
        <div className=' w-full flex items-center my-2 justify-center border lg:border-b lg:border-r-0 lg:border-t-0 lg:border-l-0 py-3 lg:px-4 border-[#D9D9D9] ' >
            <Image src={imageURL} className=' mr-6 w-[85px] lg:w-[207px] ' alt="TopOne" />
            <div className=' ml-2  ' >
                <p className=' lg:text-base text-sm font-medium ' >{name}</p>
                <p className='text-sm lg:text-lg font-bold ' >{cashFormat(totalAmount)}</p>
                <button className=' font-medium lg:hidden flex items-center bg-[#D2301C33] h-[30px] text-xs mt-4 px-4 text-[#D2301C] rounded ' >
                    <Image src='/images/icon/trash.svg' alt="gone" className=' w-[12px] mr-2  object-contain ' />
                    Remove
                </button>
                {/* desktop quantity update component */}
                <div className=' my-3 hidden lg:flex items-center ' >
                    <QuantityBtns text='-' color='#0dadf7' handleClick={handleDecrementQuantity} />
                    <p className=' mx-5 font-normal text-[13px] ' >{stateQuantity}</p>
                    <QuantityBtns text='+' color='#0dadf7' handleClick={handleIncrementQuantity} />
                    <button className=' font-medium text-white h-[29px] text-sm ml-14 px-4 bg-[#D2301C] rounded ' >Remove</button>
                </div>
            </div>
            {/** mobile quantity update component */}
            <div className=' ml-8 h-full lg:hidden flex flex-col items-center ' >
                <QuantityBtns text='-' color='#0dadf7' handleClick={handleDecrementQuantity} />

                <p className=' text-[15px] font-medium my-2 ' >{stateQuantity}</p>
                <QuantityBtns text='+' color='#0dadf7' handleClick={handleIncrementQuantity} />
            </div>
        </div>
    )
}

export default ProductItemPayNow