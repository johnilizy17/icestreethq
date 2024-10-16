
import axios from "../axiosConfig"; 

export function WalletServices() {
    const allTransaction = async (details: string) => {
        try {
          if (details.length > 1) {
            const response = await axios.get(`/transactions?details=${details}`,);
            return response
          } else {
            const response = await axios.get(`/transactions`,);
            return response
          }
    
        } catch (err: any) {
          return err?.response
        }
      }

      
    const getWallet = async () => {
        try {
            const response = await axios.get(`/wallet`,);
            return response
    
        } catch (err: any) {
          return err?.response
        }
      }
    
      const AddFundFlotterwave = async (data: Object) => {
        try {
          const response = await axios.post(`wallet/addfund/flutterwave`, data);
          return response
        } catch (err: any) {
          return err?.response
        }
      }
      return { AddFundFlotterwave, allTransaction, getWallet } 
} 
