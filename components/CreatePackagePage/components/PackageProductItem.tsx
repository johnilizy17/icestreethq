import { Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { cashFormat } from '../../utils/cashFormat'
import { isLessThanOrEqualOne } from '../../utils/index.util'
import { calculateTotalAmount } from '../../utils/productDetails.utils'

const PackageProductItem = ({ name, onRemove, price, imageUrl, id, qty, handleQuantityChanged }: packageProductItemProps) => {

    const [stateQuantity, setStateQuantity] = useState<number>(0)
    const [totalAmount, setTotalAmount] = useState<number>(0)

    useEffect(() => {
        setStateQuantity(qty)
        setTotalAmount(price * qty)
    }, [price, qty])

    const handleIncrementQuantity = () => {
        //calculate new quantity
        let updatedValue = 1
        const newQuantity = stateQuantity + 1
        setStateQuantity(newQuantity)
        setTotalAmount(calculateTotalAmount(price, newQuantity))


        // alert parent about the change in quantity;
        handleQuantityChanged(updatedValue, price, "increment", id, newQuantity)
    }

    const handleDecrementQuantity = () => {
        //calculate new quantity
        let updatedValue = isLessThanOrEqualOne(stateQuantity) ? 0 : 1
        let newQuantity = isLessThanOrEqualOne(stateQuantity) ? 1 : stateQuantity - updatedValue
        setStateQuantity(newQuantity)

        // change total amount
        setTotalAmount(calculateTotalAmount(price, newQuantity))

        if (!isLessThanOrEqualOne(stateQuantity))
            handleQuantityChanged(updatedValue, price, "decrement", id, newQuantity)
    }
    return (
        <div className=' flex items-center py-4 border rounded-xl lg:border-t-0 lg:border-r-0 lg:border-l-0 lg:border-b px-4 lg:px-6 justify-between border-[#D9D9D9] mb-4'>
            <div className=' w-full flex items-center' >
                <Image src={imageUrl} alt="gone" className=' w-[70px] lg:w-[50px] object-contain ' />
                <div className=' ml-3' >
                    <p className=' text-[13px] font-medium ' >{name}</p>
                    <p className=' text-[13px] font-bold ' >{cashFormat(totalAmount)}</p>
                    <button onClick={() => onRemove(id, stateQuantity)} className='font-medium justify-center lg:hidden flex rounded-md items-center bg-[#D2301C33] h-[30px] text-xs mt-4 px-4 text-[#D2301C] ' >
                        <span className='flex items-center w-max'>
                            <Image src='/images/icon/trash.svg' alt="gone" className=' w-[12px] mr-2  object-contain ' />
                            Remove
                        </span>
                    </button>
                </div>
            </div>

            <div className=' h-full lg:hidden flex flex-col items-center ' >
                <button onClick={handleIncrementQuantity} className=" w-[25px] h-[25px] rounded-full text-white bg-[#0dadf7] flex justify-center items-center text-2xl " >
                    <p className='mb-[1px] ' >+</p>
                </button>
                <p className=' text-[15px] font-medium my-2 ' >{stateQuantity}</p>
                <button onClick={handleDecrementQuantity} className={` w-[25px] h-[25px] rounded-full text-white 
                ${stateQuantity <= 1 ? "bg-[#979494]" : "bg-[#0dadf7]"} flex justify-center items-center text-2xl `} >
                    <p className='mb-[1px] ' >-</p>
                </button>
            </div>
            <button onClick={() => onRemove(id, stateQuantity)} className=' font-medium lg:flex hidden items-center text-white h-[30px] text-sm px-4 bg-[#D2301C] rounded ' >Remove</button>
        </div>

    )
}

export default PackageProductItem