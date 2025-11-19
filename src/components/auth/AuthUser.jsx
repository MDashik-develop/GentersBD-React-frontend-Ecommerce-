import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function AuthUser() {
   const navigate = useNavigate();

   const logout = () => {
      if (token) {
         sessionStorage.clear()
         toast.success('Logout Successful')
         navigate('/login')
      }
   }

   // ✅ Load token/user safely from sessionStorage
   const getToken = () => {
      return sessionStorage.getItem('token') || null
   }

   const getUser = () => {
      const userString = sessionStorage.getItem('user')
      try {
         return userString ? JSON.parse(userString) : null
      } catch (err) {
         console.error("Invalid user data in sessionStorage:", err)
         sessionStorage.removeItem('user') // remove broken data
         return null
      }
   }

   const [token, setToken] = useState(getToken());
   const [user, setUser] = useState(getUser());

   const saveToken = (token, user) => {
      
      sessionStorage.setItem('token', token)
      sessionStorage.setItem('user', JSON.stringify(user))

      setToken(token)
      setUser(user)
      navigate('/about')
   }

   const http = axios.create({
      baseURL: 'http://127.0.0.1:8000/api/v1/',
      headers: {
         'Content-Type': 'application/json',
      }
   });
   return {
      setToken:saveToken,
      token,
      user,
      getToken,
      http,
      logout
   }
}

export default AuthUser