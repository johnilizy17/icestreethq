import React, { useEffect, useReducer, useState } from 'react'
import PaymentModal from './PaymentModal'
import toast from 'react-hot-toast'
import CartHeader from './CartHeader'
import CartInfoItem from './CartInfoItem'
import ProductItem from '../../ProductItem'
import { convertToNumber, getSingularOrPlural } from '../../utils/index.util'
import { calculateTotalAmount } from '../../utils/productDetails.utils'
import { cashFormat } from '../../utils/cashFormat'
import PaymentFrequency from '../../PaymentFrequency/PayNow'
import { cartInfoReducer, cartInitializer, getFrequencyAmount, getTotalQuantity } from './utils'
import MonthlySelector from '../../MontlySelector'
import { createPaymentPlan } from '../../../services/UserPackage'
import { getCartById } from '../../../services'
import ProductItemPayNow from '../../ProductItemPayNow'

enum cartInfoActionKind {
    INCREMENT_QUANTITY,
    DECREMENT_QUANTITY,
    INCREMENT_AMOUNT,
    DECREMENT_AMOUNT,
    CHANGE_DURATION
}


export default function CartComponentPayNow({packageInstance}: any) {
    const [isOpen, setIsOpen] = useState(false)
    const [data, setData] = React.useState({} as any)
    const [user_id, setUserId] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const [frequency, setFrequency] = useState()
    const [activeTab, setActiveTab] = useState<FrequencyType>("monthly")

    const { product_id: products, ...p } = packageInstance

    const initialArg = {
        totalQuantity: getTotalQuantity(products),
        totalAmount: convertToNumber(p.total),
        duration: p.duration
    }

    const [cartInfo, dispatchCartAction] = useReducer(cartInfoReducer, initialArg, cartInitializer)

    const [paymentInfo, setPaymentInfo] = useState<PaymentInfoType>({
        paymentFrequency: packageInstance.payment_frequency,
        amount: getFrequencyAmount(packageInstance.payment_frequency, cartInfo)
    })
    const handleQuantityChanged = (updatedValue: number, price: number, type: quantityAction) => {
        if (type === "increment") {
            dispatchCartAction({ type: cartInfoActionKind.INCREMENT_QUANTITY, payload: { quantity: updatedValue, price } })
        } else if (type === "decrement") {

            dispatchCartAction({ type: cartInfoActionKind.DECREMENT_QUANTITY, payload: { quantity: updatedValue, price } })
        }
    }

    const handleDurationChange = (duration: number) => {
        dispatchCartAction({ type: cartInfoActionKind.CHANGE_DURATION, payload: { duration } })
    }

    const handlePayNowClicked = () => {
        //send cart information
        // const data = createPaymentPlan(paymentInfo.amount, "Your package name", paymentInfo.paymentFrequency, cartInfo.duration)
        setIsOpen(true)
    }

    const handlePaymentFrequencyChanged = (frequency: FrequencyType, amount: number) => {
        setPaymentInfo({
            paymentFrequency: frequency,
            amount
        })
    }

    // update payment info when cart changes
    useEffect(() => {
        setActiveTab(paymentInfo.paymentFrequency)
        handlePaymentFrequencyChanged(paymentInfo.paymentFrequency, getFrequencyAmount(paymentInfo.paymentFrequency, cartInfo))
    }, [paymentInfo.paymentFrequency, cartInfo])

    return (
        <>
                <div className=' w-full h-full items-center flex flex-col lg:px-6 pb-10 bg-white space-y-5'>
                    <CartHeader />
                    <ul className='border w-full max-w-4xl flex-col border-[#D0D0D0] rounded-xl py-4 px-5 space-y-5'>
                        <CartInfoItem
                            label='Duration'
                            text={`${cartInfo.duration/30} month${getSingularOrPlural(cartInfo.duration/30)}`} />
                        <CartInfoItem label='Category' text='Groceries' />
                        <CartInfoItem label='Package' text='Christmas' />
                        <CartInfoItem label='Payment Frequency' text={paymentInfo.paymentFrequency} />
                    </ul>

                    {products.map((product:any, idx:number) => {
                       
                       const totalAmount = calculateTotalAmount(JSON.parse(product.item.price.replace(",", "")), product.qty)
                        return (
                            <ProductItemPayNow
                                key={`product-${idx}`}
                                imageURL={product.item.image}
                                name={product.item.itemName}
                                quantity={product.qty}
                                handleQuantityChanged={handleQuantityChanged}
                                price={product.item.price}
                                initialTotalAmount={JSON.parse(product.item.price.replace(",", ""))*product.qty} />
                        )
                    })}

                    {/* start of product list footer */}
                    <div className=' w-full flex lg:flex-row flex-col lg:items-center justify-center border-b py-3 px-4 border-[#D9D9D9] ' >
                        <p className=' font-normal text-sm lg:text-lg lg:mr-14' >Items: <span className=' font-bold ' >{products.length}</span></p>
                        <p className=' font-normal text-sm lg:mt-0 mt-2 lg:text-lg lg:ml-14  ' >Amount: <span className=' font-bold ' >{cashFormat(packageInstance.total)}</span></p>
                    </div>
                    {/* end of product list footer */}

                    {/* start of cart footer */}
                    <div className='w-11/12 max-w-md flex flex-col'>
                        <MonthlySelector defaultDuration={cartInfo.duration/30} handleDurationChange={handleDurationChange} />
                        <PaymentFrequency
                            handleClick={handlePaymentFrequencyChanged}
                            daily_payment={cartInfo.daily_payment}
                            monthly_payment={cartInfo.monthly_payment}
                            weekly_payment={cartInfo.weekly_payment} />

                        <button onClick={handlePayNowClicked} className='mt-14 self-center inline-block rounded-md w-[200px] text-sm bg-[#000] h-[40px] font-semibold text-white ' >Pay Now
                        </button>
                    </div>
                    {/* end of cart footer */}
                    {/* <PaymentModal
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        paymentPlanId={34081}
                        customer={{
                            name: "kelvin",
                            email: "kelvin@gmail.com",
                            phone_number: "08091123311"
                        }}
                        paymentFrequency={paymentInfo.paymentFrequency}
                        paymentAmount={paymentInfo.amount} /> */}
                </div>
        </>
    )
}


