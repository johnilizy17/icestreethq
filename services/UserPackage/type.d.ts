interface CreatePackageProps  {
    duration: number,
    product_id: {item: string, qty: number}[]
    payment_frequency: string
    total: number
    category: string
    numberOfExpectedPayment: number
  }

  type UpdatePackageProps =  CreatePackageProps & {
    package_id: string
  }