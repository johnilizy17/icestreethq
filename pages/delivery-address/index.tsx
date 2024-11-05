import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import AllDeliveryAddress from '../../components/DeliveryAddressComponents/AllDeliveryAddress'
import AddDeliveryAddress from '../../components/DeliveryAddressComponents/AddDeliveryAddress'
import { UserAddress } from '../../services/userDashboardServices'
import { toast } from 'react-hot-toast'
import LoadingComponent from '../../components/OrderComponents/LoadingComponent';
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'

export default function Delivery() {

    const [isShown, setIsShown] = useState(true)
    const [loadingDelivery, setLoadingDelivery] = useState(true)

    const { getUserAddress } = UserAddress()
    const [data, setData] = useState({ email: [] })
    const [edit, setEdit] = useState()
    let refresh
    const router = useRouter()
    const toaster = useToast()
    const [user, setUser] = useState<string>("")

    const getAddress = async () => {
        setLoadingDelivery(true)
        refresh = []
        let user
        if (typeof window !== 'undefined') {
            // Perform localStorage action
            user = localStorage.getItem("user")
        }
        try {
            const response = await getUserAddress(user)
            if (response.status == 200) {
                setData(response?.data);
                refresh = ""
                if (response.data.length === 0) {
                    setIsShown(true)
                } else {
                    setIsShown(false)
                }
                setLoadingDelivery(false)
            } else {
                router.push("/login")
                toaster({
                    title: "Token",
                    description: "Your token has expired",
                    status: "warning"
                })
            }
        } catch (err) {
            setLoadingDelivery(false)
            toast.error("Error occured");
        }
    }

    useEffect(() => {
        getAddress()
    }, [refresh])



    return (
        <DashboardLayout menu={true}>
            {loadingDelivery ?
                <LoadingComponent /> :

                <div className='' >
                    {!isShown && (
                        <AllDeliveryAddress add={setIsShown} data={data} edit={setEdit} getAddress={getAddress} />
                    )}
                    {isShown && (
                        <AddDeliveryAddress add={setIsShown} data={data} edit={edit} getAddress={getAddress} />
                    )}
                </div>
            }
        </DashboardLayout>
    )
} 