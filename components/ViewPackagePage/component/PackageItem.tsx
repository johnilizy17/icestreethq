import { Image } from '@chakra-ui/react'
import React from 'react'
import { cashFormat } from '../../utils/cashFormat'


const PackageItem = ({ imageURL, name, price, handleItemClicked, id, active }: packageItemProps) => {
    return (
        <figure className={`min-w-[49px] lg:w-full items-center flex py-1 lg:py-4 cursor-pointer border lg:border-none rounded-sm ${active ? "border-[#0dadf7]" : "border-[#979494] "}`} onClick={() => handleItemClicked(id)} >
            <Image src={imageURL} boxSize="49px" alt="g1" />
            <div className='ml-3 hidden lg:block' >
                <p className=' font-normal text-sm ' >{name}</p>
                <p className=' font-bold text-xxs' >{cashFormat(price)}</p>
            </div>
        </figure>
    )
}

export default PackageItem