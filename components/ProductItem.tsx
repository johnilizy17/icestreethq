import { Box, Button, Flex, Image } from '@chakra-ui/react'
import React, { useState } from 'react'
import QuantityBtns from './QuantityBtns'
import { cashFormat } from './utils/cashFormat'
import { isLessThanOrEqualOne } from './utils/index.util'
import { calculateTotalAmount, isSingleItem } from './utils/productDetails.utils'
import { imagePath } from '../services/Variable'

interface Props {
    id: string
    imageURL: string
    name: string,
    initialTotalAmount: number,
    quantity: number,
    products:any,
    index:number,
    discount:number,
    price: number
    handleQuantityChanged: Function
    handleTotalProductAmountChanged?: Function
    handleProductRemoved: (id: string, qty: number, totalAmount: number) => void
}

const ProductItem = ({ imageURL, id,products, discount, index, name, initialTotalAmount, quantity, handleQuantityChanged, price, handleProductRemoved }: Props) => {
    const [stateQuantity, setStateQuantity] = useState<number>(quantity)
    const [totalAmount, setTotalAmount] = useState<number>(initialTotalAmount)

    const handleIncrementQuantity = () => {
        //calculate new quantity
        let updatedValue = 1
        products[index].qty = products[index].qty + 1
        const newQuantity = stateQuantity + 1
        setStateQuantity(newQuantity)
        setTotalAmount(calculateTotalAmount(price, newQuantity))


        // alert parent about the change in quantity;
        handleQuantityChanged(updatedValue, price, "increment", id, newQuantity)
    }

    const handleDecrementQuantity = () => {
        //calculate new quantity
        let updatedValue = isLessThanOrEqualOne(stateQuantity) ? 0 : 1
        products[index].qty = products[index].qty - 1
        let newQuantity = isLessThanOrEqualOne(stateQuantity) ? 1 : stateQuantity - updatedValue
        setStateQuantity(newQuantity)

        // change total amount
        setTotalAmount(calculateTotalAmount(price, newQuantity))

        if (!isLessThanOrEqualOne(stateQuantity))
            handleQuantityChanged(updatedValue, price, "decrement", id, newQuantity)
    }

    return (
        <Box justifyContent={"space-between"} className=' w-full flex rounded-lg items-center my-2' >
            <Flex>
                <Image src={imagePath + "/" + imageURL} className=' mr-6 w-[85px] lg:w-[207px] ' alt="TopOne" />
                <Box>
                    <Box>

                    </Box>
                </Box>
            </Flex>
            <Box className=' ml-2 space-y-2 w-2/6 lg:w-auto' >
                <p className=' lg:text-base text-xs font-medium ' >{name}</p>
                <p className='text-sm lg:text-lg font-bold ' >{cashFormat(totalAmount-((discount*totalAmount)/100))}</p>
                <Button display={["flex","flex","flex","none"]} onClick={() => handleProductRemoved(id, stateQuantity, totalAmount)} className=' rounded-md font-medium lg:hidden flex items-center bg-[#D5D4FF] h-[30px] text-xs mt-4 px-4 text-[#000]' >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 17C6.53043 17 7.03914 17.2107 7.41421 17.5858C7.78929 17.9609 8 18.4696 8 19C8 19.5304 7.78929 20.0391 7.41421 20.4142C7.03914 20.7893 6.53043 21 6 21C5.46957 21 4.96086 20.7893 4.58579 20.4142C4.21071 20.0391 4 19.5304 4 19C4 18.4696 4.21071 17.9609 4.58579 17.5858C4.96086 17.2107 5.46957 17 6 17ZM6 17H12.5M6 17V3H4M6 5L20 6L19 13H6M16 19H22" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <Box ml="5px">
                    Remove
                    </Box>
                </Button>
                {/* desktop quantity update component */}
                <Box className=' my-3 hidden lg:flex items-center ' >
                    <QuantityBtns text='-'
                        color={`${isSingleItem(stateQuantity) ? '#979494' : '#0dadf7'}`}
                        handleClick={handleDecrementQuantity} />
                    <p className=' mx-5 font-normal text-[13px] ' >{stateQuantity}</p>
                    <QuantityBtns text='+' color='#0dadf7' handleClick={handleIncrementQuantity} />
                    <Button onClick={() => handleProductRemoved(id, stateQuantity, totalAmount)} className='rounded font-medium text-black h-[29px] text-sm ml-14 px-4 bg-[#D5D4FF]' >
                        <Box mr="5px">
                            Remove
                        </Box>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 17C6.53043 17 7.03914 17.2107 7.41421 17.5858C7.78929 17.9609 8 18.4696 8 19C8 19.5304 7.78929 20.0391 7.41421 20.4142C7.03914 20.7893 6.53043 21 6 21C5.46957 21 4.96086 20.7893 4.58579 20.4142C4.21071 20.0391 4 19.5304 4 19C4 18.4696 4.21071 17.9609 4.58579 17.5858C4.96086 17.2107 5.46957 17 6 17ZM6 17H12.5M6 17V3H4M6 5L20 6L19 13H6M16 19H22" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </Button>
                </Box>
            </Box>
            {/** mobile quantity update component */}
            <Box className=' ml-8 h-full lg:hidden flex flex-col items-center ' >
                <QuantityBtns text='-' color={`${isSingleItem(stateQuantity) ? '#979494' : '#0dadf7'}`} handleClick={handleDecrementQuantity} />

                <p className=' text-[15px] font-medium my-2 ' >{stateQuantity}</p>
                <QuantityBtns text='+' color='#0dadf7' handleClick={handleIncrementQuantity} />
            </Box>
        </Box>
    )
}

export default ProductItem