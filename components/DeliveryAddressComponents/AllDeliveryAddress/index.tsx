import { Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { UserAddress } from '../../../services/userDashboardServices'

type props = {
    add: Function,
    data: any,
    edit: any,
    getAddress: Function
}


export default function AllDeliveryAddress({ add, data, edit, getAddress }: props) {
    const { deleteUserAddress, getUserInfo } = UserAddress()
    const [userData, setData] = useState([{email:[], firstname:"", lastname:"", phone:""}])

 async function DeleteAddress(id:"string"){
       await deleteUserAddress(id)
       getAddress()
    }

    

    useEffect(() => {
        const getProfile = async () => {

            const user = localStorage.getItem("user")

            try {
                const response = await getUserInfo(user)
                setData(response.data.delivery)
            } catch (err) {
                toast.error("Error occured");
            }
        }
        getProfile()
    }, [])

    return (
        <div className=' w-full rounded-[10px] pb-[57px] bg-white ' >
            <div className=' w-full border-b flex justify-between items-center border-[#D9D9D9] pb-[15px] lg:py-[15px] lg:px-[46px] ' >
                <p className=' lg:font-bold lg:text-lg text-sm ' >Delivery Address</p>
                <button onClick={() => add(true)} className=' px-[14px] lg:h-[40px] h-[35px] rounded bg-[#0dadf7] text-white font-semibold text-sm ' >Add new address</button>
            </div>
            {userData && userData.map((info: any, id: any) => (
            <div key={id} className=' w-full px-0 lg:px-[46px] py-[27px] grid grid-cols-1 lg:grid-cols-2 gap-6 pb-[50px] ' >
               
                    <div key={id} className=' border border-[#D9D9D9] rounded-[5px] w-full' >
                        <div className=' w-full p-[9px] border-b border-[#D9D9D9] justify-between flex items-center ' >
                            <p className=' text-[13px] text-[#767575] font-semibold ' >Default Delivery Address</p>
                            <div className=' flex items-center ' >
                                <button onClick={()=>{DeleteAddress(info._id)}} className=' flex text-xs font-normal ml-6 text-[#979494] ' >
                                    <Image src="/images/icon/delete.svg" alt='delete' width="12px" />
                                    <p className=' ml-2 ' >Delete</p>
                                </button>
                                <button className=' flex text-xs font-normal ml-6 text-[#0dadf7] mr-20px ' onClick={()=>{
                                 add(true)
                                 edit(info) 
                                }}  >
                                    <Image src="/images/icon/edit.svg" alt='edit' width="12px" />
                                    <p className=' ml-2 ' >Edit</p>
                                </button>
                            </div>
                        </div>
                        <div className=' w-full py-[19px] px-[17px] ' >
                            <div className=' flex items-center ' >
                                <div className=' w-14 ' >
                                    <Image src='/images/icon/coloredperson.svg' alt="person" width="14px" />
                                </div>
                                <p className=' font-normal text-sm text-[#363535E5] ' >{info.state}</p>
                            </div>
                            <div className=' flex items-center my-[14px] ' >
                                <div className=' w-14 ' >
                                    <Image src='/images/icon/colorcall.svg' alt="call" width="14px" />
                                </div>
                                <p className=' font-normal text-sm text-[#363535E5] ' >{info.lga}</p>
                            </div>
                            <div className=' flex items-center ' >
                                <div className=' w-14 ' >
                                    <Image src='/images/icon/location.svg' alt="location" width="14px" />
                                </div>
                                <p className=' font-normal text-sm text-[#363535E5] ' >{info.phone}</p>
                            </div>
                        </div>
                    </div>
            </div>))}
        </div>
    )
} 