
import axios from "../axiosConfig"; 

export function UserAddress() {
  const getUserAddress = async (userId: any): Promise<any> => {  
    try{ 
        const response = await axios.get(`delivery`); 
        return response       
    } catch(err: any) { 
      return err?.response    
    }     
  }

    const getUserInfo = async (userId: any): Promise<any> => {  
      try{ 
          const response = await axios.get(`user/${userId}`, ); 
          return response       
      } catch(err: any) { 
        return err?.response    
      }     
    }

    const getUserReferral = async ()=> {  
      try{ 
          const response = await axios.get(`users/referral`, ); 
          return response       
      } catch(err: any) { 
        return err?.response    
      }     
    }

  const addUserAddress = async (credentials: any): Promise<any> => {  
    try{ 
        const response = await axios.post('delivery', credentials,
        {
          headers: {'Content-Type':'application/json'}, 
        }); 
       
        return response       
    } catch(err: any) { 
      return err?.response    
    }     
  }
 
  const deleteUserAddress = async (credentials: any): Promise<any> => {  
    try{ 
        const response = await axios.delete(`delivery/${credentials}`); 
        return response       
    } catch(err: any) { 
      return err?.response    
    }     
  }

  const updateProfile = async (credentials: any, id?:any): Promise<any> => {  
    try{ 
        const response = await axios.put(`user/${id}`, credentials,
        {
          headers: {'Content-Type':'application/json'}, 
        }); 
        return response       
    } catch(err: any) { 
      return err?.response    
    }     
  }
  

  return { getUserAddress, getUserReferral, addUserAddress, getUserInfo, updateProfile, deleteUserAddress }
} 
