interface productSearchResultItem{
    name: string
    imageUrl: string
    price: number
    id: string
}


type productSearchResultItemProps = productSearchResultItem & {
    handleClick: Function
}