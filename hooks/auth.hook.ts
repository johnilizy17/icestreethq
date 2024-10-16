import { useState, useEffect } from 'react';
import { UserAddress } from '../services/userDashboardServices';


const useUserDetails = () => {
  const { getUserInfo } = UserAddress()
  const [userDetails, setUserDetails] = useState<UserDetailsProp>();
  const [userId, setUserId] = useState<string>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const userId = localStorage.getItem('user');

    if (userId) {
      setUserId(userId)
      getUserInfo(userId)
      .then(res =>{
        setUserDetails(res?.data)
      } )
      .finally(() => setLoading(false))
     
    } else{
      setUserId('')
      setLoading(false)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return {userDetails, isLoggedIn: Boolean(userId), loading};
};

export default useUserDetails;