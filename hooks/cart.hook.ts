import { useEffect, useState } from "react"
import { getTotalQuantity } from "../components/CartPage/components/utils"
import { CART_ID } from "../components/utils/localStorage.utils"
import { getPackage } from "../services/UserPackage"

interface cartInfoProps {
    itemsQuantity: number
}

const useCartInfo = () => {
    const [cartId, setCartId] = useState<string>("")
    const [cartInfo, setCartInfo] = useState<cartInfoProps>()
    const [cartLoading, setCartLoading] = useState(true)

    useEffect(() => {
        const id = localStorage.getItem("default_package")
        if(!id) return
        setCartId(id)
    }, [])

    useEffect(() => {
        //exit if the cartId is undefined
        if(!cartId) return

        getPackage(cartId)
        .then((res) => {
            setCartLoading(false)
            console.log(res)
            const totalQuantity = res[0].product_id.length
           
            setCartInfo({
                itemsQuantity: totalQuantity
            })
        })
        .catch(err => err)
    })

    return {cartInfo, cartLoading}
}

export default useCartInfo