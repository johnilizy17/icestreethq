import React from 'react'
import Router from 'next/router'
import { Image } from '@chakra-ui/react'
import SummaryInfo from '../../components/OrderSummary/components/SummaryInfo';
import SummaryProductItem from '../../components/OrderSummary/components/SummaryProductItem';

const summaryData = [
    { name: 'Order ID', value: 'MA1209098233' },
    { name: 'Category', value: 'Groceries' },
    { name: 'Package', value: 'Christmas' },
    { name: 'Date Created', value: '17-Jan- 2022' },
    { name: 'Payment frequency', value: 'Monthly' },
    { name: 'Amount', value: '₦300,000' },
    { name: 'Paid', value: '₦8,333.33' },
    { name: 'Next Payment', value: '17-Feb- 2022' },
];

const products = [
    {
        imageUrl: '/images/items/g1.png',
        name: '1 carton of sugar',
        price: '2,000',
    },
    {
        imageUrl: '/images/items/g2.png',
        name: '1 bag of rice',
        price: '2,000',
    },
    {
        imageUrl: '/images/items/g3.png',
        name: '1 carton of sugar',
        price: '2,000',
    },
    {
        imageUrl: '/images/items/g4.png',
        name: '1 carton of sugar',
        price: '2,000',
    },
];


export default function OrderSummary() {
    return (
        <div className=' w-full min-h-screen bg-[#F5F5F5] flex flex-col items-center ' >
            {/* <div style={{ boxShadow: "0px 0px 10px 0px #00000040" }} className=' bg-white w-full flex px-[35px] py-[22px] justify-center items-center ' >
                <button onClick={() => Router.push("/")} className=' flex items-center ' >
                                    <Image src="/images/logo.png" className=' ml-1 h-[40px] ' alt='logo' />
        </button>
            </div>
            <div className='w-full max-w-2xl py-6 my-8 pb-12 px-8 bg-white ' >
                <p className=' font-semibold text-lg text-center mb-12 ' >Order Package Detail</p>
                {summaryData.map((data) => (
                    <SummaryInfo key={data.name} name={data.name} value={data.value} />
                ))}


                <p className=' font-normal mt-12 text-[15px] ' >Package summary</p>
                <div className='w-full py-2 ' >
                    {products.map((product, idx) => (
                        <SummaryProductItem
                            key={idx}
                            imageUrl={product.imageUrl}
                            price={product.price}
                            name={product.name}
                        />
                    ))}

                </div>
            </div> */}
        </div>
    )
} 