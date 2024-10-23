import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import EmptyOrder from '../../components/OrderComponents/EmptyOrder'
import OrderItem from '../../components/OrderComponents/OrderItem'
import OrderSummary from '../../components/OrderComponents/OrderSummary'
import { getCartAmount } from '../../services/UserPackage'
import LoadingComponent from '../../components/OrderComponents/LoadingComponent';

export default function Index() {

    const [isEmpty, setIsEmpty] = React.useState(false)
    const [viewDetail, setViewDetail] = React.useState(false)

    const [isShown, setIsShown] = useState(true)

    const [data, setData] = useState({ email: [] })
    const [loading, setLoading] = useState(true)
    const [edit, setEdit] = useState({})
    let refresh
    const [user, setUser] = useState<string>("")

    const getAddress = async () => {
        refresh = []
        let user
        try {
            const response = await getCartAmount()
            console.log(response)
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
        getAddress()
    }, [refresh])


    return (
        <DashboardLayout menu={true}>

            {loading ?
                <LoadingComponent /> :
                <div className=' w-full rounded-[10px] bg-white ' >
                    {!viewDetail && (
                        <div className=' w-full border-b  border-[#D9D9D9] pb-[15px] lg:py-[15px] lg:px-[46px] ' >
                            <p className=' font-bold text-lg ' >Active Order</p>
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
                                <OrderSummary detail={setViewDetail} edit={edit} />
                            )}
                        </>
                    )}
                </div>
            }
        </DashboardLayout>
    )
} 