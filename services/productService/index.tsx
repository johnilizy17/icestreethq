import instance from "../axiosConfig";

export const getSearchResult = async (searchValue: string) => {
    const response = await instance.get(`products/search?search=${searchValue}`)

    return response.data
}


export const getCollections = async (id: number) => {
    const response = await instance.get(`collections/${id}`)

    return response.data
}


export const getBanner = async () => {
    const response = await instance.get(`banner`)
    return response.data
}

export const getGender = async (id: number, style: string) => {
    const response = await instance.get(`gender/${id}?style=${style}`)

    return response.data
}

export const getCollection = async (id: any) => {
    const response = await instance.get(`/products/collection/${id}`)

    return response.data
}

export const getCollectionBrand = async (id: any) => {
    const response = await instance.get(`/products/brand/${id}`)

    return response.data
}

export const getCollectionType = async (id: any) => {
    const response = await instance.get(`/products/type/${id}`)

    return response.data
}


export const getCurrency = async () => {
    const response = await instance.get(`/currency`)

    return response.data
}
