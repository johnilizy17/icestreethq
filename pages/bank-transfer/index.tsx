import React from 'react'
import MenuLayout from '../../components/MenuLayout'
import { Input } from '@chakra-ui/react'
import MassBuyAccountInfo from './components/MassBuyAccountInfo'
import PaymentForm from './components/PaymentForm'

export default function BankTransfer() {
    return (
        <MenuLayout menu={false} category={true} >
            <div className=' w-full bg-[#F5F5F5] flex justify-center py-8 ' >
                <div className=' w-[900px] flex flex-col items-center py-12 bg-white  ' >
                    <p className=' font-semibold text-center text-lg ' >Pay for Christmas Package</p>
                    <div className=' w-[380px] ' >
                        {/* start of heading */}
                        <div className=' w-full flex justify-between items-center py-3 ' >
                            <p className='  font-semibold ' >Hello John</p>
                            <p className='  font-normal text-[#000] ' >Pay <span className=' font-semibold  ' >₦8,333.33</span></p>
                        </div>
                        {/* end of heading */}

                        <MassBuyAccountInfo />

                        {/* start form fields */}
                        <PaymentForm />
                        {/* end of form fields */}
                    </div>
                </div>
            </div>
        </MenuLayout>
    )
} 