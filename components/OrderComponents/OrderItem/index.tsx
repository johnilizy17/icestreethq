import { Box, Center, Image } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { cashFormat } from '../../utils/cashFormat'
import { imagePath } from '../../../services/Variable'
import { useRouter } from 'next/router'

type props = {
    detail: Function,
    data?: any,
    setEdit: Function
}

export default function OrderItem({ detail, data, setEdit }: props) {

    const [isHover, setIsHover] = React.useState(-1)
    const router = useRouter()

    const Items = ["one", "two", "three", "four", "one", "two", "three", "four"]


    return (
        <Box className=' w-full py-[24px] lg:px-[44px] ' >
            {
                data.map((r: any, _id: number) => (
                    <>
                        {
                            r.product_id.length === 1 ?
                                <Box className=' w-full border border-[#D9D9D9] rounded-[5px] mb-[22px] py-[3px] lg:py-[15px] px-4 lg:px-[25px] flex lg:flex-row flex-col lg:items-center ' >
                                    <Box className=' flex items-center ' >
                                        <button className=' w-[12px] ' >

                                            <Image src="/images/icon/left.svg" alt='left' />
                                        </button>
                                        <Box className=' w-full justify-center lg:w-[130px] flex items-center mx-4 p-2 ' >
                                            <Image src={imagePath + "/" + r.product_id[0]?.item?.image} alt='Top1' />

                                        </Box>
                                        <button className=' w-[12px] ' >
                                            <Image src="/images/icon/right.svg" alt='right' />
                                        </button>
                                    </Box>
                                    <Box className=' lg:ml-6 lg:p-0 p-4 ' >
                                        <p className=' font-semibold lg:text-lg ' >{r.product_id[0]?.item?.itemName}</p>
                                        <p className=' font-normal mt-1 ' >{r._id}</p>
                                        <p className=' font-bold ' >{cashFormat((r.product_id[0].item.price - (r.product_id[0].item.price * r.product_id[0].item.discount) / 100))}</p>
                                        {r.status === "pending" && <button
                                            onClick={() => {
                                                localStorage.setItem("default_package", r._id)
                                                router.push("/cart")
                                            }}
                                            className=' mt-2 w-full lg:w-[120px] rounded-[5px] h-[35px] text-sm font-medium text-white bg-[#0dadf7]  ' >Pay Now</button>}
                                        {r.status != "pending" && <p onClick={() => {
                                            setEdit(r)
                                            detail(true)
                                        }} className=' font-normal mt-3 text-center lg:text-left lg:mt-1 cursor-pointer text-[#0088FE] underline ' >See Details</p>
                                        }
                                    </Box>
                                </Box> :
                                r.product_id.length > 1 &&
                                <Box key={_id} onMouseOver={() => setIsHover(_id)} onMouseOut={() => setIsHover(-1)} style={isHover === _id ? { boxShadow: "0px 0px 10px 0px #d1d5dbaa" } : { boxShadow: "0px 0px 2px 0px #00000040" }} className=' w-[full] rounded-[5px] mb-5' >
                                    <Box className=' w-full px-6 py-2 grid lg:grid-cols-1   ' >
                                        {r.product_id.map((items: any, items_id: number) => (
                                            <Box key={items_id} className=' w-full flex items-center py-4 ' >
                                                <Image src={imagePath + "/" + items?.item.image} boxSize="49px" alt="g1" />
                                                <Box className=' ml-6 ' >
                                                    <p className=' font-normal text-sm ' >{items.item.itemName}</p>
                                                    <p className=' font-bold ' >{cashFormat((items.item.price - (items.item.price * items.item.discount) / 100))}</p>
                                                </Box>
                                            </Box>
                                        ))}
                                    </Box>
                                    <Center flexDirection={"column"} className=' w-full px-6 py-5 ' >
                                        {r.status === "pending" && <Link
                                            href={`/cart/${_id}`}
                                            className={`inline-flex items-center justify-center${isHover !== _id ?
                                                ' w-full lg:w-[120px] text-[#D2301C] border-[#D2301C] border font-semibold text-sm h-[45px] rounded-[5px] ' :
                                                ' w-full lg:w-[120px] text-white bg-[#FE7062] font-semibold text-sm h-[45px] rounded-[5px]  '}`} >Pay Nows</Link>}
                                        {r.status != "pending" && <p onClick={() => {
                                            setEdit(r)
                                            detail(true)
                                        }} className=' font-normal mt-3 text-center lg:text-left lg:mt-1 cursor-pointer text-[#0088FE] underline ' >See Details</p>
                                        }
                                    </Center>

                                </Box>
                        }
                    </>
                ))}
        </Box>
    )
} 