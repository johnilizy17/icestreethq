import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import { WalletServices } from '../../services/UserWalletServices'
import EmptyOrder from '../../components/OrderComponents/EmptyOrder'
import { cashFormat } from '../../components/utils/cashFormat'
import LoadingComponent from '../../components/OrderComponents/LoadingComponent';

export default function Index() {

    const [tab, setTab] = React.useState("0")
    const [isEmpty, setIsEmpty] = React.useState(false)
    const [viewDetail, setViewDetail] = React.useState(false)

    const { allTransaction } = WalletServices()
    const [isShown, setIsShown] = useState(true)

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [edit, setEdit] = useState({})
    let refresh
    const [user, setUser] = useState<string>("")

    const getTransaction = async (a: string) => {
        setLoading(true)
        let user
        try {
            const response = await allTransaction(a)
            setData(response?.data);
            refresh = ""
            if (response.data.length === 0) {
                setIsShown(true)
            } else {
                setIsShown(false)
            }
        } catch (err) {
        }
        setLoading(false)
    }

    useEffect(() => {
        refresh = []
        getTransaction("")
    }, [refresh])


    return (
        <DashboardLayout menu={true}>
            <div className=' w-full rounded-[10px] bg-white ' >
                <div className=' w-full border-b flex justify-between items-center border-[#D9D9D9] pb-[15px] lg:py-[15px] lg:px-[46px] ' >
                    <p className=' font-bold text-lg' >Transaction</p>
                </div>
                <div className=' w-full flex justify-between lg:justify-around py-[20px] px-4 lg:py-[36px] items-center ' >
                    <button onClick={() => {
                        getTransaction("")
                        setTab("0")
                    }} className={tab === "0" ? ' font-medium text-sm lg:text-lg text-[#0dadf7] ' : ' font-medium text-sm lg:text-lg '} > All</button>
                    <button onClick={() => {
                        getTransaction("successful")
                        setTab("1")
                    }} className={tab === "1" ? ' font-medium text-sm lg:text-lg text-[#0dadf7] ' : ' font-medium text-sm lg:text-lg '} > Successful</button>
                    <button onClick={() => {
                        getTransaction("cancel")
                        setTab("2")
                    }} className={tab === "2" ? ' font-medium text-sm lg:text-lg text-[#0dadf7] ' : ' font-medium text-sm lg:text-lg '} > Cancel</button>
                </div>
            </div>
            {loading ?
                <LoadingComponent /> :
                <>
                    {data.length === 0 ?

                        <EmptyOrder title='No Transaction.' body="You have to make a deposit or payment before it can be displayed." />
                        :

                        <div className=' mt-6 w-full bg-white rounded-[5px] lg:p-[26px] ' >

                            {
                                data.map((trans: any, trans_id: number) => (
                                    <>
                                        {trans_id % 2 == 0 ?
                                            <div className=' w-full bg-[#F5F5F5] rounded-[5px] flex justify-between p-[12px] ' key={trans_id} >
                                                <div className='  ' >
                                                    <p className=' font-normal text-[#6C6C6C] text-sm ' >{trans.transaction_title} </p>
                                                    <p className=' font-normal text-[#6C6C6C] mt-1 text-sm '>{trans.referrence}</p>
                                                    <p className=' font-medium lg:hidden text-[#6C6C6C] text-xs mt-1 lg:text-sm '>Aug 8 2022. 9AM</p>
                                                </div>
                                                <div className=' flex mt-2  ' >
                                                    <p className=' font-medium lg:block hidden text-[#6C6C6C] text-sm '>Aug 8 2022. <br />9AM</p>
                                                    <p className=' font-medium text-[#038566] ml-14 text-sm ' >{cashFormat(trans.amount)}</p>
                                                </div>
                                            </div> :
                                            <div className=' w-full  mt-4 flex justify-between p-[12px] ' >
                                                <div className='  ' >
                                                    <p className=' font-normal text-[#6C6C6C] text-sm ' >{trans.transaction_title} </p>
                                                    <p className=' font-normal text-[#6C6C6C] mt-1 text-sm '>{trans.referrence}</p>
                                                    <p className=' font-medium lg:hidden text-[#6C6C6C] text-xs mt-1 lg:text-sm '>Aug 8 2022. 9AM</p>
                                                </div>
                                                <div className=' flex mt-2  ' >
                                                    <p className=' font-medium lg:block hidden text-[#6C6C6C] text-sm '>Aug 8 2022. <br />9AM</p>
                                                    <p className=' font-medium text-[#038566] ml-14 text-sm ' >{cashFormat(trans.amount)}</p>
                                                </div>
                                            </div>
                                        }     </>
                                ))}
                        </div>}
                </>}
        </DashboardLayout>
    )
} 