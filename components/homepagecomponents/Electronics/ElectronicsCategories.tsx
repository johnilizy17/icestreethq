import React, { useEffect } from 'react'
import { Image } from '@chakra-ui/react'
import CategoryLabel from '../../CategoryLabel'
import { getCategoriesById, getProducts } from '../../../services'
import { toast } from 'react-hot-toast'
import { cashFormat } from '../../utils/cashFormat'
import { useRouter } from 'next/router'
import { imagePath } from '../../../services/Variable'

type props = {
    id?: any,
    title?: any,
    type?: any
}


export default function ElectronicsCategories({ id, title, type }: props) {

    const [isHover, setIsHover] = React.useState(-1)

    const [data, setData] = React.useState([] as any)

    const router = useRouter()

    useEffect(() => {

        (async () => {
            try {
                const response = await getCategoriesById(id)

                setData(response);
            } catch (err) {
                toast.error("Error occured");
            }
            // setLoading(false);
        })();
    }, [data, id])

    const navigateToProductDetails = (id: number) => {
        localStorage.setItem("product", id.toString())
        router.push("/product-details")
    }

    return (
        <div className=' w-full cursor-pointer' >
            <CategoryLabel color='D2301C' label={true} type={type} title={title} createdBy={id} />

            <div className=' w-full grid grid-cols-2 lg:grid-cols-5 gap-5 px-4 lg:px-8 py-6 lg:py-12' >
                {data?.map((item: any, index: number) => {
                    return (
                        <div onClick={() => navigateToProductDetails(item._id)} key={index} onMouseOver={() => setIsHover(index)} onMouseOut={() => setIsHover(-1)} style={isHover === index ? { boxShadow: "0px 0px 10px 0px #d1d5dbaa" } : { boxShadow: "0px 0px 2px 0px #00000040" }} className=' w-full rounded-[5px] px-[11px] py-[15px]  ' >
                            <Image src={imagePath+"/"+item?.image} className=' object-contain h-[189px] lg:h-[242px] ' alt={item?.name} />
                            <div className='mt-4 lg:ml-2 ' >
                                <p className=' font-medium text-sm ' >{item?.itemName.length > 20 ? (item?.itemName).slice(0, 20) + "..." : item?.itemName}</p>
                                <p className='  font-bold ' >{cashFormat(item?.price)}</p>
                                <p className=' font-bold text-[#0dadf7] ' >{cashFormat(Math.round(item.price))}<span className=' ml-2 font-normal text-xs lg:text-base text-black ' >Daily</span> </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}  