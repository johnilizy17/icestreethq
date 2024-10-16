
import axios, { flutterWaveConfig } from "../axiosConfig";

export function UserPackageFunction() {
  const currentPackage = async () => {
    try {
      const response = await axios.get(`package/user/current`,);
      return response
    } catch (err: any) {
      return err?.response
    }
  }

  const allPackage = async (status: string) => {
    try {
      if (status.length > 1) {
        const response = await axios.get(`/package/user/allPackage?status=${status}`,);
        return response
      } else {
        const response = await axios.get(`/package/user/allPackage`,);
        return response
      }

    } catch (err: any) {
      return err?.response
    }
  }

  const AddPackage = async (data: Object) => {
    try {
      const response = await axios.post(`package/user`, data);
      return response
    } catch (err: any) {
      return err?.response
    }
  }
  return { currentPackage, AddPackage, allPackage }
}


export const createPackage = async (packageObj: CreatePackageProps) => {
    const response = await axios.post(`package/user`, packageObj)
    return response.data
}

export const getPackage = async (package_id: string) => {

    const response = await axios.get(`package/user/single?package_id=${package_id}`)
    
    return response.data    
}


export const updatePackage2 = async (packageObj: UpdatePackageProps) => {
  const response = await axios.put("package/update/checkout", packageObj)

  return response.data  
}

export const updatePackage = async (packageObj: UpdatePackageProps) => {
    const response = await axios.put("package/update", packageObj)

    return response.data  
}

export async function createPaymentPlan(amount: number, name: string, interval: string, duration: number) {
    const paymentRequest = await flutterWaveConfig.post("/payment-plans", {
      amount,
      name,
      interval,
      duration
    })

    return paymentRequest.data

  } 
