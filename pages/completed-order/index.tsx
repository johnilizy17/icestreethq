import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import OrderSummary from '../../components/OrderComponents/OrderSummary'
import { UserPackageFunction } from '../../services/UserPackage'
import LoadingComponent from '../../components/OrderComponents/LoadingComponent';
import EmptyOrder from '../../components/OrderComponents/EmptyOrder'
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function Index() {

    const [isEmpty, setIsEmpty] = React.useState(false)
    const [viewDetail, setViewDetail] = React.useState(false)

    const { allPackage } = UserPackageFunction()
    const [isShown, setIsShown] = useState(true)

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [edit, setEdit] = useState({})
    let refresh
    const router = useRouter();
    const toaster = useToast();
    const [user, setUser] = useState<string>("")

    const getAddress = async () => {
        refresh = []
        let user
        try {
            const response = await allPackage("confirm")
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
        <DashboardLayout menu={true} >
            {loading ?
                <LoadingComponent /> :
                <>
                    {isShown && (
                        <EmptyOrder title='No Active Order.' body="You have not made any purchase recently." />
                    )}
                    {!isShown && (

                        <>
                            {
                                data.map((r: any, _id: number) => (
                                    <div className=' w-full rounded-[10px] bg-white' style={{ marginBottom: 20 }} key={_id} >
                                        <OrderSummary detail={setViewDetail} edit={r} />
                                    </div>
                                ))}
                        </>
                    )}
                </>
            }
        </DashboardLayout>
    )
} 