import React, { useEffect } from 'react'
import { Box, Image } from '@chakra-ui/react'
import ItemsComponent from './component/ItemsComponent'
import { cashFormat, cashFormat2 } from '../../utils/cashFormat'
import moment from 'moment'


type props = {
    detail: Function,
    edit?: any,
    data?: any
}

export default function OrderSummary({ detail, edit, data }: props) {

    const [tab, setTab] = React.useState(false)
    const [number, setNumber] = React.useState<any>("0")

    useEffect(() => {
        console.log(edit, "edit")
        setNumber(localStorage.getItem("amount"))
    }, [])

    return (
        <Box className='rounded-[10px] bg-white' w={["100%"]} >
            <Box className=' w-full border-b flex justify-between items-center border-[#D9D9D9] py-[15px] lg:py-[15px] lg:px-[46px] ' >
                <Box className=' flex items-center ' >
                    <Image onClick={() => detail(false)} src='/images/icon/backarrow.svg' className=' cursor-pointer ' alt='Arrow' width="16px" />
                    <p className=' font-bold lg:text-lg ml-2 lg:ml-6 ' >{edit?.category?.title}</p>
                </Box>
            </Box>
            <Box className=' mt-4 lg:hidden ' >
                <ItemsComponent data={edit?.product_id} />
            </Box>
            <Box className=' lg:hidden flex justify-between mt-4 items-center text-sm ' >
                <button onClick={() => setTab(false)} className={!tab ? ' font-bold text-[#0dadf7] ' : ' font-bold '} >Summary</button>
                <button onClick={() => setTab(true)} className={tab ? ' font-bold text-[#0dadf7] ' : ' font-bold '}>Payment</button>
            </Box>
            <Box className=' w-full flex lg:mt-0 mt-6 ' >
                <Box className=' lg:flex hidden ' >
                    <ItemsComponent data={edit?.product_id} />
                </Box>
                <Box className={!tab ? ' flex flex-col flex-1 lg:px-4 lg:border-[#D9D9D9] lg:border-l lg:border-r ' : ' hidden lg:flex flex-col flex-1 px-4 lg:border-[#D9D9D9] lg:border-l lg:border-r '} >
                    <Box className='border-[#D9D9D9] lg:block hidden border-b py-2 ' >
                        <p className=' font-medium text-center ' >Country</p>
                    </Box>
                    <Box className=' text-sm my-2 flex items-center justify-between ' >
                        <p className='  font-semibold ' >Order ID:</p>
                        <p className=' font-normal ml-4 text-right ' >{edit?._id}</p>
                    </Box>
                    <Box className=' text-sm my-2 flex items-center justify-between ' >
                        <p className='  font-semibold ' >State:</p>
                        <p className=' font-normal ml-4 text-right ' >{edit.country}</p>
                    </Box>
                    <Box className=' text-sm my-2 flex items-center justify-between ' >
                        <p className='  font-semibold ' >Address:</p>
                        <p className=' font-normal ml-4 text-right ' >{edit.address}</p>
                    </Box>
                    <Box className=' text-sm my-2 flex items-center justify-between ' >
                        <p className='  font-semibold ' >Total:</p>
                        <p className=' font-normal ml-4 text-right ' >{cashFormat2(edit.total, edit.country)}</p>
                    </Box>
                    <Box className=' text-sm my-2 flex items-center justify-between ' >
                        <p className='  font-semibold ' >shipping and Payment fee:</p>
                        <p className=' font-normal ml-4 text-right text-[#0dadf7] ' >{cashFormat2(edit.shipping, edit.country)}</p>
                    </Box>
                    <Box className=' text-sm my-2 flex items-center justify-between ' >
                        <p className='  font-semibold ' >Total Product:</p>
                        <p className=' font-normal ml-4 text-right text-[#0dadf7] ' >{edit.product_id.length}</p>
                    </Box>
                    <Box className=' text-sm my-2 flex items-center justify-between ' >
                        <p className='  font-semibold ' >Date Created:</p>
                        <p className=' font-normal ml-4 text-right ' >{moment(edit.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    </Box>
                    <Box className=' text-sm my-2 flex items-center justify-between ' >
                        <p className='  font-semibold ' >Due Date</p>
                        <p className=' font-normal ml-4 text-right ' >{moment(edit.createdAt).add(edit.duration * 30, 'days').format('MMMM Do YYYY, h:mm:ss a')}</p>
                    </Box>
                    <Box className=' text-sm my-2 flex items-center justify-between ' >
                        <p className='  font-semibold ' >Delivery Status</p>
                        <p className=' font-normal ml-4 text-right ' >{edit.status}</p>
                    </Box>
                    <Box className=' mb-[17px] mt-4 text-sm font-normal p-[14px] rounded-[5px] bg-[#06904633] ' >
                        A call will be put through to you hours before delivery
                    </Box>
                </Box>
            </Box>
        </Box>
    )
} 