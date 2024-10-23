import React from 'react'
import { Box, Image } from '@chakra-ui/react'
import ItemsComponent from './component/ItemsComponent'
import { cashFormat } from '../../utils/cashFormat'
import moment from 'moment'


type props = {
    detail: Function,
    edit?: any,
    data?: any
}

export default function OrderSummary({ detail, edit, data }: props) {

    const [tab, setTab] = React.useState(false)

    return (
        <Box className='rounded-[10px] bg-white' w={["100%"]} >
            <Box className=' w-full border-b flex justify-between items-center border-[#D9D9D9] py-[15px] lg:py-[15px] lg:px-[46px] ' >
                <Box className=' flex items-center ' >
                    <Image onClick={() => detail(false)} src='/images/icon/backarrow.svg' className=' cursor-pointer ' alt='Arrow' width="16px" />
                    <p className=' font-bold lg:text-lg ml-2 lg:ml-6 ' >{edit?.category?.title}</p>
                </Box>
                <button className=' text-white text-sm h-[26px] w-[90px] rounded-[5px] bg-[#0dadf7]  ' >Pay Now</button>
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
                    <ItemsComponent data={edit?.product_id }/>
                </Box>
                <Box className={!tab ? ' flex flex-col flex-1 lg:px-4 lg:border-[#D9D9D9] lg:border-l lg:border-r ' : ' hidden lg:flex flex-col flex-1 px-4 lg:border-[#D9D9D9] lg:border-l lg:border-r '} >
                    <Box className='border-[#D9D9D9] lg:block hidden border-b py-2 ' >
                        <p className=' font-medium text-center ' >Summary</p>
                    </Box>
                    <Box className=' text-sm my-2 flex items-center justify-between ' >
                        <p className='  font-semibold ' >Order ID:</p>
                        <p className=' font-normal ml-4 text-right ' >{edit?._id}</p>
                    </Box>
                    <Box className=' text-sm my-2 flex items-center justify-between ' >
                        <p className='  font-semibold ' >Category:</p>
                        <p className=' font-normal ml-4 text-right ' >Groceries</p>
                    </Box>
                    <Box className=' text-sm my-2 flex items-center justify-between ' >
                        <p className='  font-semibold ' >Package:</p>
                        <p className=' font-normal ml-4 text-right ' >Christmas</p>
                    </Box>
                    <Box className=' text-sm my-2 flex items-center justify-between ' >
                        <p className='  font-semibold ' >Payment frequency:</p>
                        <p className=' font-normal ml-4 text-right ' >{edit.payment_frequency
}</p>
                    </Box>
                    <Box className=' text-sm my-2 flex items-center justify-between ' >
                        <p className='  font-semibold ' >Amount:</p>
                        <p className=' font-normal ml-4 text-right text-[#0dadf7] ' >{cashFormat(edit.total)}</p>
                    </Box>
                    <Box className=' text-sm my-2 flex items-center justify-between ' >
                        <p className='  font-semibold ' >Paid:</p>
                        <p className=' font-normal ml-4 text-right text-[#0dadf7] ' >{cashFormat(edit.total-edit.balance)}</p>
                    </Box>
                    <Box className=' text-sm my-2 flex items-center justify-between ' >
                        <p className='  font-semibold ' >Date Created:</p>
                        <p className=' font-normal ml-4 text-right ' >{moment(edit.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    </Box>
                    <Box className=' text-sm my-2 flex items-center justify-between ' >
                        <p className='  font-semibold ' >Due Date</p>
                        <p className=' font-normal ml-4 text-right ' >{moment(edit.createdAt).add(edit.duration*30, 'days').format('MMMM Do YYYY, h:mm:ss a')}</p>
                    </Box>
                    <Box className=' text-sm my-2 flex items-center justify-between ' >
                        <p className='  font-semibold ' >Delivery Date</p>
                        <p className=' font-normal ml-4 text-right ' >untill payment is complete</p>
                    </Box>
                    <Box className=' mb-[17px] mt-4 text-sm font-normal p-[14px] rounded-[5px] bg-[#06904633] ' >
                        All payments has to be completed on
                        or before the due date to get package
                        delivery
                    </Box>
                </Box>
                <Box className={tab ? ' lg:px-4 w-full lg:w-fit pb-[54px] ' : ' lg:px-4 w-fit lg:block hidden pb-[54px] '} >
                    <Box className='border-[#D9D9D9] border-b flex justify-between lg:justify-center lg:px-2 py-2 ' >
                        <p className=' font-medium ' >Monthly Payment</p>
                        <p className=' font-semibold ml-12' >12 </p>
                    </Box>
                    <Box className=' py-[8px] border-[#D9D9D9] border-b ' >
                        <p className=' font-normal text-sm ' >Jan 18th 2023</p>
                        <Box className=' flex items-center text-sm text-[#979494] font-normal justify-between mt-1 ' >
                            <p>8,333.33</p>
                            <p>Paid</p>
                        </Box>
                    </Box>
                    <Box className=' py-[8px] border-[#D9D9D9] border-b ' >
                        <p className=' font-normal text-sm ' >Feb 18th 2023</p>
                        <Box className=' flex items-center text-sm text-[#979494] font-normal justify-between mt-1 ' >
                            <p>8,333.33</p>
                            <p>Paid</p>
                        </Box>
                    </Box>
                    <Box className=' py-[8px] border-[#0dadf7] border-b ' >
                        <p className=' font-normal text-sm ' >Mar 18th 2023</p>
                        <Box className=' flex items-center text-sm text-[#979494] font-normal justify-between mt-1 ' >
                            <p className=' text-[#0dadf7] ' >8,333.33</p>
                            <button className=' text-[#069046] ' >Pay Now</button>
                        </Box>
                    </Box>
                    <Box className=' py-[8px] border-[#0dadf7] border-b ' >
                        <p className=' font-normal text-sm ' >Apr 18th 2023</p>
                        <Box className=' flex items-center text-sm text-[#979494] font-normal justify-between mt-1 ' >
                            <p className=' text-[#0dadf7] ' >8,333.33</p>
                            <button className=' text-[#069046] ' >Pay Now</button>
                        </Box>
                    </Box>
                    <Box className=' py-[8px] border-[#0dadf7] border-b ' >
                        <p className=' font-normal text-sm ' >May 18th 2023</p>
                        <Box className=' flex items-center text-sm text-[#979494] font-normal justify-between mt-1 ' >
                            <p className=' text-[#0dadf7] ' >8,333.33</p>
                            <button className=' text-[#069046] ' >Pay Now</button>
                        </Box>
                    </Box>
                    <Box className=' py-[8px] border-[#0dadf7] border-b ' >
                        <p className=' font-normal text-sm ' >Jun 18th 2023</p>
                        <Box className=' flex items-center text-sm text-[#979494] font-normal justify-between mt-1 ' >
                            <p className=' text-[#0dadf7] ' >8,333.33</p>
                            <button className=' text-[#069046] ' >Pay Now</button>
                        </Box>
                    </Box>
                    <Box className=' py-[8px] border-[#0dadf7] border-b ' >
                        <p className=' font-normal text-sm ' >Jul 18th 2023</p>
                        <Box className=' flex items-center text-sm text-[#979494] font-normal justify-between mt-1 ' >
                            <p className=' text-[#0dadf7] ' >8,333.33</p>
                            <button className=' text-[#069046] ' >Pay Now</button>
                        </Box>
                    </Box>
                    <Box className=' py-[8px] border-[#0dadf7] border-b ' >
                        <p className=' font-normal text-sm ' >Aug 18th 2023</p>
                        <Box className=' flex items-center text-sm text-[#979494] font-normal justify-between mt-1 ' >
                            <p className=' text-[#0dadf7] ' >8,333.33</p>
                            <button className=' text-[#069046] ' >Pay Now</button>
                        </Box>
                    </Box>
                    <Box className=' py-[8px] border-[#0dadf7] border-b ' >
                        <p className=' font-normal text-sm ' >Sept 18th 2023</p>
                        <Box className=' flex items-center text-sm text-[#979494] font-normal justify-between mt-1 ' >
                            <p className=' text-[#0dadf7] ' >8,333.33</p>
                            <button className=' text-[#069046] ' >Pay Now</button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
} 