type idType = number

interface packageItem {
    imageURL: string,
    name: string,
    price: string | number
    id?: idType
}

type packageItemProps = packageItem & {
    handleItemClicked: Function
    active?: boolean
}

type packageDetailsProp = {
    id: string | string[] | undefined
}

type packageItemDetailsProp =   {
    currentId: number
    handleClicked: Function
}

interface packageData {
    data: packageItem[]
    currentId: idType
    currentIndex: number
}