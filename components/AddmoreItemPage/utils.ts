import { calculatePaymentFrequency } from "../utils/productDetails.utils"

export const initialState: PackageInfoType = {
    packageInstance: {
        _id: "1",
        status: "active",
        duration: 30,
        product_id: [
            {
                item: {
                    "_id": "63dc18995a383c5550d805be",
                    "itemName": "Semi Automatic Neux Washing Machine",
                    "price": "120,000",
                    "image": "https://www.nexusappliances.com.ng/wp-content/uploads/2020/11/NX-WM-100SA-scaled.jpg",
                },
                qty: 2,
                _id: "1",
            },

        ],
        payment_frequency: "monthly",
        total: "59.97",
        balance: "39.98",
        paid: "19.99",
        numberOfExpectedPayments: 3,
        user_id: "123",
        category: "91239",
        createdAt: "2022-03-13T10:00:00Z",
    },
    daily_payment: 1,
    monthly_payment: 2,
    weekly_payment: 3,
    totalAmount: 1,
    totalQuantity: 2,
    duration: 2
}


export const packageInfoReducer = (state: PackageInfoType, action: Action): PackageInfoType => {
    let newQuantity
    let totalAmount
    let dailyPayment
    let weeklyPayment
    let monthlyPayment
    let paymentObj
    let products

    switch (action.type) {
        case "INIT":
            return action.payload

        case "ADD_PRODUCT":
            products = state.packageInstance.product_id
            let productQuantity = 1
            totalAmount = parseFloat(state.totalAmount.toString()) + action.payload.price
            paymentObj = calculatePaymentFrequency(state.duration, totalAmount)
            dailyPayment = paymentObj.dailyPayment
            weeklyPayment = paymentObj.weeklyPayment
            monthlyPayment = paymentObj.monthlyPayment

            //check if product exists
            for (const product of products) {
                if (product.item._id === action.payload.id) {

                    return state
                }
            }

            // update package state
            return {
                ...state,
                packageInstance: {
                    ...state.packageInstance,
                    product_id: [
                        ...state.packageInstance.product_id,
                        //update product
                        {
                            _id: action.payload.id.toString(),
                            qty: productQuantity,
                            item: {
                                itemName: action.payload.name,
                                _id: action.payload.id,
                                image: action.payload.imageUrl,
                                price: action.payload.price.toString()
                            }

                        }
                    ]
                },
                totalAmount,
                daily_payment: dailyPayment,
                weekly_payment: weeklyPayment,
                monthly_payment: monthlyPayment,
                totalQuantity: state.totalQuantity + productQuantity,
            }

        case "INCREMENT":
            products = state.packageInstance.product_id.map((product) => {
                if (product.item._id === action.payload.id) {
                    return {
                        ...product,
                        qty: action.payload.productQuantity
                    }
                }
                return product
            })
            newQuantity = state.totalQuantity + (action.payload?.quantity ?? 1)
            totalAmount = state.totalAmount + (action.payload?.price ?? 0)
            paymentObj = calculatePaymentFrequency(state.duration, totalAmount)
            dailyPayment = paymentObj.dailyPayment
            weeklyPayment = paymentObj.weeklyPayment
            monthlyPayment = paymentObj.monthlyPayment

            return {
                ...state,
                packageInstance: {
                    ...state.packageInstance,
                    product_id: products
                },
                totalQuantity: newQuantity,
                totalAmount,
                daily_payment: dailyPayment,
                weekly_payment: weeklyPayment,
                monthly_payment: monthlyPayment
            }

        case "DECREMENT":
            products = state.packageInstance.product_id.map((product) => {
                if (product.item._id === action.payload.id) {
                    return {
                        ...product,
                        qty: action.payload.productQuantity
                    }
                }
                return product
            })
            newQuantity = state.totalQuantity - (action.payload.quantity ?? 1)
            totalAmount = state.totalAmount - (action.payload?.price ?? 0)
            paymentObj = calculatePaymentFrequency(state.duration, totalAmount)
            dailyPayment = paymentObj.dailyPayment
            weeklyPayment = paymentObj.weeklyPayment
            monthlyPayment = paymentObj.monthlyPayment


            return {
                ...state,
                packageInstance: {
                    ...state.packageInstance,
                    product_id: products
                },
                totalQuantity: newQuantity,
                totalAmount,
                daily_payment: dailyPayment,
                weekly_payment: weeklyPayment,
                monthly_payment: monthlyPayment
            }

        case "REMOVE":
            let newProducts = state.packageInstance.product_id.filter((product) => product.item._id !== action.payload.id)
            newQuantity = state.totalQuantity - (action.payload.quantity ?? 1)
            totalAmount = state.totalAmount - (action.payload?.price ?? 0)
            paymentObj = calculatePaymentFrequency(state.duration, totalAmount)
            dailyPayment = paymentObj.dailyPayment
            weeklyPayment = paymentObj.weeklyPayment
            monthlyPayment = paymentObj.monthlyPayment


            return {
                ...state,
                packageInstance: {
                    ...state.packageInstance,
                    product_id: newProducts
                },
                totalQuantity: newQuantity,
                totalAmount,
                daily_payment: dailyPayment,
                weekly_payment: weeklyPayment,
                monthly_payment: monthlyPayment
            }
        case 'CHANGE_DURATION':
            const newDuration = action.payload ?? 12

            //calculate payment frequency
            let { dailyPayment: daily_payment, weeklyPayment: weekly_payment, monthlyPayment: monthly_payment } = calculatePaymentFrequency(newDuration, state.totalAmount)

            //return new cart state
            return {
                ...state,
                daily_payment,
                weekly_payment,
                monthly_payment,
                duration: newDuration
            }
        default:
            return state
    }
}
