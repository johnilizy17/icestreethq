export type productDetailsProp = {
    data: any,
    productId: any
}

// payload type for when duration is changed
export type changeDurationPayloadType = {
    duration: number
}


// An interface for product actions
export interface productAction {
    type: productActionKind;
    payload?: changeDurationPayloadType;
}

// structure for the state stored
export interface productInfoType {
    quantity: number
    price: string
    total_amount: number
    discount: number
    duration: number
    daily_payment: number
    weekly_payment: number
    monthly_payment: number
}