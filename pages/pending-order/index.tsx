import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import EmptyOrder from '../../components/OrderComponents/EmptyOrder'
import OrderItem from '../../components/OrderComponents/OrderItem'
import OrderSummary from '../../components/OrderComponents/OrderSummary'
import { UserPackageFunction } from '../../services/UserPackage'
import LoadingComponent from '../../components/OrderComponents/LoadingComponent';
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export default function Index() {

    const [isEmpty, setIsEmpty] = React.useState(false)
    const [viewDetail, setViewDetail] = React.useState(false)

    const { allPackage } = UserPackageFunction()
    const [isShown, setIsShown] = useState(true)

    const [data, setData] = useState({ email: [] })
    const [loading, setLoading] = useState(true)
    const [edit, setEdit] = useState({})
    const toaster = useToast();
    const router = useRouter();
    let refresh
    const [user, setUser] = useState<string>("")

    const getAddress = async () => {
        refresh = []
        let user
        try {
            const response = await allPackage("pending")
            setData(response?.data);
            refresh = ""
            if (response.status == 200) {
                if (response.data.length === 0) {
                    setIsShown(true)
                } else {
                    setIsShown(false)

                }
                setLoading(false)
            } else {
                router.push("/login")
                toaster({
                    title: "Token",
                    description: "Your token has expired",
                    status: "warning"
                })
            }
        } catch (err) {

            setLoading(false)
        }
    }

    useEffect(() => {
        getAddress()
    }, [refresh])


    return (
        <DashboardLayout menu={true}>

            {loading ?
                <LoadingComponent /> :
                <div className=' w-full rounded-[10px] bg-white ' >
                    {!viewDetail && (
                        <div className=' w-full border-b  border-[#D9D9D9] pb-[15px] lg:py-[15px] lg:px-[46px] ' >
                            <p className=' font-bold text-lg ' >Pending Order</p>
                        </div>
                    )}
                    {isShown && (
                        <EmptyOrder title='No Active Order.' body="You have not made any purchase recently." />
                    )}
                    {!isShown && (
                        <>
                            {!viewDetail && (
                                <OrderItem detail={setViewDetail} data={data} setEdit={setEdit} />
                            )}
                            {viewDetail && (
                                <OrderSummary detail={setViewDetail} edit={edit} data={data} />
                            )}
                        </>
                    )}
                </div>
            }
        </DashboardLayout>
    )
} 