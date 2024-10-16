interface productSearchResultItemProps {
    name: string
    handleClick: Function
    imageUrl: string
    price: number
    id: number
}

interface ProductDetailsType {
    _id: string;
    itemName: string;
    price: string;
    image: string;
    details: string;
    spec: string;
    feature: string;
    status: string;
    user_id: string;
    category_id: string;
    createdAt: string;
  }
  
interface minimalProductDetailsType {
    _id: string;
    itemName: string;
    price: string;
    image: string;
  }
  

interface packageProductItem{
    name: string
    price: number
    imageUrl: string
    id: string
    qty: number
}


type packageProductItemProps = packageProductItem & {
    onRemove: Function
    handleQuantityChanged: Function
}