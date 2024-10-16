import { Image } from '@chakra-ui/react'
import React from 'react'
import { cashFormat } from '../../utils/cashFormat'

const SummaryProductItem = ({ name, price, imageUrl }: summaryProductItemProps) => {
    return (
        <div className=' w-full flex justify-between  py-4 ' >
            <Image src={imageUrl} boxSize="49px" alt={name} />
            <div className=' ml-6 text-sm text-right ' >
                <p className=' font-normal text-sm ' >{name}</p>
                <p className=' font-normal ' >{cashFormat(price)}</p>
            </div>
        </div>
    )
}

export default SummaryProductItem