import { Image } from '@chakra-ui/react'
import React from 'react'
import { MdAdd } from 'react-icons/md'


const ProductSearchResultItem = ({ name, handleClick, imageUrl }: productSearchResultItemProps) => {

    return (
        <div className=' flex items-center py-2 justify-between w-full ' >
            <div className=' flex items-center ' >
                <figure className=' border border-[#EEEDED] lg:h-[60px] lg:w-[60px] flex justify-center items-center ' >
                    <Image src={imageUrl} alt="gone" width="45px" className='object-contain ' />
                </figure>
                <p className=' ml-4 lg:text-base text-sm font-normal text-black ' >{name}</p>
            </div>
            <button onClick={() => handleClick()} className=' font-medium lg:flex hidden text-white h-[30px] items-center px-4 bg-[#FE7062] rounded ' >Add</button>
            <button onClick={() => handleClick()} className='inline-flex justify-center items-center lg:hidden  mr-4 rounded-full w-6 h-6 p-1 border border-red-500'>
                <MdAdd className='text-red-500' />
            </button>
        </div>
    )
}

export default ProductSearchResultItem