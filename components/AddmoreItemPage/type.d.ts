interface PackageInfoType {
    packageInstance: minimalPackageInstanceType
    duration: number
    totalAmount: number,
    totalQuantity: number,
    daily_payment: number,
    weekly_payment: number,
    monthly_payment: number
}

type Action =
    | { type: 'INIT'; payload: PackageInfoType }
    | { type: 'ADD_PRODUCT'; payload: productSearchResultItem }
    | { type: 'INCREMENT'; payload: { quantity: number, price: number, id: number, productQuantity: number } }
    | { type: 'DECREMENT'; payload: { quantity: number, price: number, id: number, productQuantity: number } }
    | { type: 'REMOVE'; payload: { quantity: number, price: number, id: string } }
    | { type: 'CHANGE_DURATION'; payload: number }
