import React from 'react'
import { Image } from '@chakra-ui/react'
import { useRouter } from 'next/router'


export default function CategoryMenu() {

    const router = useRouter() 
    const [routerPath, setRouterPath] = React.useState("")

    const clickHandler =(item: any)=> {
        router.push(item) 
    } 

    React.useEffect(()=> {
        setRouterPath(router.pathname)
    }, [router])
    
    return (
        <div style={{boxShadow: "0px 0px 2px 0px #00000040"}} className=' w-[80%] lg:relative fixed bottom-[55px] right-0 lg:w-[240px] bg-white lg:h-[390px] rounded-[10px] flex flex-col pt-0 pl-6 lg:pb-[12px] pb-2 p-[12px] ' >
           <div className=' border-b lg:pl-0 pl-6 border-[#D9D9D9] pb-[20px] mb-[20px] ' >
                <div className=' flex items-center ' >
                    <div className=' w-14 ' > 
                        <Image alt="Icon" src='/images/menu/person.svg' width="17px" />
                    </div>
                    <p className=' font-semibold lg:text-xl ' >Profile</p>
                </div>
                <div className=' flex items-center ' >
                    <div className=' w-14 ' />
                    <div className=' flex flex-col ' >
                        <p onClick={()=> clickHandler("/dashboard")} className={routerPath === "/dashboard" ? ' text-[#0dadf7] cursor-pointer font-medium  mt-[13px] text-sm ': ' text-[#979494] cursor-pointer font-medium  mt-[13px] text-sm '} >Account Information</p>
                        <p onClick={()=> clickHandler("/delivery-address")} className={routerPath === "/delivery-address" ? ' text-[#0dadf7] cursor-pointer font-medium  mt-[13px] text-sm ': ' text-[#979494] cursor-pointer font-medium  mt-[13px] text-sm '}  >Delivery Address</p>
                    </div>
                </div>
            </div>
            <div className=' border-b lg:pl-0 pl-6 border-[#D9D9D9] pb-[20px] mb-[20px] ' >
                <div className=' flex items-center ' >
                    <div className=' w-14 ' > 
                        <Image alt="Icon" src='/images/menu/cart.svg' width="17px" />
                    </div>
                    <p className=' font-semibold lg:text-xl ' >Order</p>
                </div>  
                <div className=' flex items-center ' >
                    <div className=' w-14 ' />
                    <div className=' flex flex-col ' > 
                        <p onClick={()=> clickHandler("/active-order")} className={routerPath === "/active-order" ? ' text-[#0dadf7] cursor-pointer font-medium  mt-[13px] text-sm ': ' text-[#979494] cursor-pointer font-medium  mt-[13px] text-sm '} >Active</p>
                        <p onClick={()=> clickHandler("/pending-order")} className={routerPath === "/pending-order" ? ' text-[#0dadf7] cursor-pointer font-medium  mt-[13px] text-sm ': ' text-[#979494] cursor-pointer font-medium  mt-[13px] text-sm '}  >Pending</p>
                        <p onClick={()=> clickHandler("/completed-order")} className={routerPath === "/completed-order" ? ' text-[#0dadf7] cursor-pointer font-medium  mt-[13px] text-sm ': ' text-[#979494] cursor-pointer font-medium  mt-[13px] text-sm '}  >Completed</p>
                        <p onClick={()=> clickHandler("/history-order")} className={routerPath === "/history-order" ? ' text-[#0dadf7] cursor-pointer font-medium  mt-[13px] text-sm ': ' text-[#979494] cursor-pointer font-medium  mt-[13px] text-sm '}  >Order history</p>
                    </div>
                </div>
            </div>
            <div className=' border-b lg:pl-0 pl-6 border-[#D9D9D9] pb-[20px] mb-[20px] ' >
                <div className=' flex items-center ' >
                    <div className=' w-14 ' > 
                        <Image alt="Icon" src='/images/menu/people.svg' width="17px" />
                    </div>
                    <p className=' font-semibold lg:text-xl ' >Referral</p>
                </div>  
                <div className=' flex items-center ' >
                    <div className=' w-14 ' />
                    <div className=' flex flex-col ' > 
                        <p className={routerPath === "/referrals" ? ' text-[#0dadf7] cursor-pointer font-medium  mt-[13px] text-sm ': ' text-[#979494] cursor-pointer font-medium  mt-[13px] text-sm '}  onClick={()=> clickHandler("/referrals")}>My referrals</p> 
                    </div>
                </div>
            </div>
            <div className=' border-b lg:pl-0 pl-6 border-[#D9D9D9] pb-[20px] mb-[20px]' > 
                <div className=' flex items-center ' >
                    <div className=' w-14 ' > 
                        <Image alt="Icon" src='/images/menu/wallet.svg' width="17px" />
                    </div>
                    <p className=' font-semibold lg:text-xl ' >Payment</p>
                </div> 
                <div className=' flex items-center ' >
                    <div className=' w-14 ' />
                    <div className=' flex flex-col ' > 
                        <p onClick={()=> clickHandler("/wallet")} className={routerPath === "/wallet" ? ' text-[#0dadf7] cursor-pointer font-medium  mt-[13px] text-sm ': ' text-[#979494] cursor-pointer font-medium  mt-[13px] text-sm '} >Wallet</p>
                        <p onClick={()=> clickHandler("/transactions")} className={routerPath === "/transactions" ? ' text-[#0dadf7] cursor-pointer font-medium  mt-[13px] text-sm ': ' text-[#979494] cursor-pointer font-medium  mt-[13px] text-sm '}  >Transactions</p> 
                    </div>
                </div>
            </div>
            <div className=' flex lg:pl-0 pl-6 items-center  ' >
                <Image alt="Icon" src='/images/menu/logout.svg' width="17px" />
                <div className='ml-[38px] flex flex-col ' >
                    <p className=' font-semibold lg:text-xl ' >Logout</p> 
                </div>
            </div>
        </div>
    )
}
