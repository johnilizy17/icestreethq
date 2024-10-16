import { toast } from "react-hot-toast";
import { productAction, productInfoType } from "../ProductDetails/components/type";
import { convertToNumber } from "./index.util";

enum productActionKind {
    INCREMENT_QUANTITY = 'INCREASE',
    DECREMENT_QUANTITY = 'DECREASE',
    CHANGE_DURATION = 'duration'
}

interface productInitializerProp {
    quantity: number,
    price: string
}

const DAYS_PER_MONTH = 30
const WEEKS_PER_MONTH = 4.33


export const calculateTotalAmount = (price: number, quantity: number): number => {
    return price * quantity
}


export  const productInfoReducer = (state: productInfoType, action: productAction): productInfoType => {
    let newQuantity
    let total_amount
    let dailyPayment
    let weeklyPayment
    let monthlyPayment
    let paymentObj

    switch (action.type) {
        // increase the quantity by one
        case productActionKind.INCREMENT_QUANTITY:
            newQuantity = state.quantity + 1
            total_amount = calculateTotalAmount(convertToNumber(state.price), newQuantity)
            paymentObj= calculatePaymentFrequency( state.duration, total_amount)
            dailyPayment = paymentObj.dailyPayment
            weeklyPayment = paymentObj.weeklyPayment
            monthlyPayment = paymentObj.monthlyPayment

            return {
                ...state,
                quantity: newQuantity,
                total_amount,
                daily_payment: dailyPayment,
                weekly_payment: weeklyPayment,
                monthly_payment: monthlyPayment
            }

        // decrease the product quantity by one
        case productActionKind.DECREMENT_QUANTITY:
            newQuantity = state.quantity <= 1 ? 1 : state.quantity - 1
            total_amount = calculateTotalAmount(convertToNumber(state.price), newQuantity)
            paymentObj= calculatePaymentFrequency( state.duration, total_amount)
            dailyPayment = paymentObj.dailyPayment
            weeklyPayment = paymentObj.weeklyPayment
            monthlyPayment = paymentObj.monthlyPayment

            
            return {
                ...state,
                quantity: newQuantity,
                total_amount,
                daily_payment: dailyPayment,
                weekly_payment: weeklyPayment,
                monthly_payment: monthlyPayment
            }

        //calculate the payment frequency based on the duration
        case productActionKind.CHANGE_DURATION:
            let newDuration = action.payload?.duration ?? 12
            let {dailyPayment:daily_payment, weeklyPayment:weekly_payment, monthlyPayment:monthly_payment} =    calculatePaymentFrequency(newDuration, state.total_amount)

            return {
                ...state,
                duration: newDuration,
                daily_payment,
                weekly_payment,
                monthly_payment
            }

        default:
            return state
    }
}


export const productInitializer = ({quantity, price}: productInitializerProp): productInfoType => {
    // this function return the initial value for a product
    let priceInt = convertToNumber(price)
    let total_amount = calculateTotalAmount(priceInt, quantity)
    let duration = 12
    const discount =0

    // calculating payment frequency and mapping  value to the appropriate type
    let {dailyPayment:daily_payment, weeklyPayment:weekly_payment, monthlyPayment:monthly_payment} = calculatePaymentFrequency(duration, total_amount)

    return{
        quantity,
        price,
        duration,
        total_amount,
        weekly_payment,
        monthly_payment,
        discount,
        daily_payment
    }
}


export const calculatePaymentFrequency = (monthDuration:number, totalAmount: number):{
    dailyPayment:number,
    weeklyPayment:number,
    monthlyPayment:number
} => {
    const DAYS_PER_MONTH = 30
    const WEEKS_PER_MONTH = 4.33

    if(monthDuration < 1 && monthDuration > 12){
        //return toast error
        toast.error("month is invalid")
    }

    // daily payment calculation
    let numberOfDays = monthDuration * DAYS_PER_MONTH
    let dailyPayment = parseFloat((totalAmount / numberOfDays).toFixed(1))

    // weekly payment calculation
    let numberOfWeeks = monthDuration * WEEKS_PER_MONTH
    let weeklyPayment = parseFloat((totalAmount / numberOfWeeks).toFixed(1))

    //monthly payment calculation
    let numberOfMonth = monthDuration
    let monthlyPayment = parseFloat((totalAmount / numberOfMonth).toFixed(1))

    return {dailyPayment, weeklyPayment, monthlyPayment}
}

export const isSingleItem = (quantity: number) => { 
    return quantity === 1
     
 }

export const calculateNumberPayment = (monthly: number, payment_frequency: FrequencyType) => {
    switch(payment_frequency){
        case "daily":
            return Math.ceil(monthly * DAYS_PER_MONTH)
        case "weekly":
            return Math.ceil(monthly * WEEKS_PER_MONTH)
        case "monthly":
            return Math.ceil(monthly * 1)
    }
}