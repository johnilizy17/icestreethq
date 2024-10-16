import React from 'react'
import { MdArrowDownward, MdArrowDropDown, MdArrowDropUp, MdArrowUpward, MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md'
import { convertToLowerSnakeCase } from '../../utils/index.util'

interface props {
  heading: string
  active?: boolean
  children: string
  handleClick: Function
}

const ProductDescription = ({ heading, active, handleClick, children }: props) => {
  let snakeCaseHeading = convertToLowerSnakeCase(heading ?? "")

  return (
    <div className=' w-full bg-white py-[26px] px-4 lg:px-[43px] lg:mt-8 ' >
      <div className=' border-[#D9D9D9] border-b pb-2 mb-2 flex justify-between' >
        <p className=' font-bold ml-2 ' >{heading}</p>
        <button className='inline-block text-lg lg:hidden'
          onClick={() => handleClick(snakeCaseHeading)}>{active ? <MdOutlineArrowDropUp /> : <MdOutlineArrowDropDown />}</button>
      </div>
      <p className={`font-normal text-justify text-sm ${active ? "block" : "hidden"} lg:block`} >{children}</p>
    </div>
  )
}

export default ProductDescription