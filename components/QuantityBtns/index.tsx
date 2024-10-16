import React from 'react'

interface props {
    text: string,
    color: string,
    handleClick: Function
}

const QuantityBtns = ({ text, color, handleClick }: props) => {
    return (
        <button className={`w-[20px] h-[20px] bg-[${color}] text-[20px] text-white flex justify-center items-center pb-[2px] font-normal rounded-full `}
            onClick={() => handleClick(text === "-" ? "decrement" : "increment")}>
            {text}
        </button>
    )
}


export default QuantityBtns