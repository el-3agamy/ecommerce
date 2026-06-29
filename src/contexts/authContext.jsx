import { createContext, useEffect, useMemo, useState } from 'react';
import api from '../utils/api';

export const authContext = createContext();

export default function AuthContextProvider({ children }) {
   const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') != null);
   const [userId, setUserId] = useState('');

   useEffect(() => {
      if (localStorage.getItem('token')) {
         verifyToken();
      }
   }, []);

   async function verifyToken() {
      try {
         const { data } = await api.get('/auth/verifyToken');
         setUserId(data.decoded.id);
      } catch {
         localStorage.removeItem('token');
         setIsLoggedIn(false);
      }
   }

   const value = useMemo(
      () => ({ isLoggedIn, setIsLoggedIn, userId }),
      [isLoggedIn, userId]
   );

   return (
      <authContext.Provider value={value}>
         {children}
      </authContext.Provider>
   );
}
