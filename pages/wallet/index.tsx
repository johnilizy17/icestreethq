import React, { useEffect, useState } from 'react'
import { Image } from '@chakra-ui/react'
import DashboardLayout from '../../components/DashboardLayout'
import FundWallet from '../../components/WalletComponent/FundWallet'
import RequestPayout from '../../components/WalletComponent/RequestPayout'
import { UserPackageFunction } from '../../services/UserPackage'
import { WalletServices } from '../../services/UserWalletServices'
import LoadingComponent from '../../components/OrderComponents/LoadingComponent';
import { cashFormat } from '../../components/utils/cashFormat'

export default function Index() {

    const [tab, setTab] = React.useState("")
    const { getWallet } = WalletServices()
    const [isShown, setIsShown] = useState(true)
    const [data, setData] = useState({ amount: "" })
    const [loading, setLoading] = useState(true)
    const [edit, setEdit] = useState({})
    let refresh
    const [user, setUser] = useState<string>("")

    const getAmount = async () => {
        setLoading(true)
        let user
        try {
            const response = await getWallet()
            console.log(response.data)
            setData(response?.data[0]);
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
        getAmount()
    }, [refresh])



    return (
        <DashboardLayout menu={true}>
            {loading ?
                <LoadingComponent /> :
                <>
                    <div className=' w-full rounded-[10px] bg-white ' >
                        <div className=' w-full lg:border-b flex justify-between items-center border-[#D9D9D9] pb-[15px] lg:py-[17px] lg:px-[46px] ' >
                            <p className=' font-bold text-lg' >Wallet</p>
                        </div>
                        <div className=' sm:loginShadow md:loginShadow  rounded  w-full flex flex-col py-[45px] lg:px-0 px-6 lg:pb-[55px] pb-[45px] lg:py-[55px] items-center ' >
                            <p className=' font-medium text-lg flex items-center ' >Wallet Balance: <span className=' text-[30px] ml-3 font-bold ' >{cashFormat(data?.amount)}</span></p>
                            <div className=' w-full lg:w-auto flex items-center mt-5 ' >
                                <button onClick={() => setTab("fund")} className={tab === "fund" ? ' bg-[#0dadf7] text-white rounded-[5px] mr-3 h-[40px] lg:h-[45px] w-full lg:w-[150px] font-semibold text-sm ' : ' border-[#D9D9D9] border rounded-[5px] mr-3 h-[40px] lg:h-[45px] w-full lg:w-[150px] font-semibold text-sm '} > Fund Wallet </button>
                            </div>
                        </div>
                    </div>
                </>
            }        </DashboardLayout>
    )
} 