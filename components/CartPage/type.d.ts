
type PaymentOptionKind = "flutterwave" | "wallet" | "bank_transfer"
type quantityAction = "increment" | "decrement"

type CartInfoProps = {
    totalQuantity: number,
    totalProductAmount: number,
    daily_payment: number,
    monthly_payment: number
    weekly_payment: number
    duration: number
}

type cartInitializerType = {
    totalQuantity: number
    totalAmount: number
    duration: number
}

type productType = {
    item: ProductDetailsType
    qty: number
    _id: string
}

interface PaymentInfoType {
    paymentFrequency: FrequencyType,
    amount: number
}


type PackageInstanceCommonType = {
    _id: string;
    status: string;
    duration: number;
    product_id: {
      item: any;
      qty: number;
      _id: string;
    }[];
    payment_frequency: FrequencyType;
    total: string;
    balance: string;
    paid: string;
    numberOfExpectedPayments: number;
    user_id: string;
    createdAt: string;
    category: string
  };
  
  type packageInstanceType = PackageInstanceCommonType & {
    product_id: {
      item: ProductDetailsType;
      qty: number;
      _id: string;
    }[];
  };
  
  type minimalPackageInstanceType = PackageInstanceCommonType & {
    product_id: {
      item: minimalProductDetailsType;
      qty: number;
      _id: string;
    }[];
  };
  