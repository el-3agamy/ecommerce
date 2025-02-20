import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const authContext = createContext();

export default function AuthContextProvider({ children }) {
   const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") != null);
   const [userId , setUserId] = useState("") ;
   useEffect(() => {
      if (localStorage.getItem("token") != null) {
         verifeyToken()
      }
   }, [])
   function verifeyToken() {
      axios.get(`https://ecommerce.routemisr.com/api/v1/auth/verifyToken`, {
         headers: {
            token: localStorage.getItem("token")
         }
      }
      ).catch((error) => {
         localStorage.removeItem("token");
         setIsLoggedIn(false);
      }).then(({data})=>{
            setUserId(data.decoded.id);
            
      })
   }
   return (
      <>
         <authContext.Provider value={{ isLoggedIn, setIsLoggedIn , userId}}>
            {children}
         </authContext.Provider>
      </>
   )
};
