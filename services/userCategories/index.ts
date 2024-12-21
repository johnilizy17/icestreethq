import axios from "../axiosConfig";

export async function getCategories() {
    const {data} = await axios.get("/category")
    return data
} 

export async function getBrand(){
    const {data} = await axios.get("/brand")
    return data
}

export async function getBrandProduct(id:any){
    const {data} = await axios.get(`/productby/brand/${id}`)
    return data
}


export async function getTypeProduct(id:any){
    const {data} = await axios.get(`/productby/type/${id}`)
    return data
}