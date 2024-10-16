import React from 'react'

interface infoItemProps {
    label: string,
    text: string
}

const CartInfoItem = ({ label, text }: infoItemProps) => {
    return (
        <li className='flex justify-between'>
            <b className='font-semibold'>{label}</b>
            <span className='font-medium'>{text}</span>
        </li>
    )
}

export default CartInfoItem