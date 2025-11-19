import React from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {
   
   const navigate = useNavigate();
   const logout = () => {
      sessionStorage.clear()
      alert('You have been logged out')
      navigate('/login')
   }
  return (
    <button onClick={logout}>Logout</button>
  )
}

export default Logout