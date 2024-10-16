import React from 'react'
import { Image } from '@chakra-ui/react'

export default function ItemsComponent({ data }: any) {

    return (
        <div className=' flex lg:flex-col px-4 lg:overflow-x-hidden overflow-x-auto w-fit lg:pb-4 ' >
            <div className='border-[#D9D9D9] border-b hidden lg:flex justify-center py-2 ' >
                <p className=' font-medium ' >Items</p>
            </div>
            { data.length > 0 &&  data?.map((item:any, item_id:number)=>(<div key={item_id} className=' w-[50px] lg:w-full flex items-center lg:mx-0 mx-2 px-2 lg:px-0 lg:border-none border lg:py-4 ' >
               {item.item && <Image src={item.item.image} className=' lg:w-[49px] w-full object-contain  ' alt="g1" />
               } <div className=' lg:block hidden ml-4 ' >
                 {item.item &&  <p className=' font-normal text-sm ' >{item.item.itemName}</p>}
                </div>
            </div>))}
        </div>
    )
} 