import axios from "../axiosConfig";

export async function getCategories() {
    const {data} = await axios.get("/category")
    return data
} 

export async function getBrand(){
    const {data} = await axios.get("/brand")
    return data
}